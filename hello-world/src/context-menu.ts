import { inject, injectable } from 'inversify'
import {
    ActionDispatcher,
    Anchor,
    EMPTY_ROOT,
    GetSelectionAction,
    IActionDispatcher,
    IContextMenuItemProvider,
    IContextMenuService,
    LabeledAction,
    MenuItem,
    SModelRoot,
    SelectionResult,
    TYPES,
    ViewerOptions,
} from 'sprotty'
import { Point, SetPopupModelAction, Action } from 'sprotty-protocol'
import { TaskNode } from './model'

@injectable()
export class ContextMenuCreateProvider implements IContextMenuItemProvider {
    @inject(TYPES.IActionDispatcher) actionDispatcher: ActionDispatcher

    async getItems(
        root: Readonly<SModelRoot>,
        lastMousePosition?: Point,
    ): Promise<LabeledAction[]> {
        console.log('provide items')
        const selectionResult =
            await this.actionDispatcher.request<SelectionResult>(
                GetSelectionAction.create(),
            )
        const ids = selectionResult.selectedElementsIDs
        // if (root.type === 'task') {
        return Promise.resolve([
            new LabeledAction('new task', [
                CreateTaskAction.create('untitle task'),
            ]),
        ])
        // }
        return Promise.resolve([])
    }
}

export interface CreateTaskAction extends Action {
    kind: typeof CreateTaskAction.KIND
    name: string
}
export namespace CreateTaskAction {
    export const KIND = 'createTask'

    export function create(name?: string): CreateTaskAction {
        return {
            kind: KIND,
            name,
        }
    }
}

@injectable()
export class LearnContextMenuService implements IContextMenuService {
    @inject(TYPES.IActionDispatcher)
    readonly actionDispatcher: IActionDispatcher

    @inject(TYPES.ViewerOptions) protected viewerOptions: ViewerOptions

    show(items: MenuItem[], anchor: Anchor, onHide?: () => void): void {
        console.log('show items')
        this.actionDispatcher.dispatch(SetPopupModelAction.create(EMPTY_ROOT))
        const container = document.getElementById(this.viewerOptions.baseDiv)
        let menuNode: HTMLDivElement
        const hideMenu = () => {
            container?.removeChild(menuNode)
            if (onHide) {
                onHide()
            }
        }
        menuNode = this.createMenu(items, hideMenu)
        menuNode.style.top = anchor.y - 5 + 'px'
        menuNode.style.left = anchor.x - 5 + 'px'

        container?.appendChild(menuNode)
        menuNode.onmouseleave = (e: MouseEvent) => hideMenu()
    }

    protected createMenu(
        items: MenuItem[],
        closeCallback: () => void,
    ): HTMLDivElement {
        const menuNode = document.createElement('div')
        menuNode.id = 'class-context-menu'
        menuNode.classList.add('class-context-menu')
        items.forEach((item, index) => {
            const menuItem = document.createElement('div')
            menuItem.id = 'class-context-menu-item-' + index
            menuItem.classList.add('class-context-menu-item')
            const itemEnabled = item.isEnabled ? item.isEnabled() : true
            if (!itemEnabled) menuItem.classList.add('disabled-action')
            menuItem.textContent = item.label
            menuItem.onclick = (e: MouseEvent) => {
                closeCallback()
                if (itemEnabled && item.actions.length > 0) {
                    this.actionDispatcher.dispatchAll(item.actions)
                }
            }
            menuNode.appendChild(menuItem)
        })
        return menuNode
    }
}
