import { injectable } from 'inversify'
import {
    Anchor,
    IActionDispatcher,
    IContextMenuItemProvider,
    IContextMenuService,
    LabeledAction,
    MenuItem,
    SModelRoot,
    SetPopupModelAction,
    TYPES,
    ViewerOptions,
} from 'sprotty'
import { Point, Action } from 'sprotty-protocol'
import { TaskNode } from './model'

@injectable()
export class ContextMenuCreateProvider implements IContextMenuItemProvider {
    getItems(
        root: Readonly<SModelRoot>,
        lastMousePosition?: Point,
    ): Promise<LabeledAction[]> {
        if (root.type === 'task') {
            return Promise.resolve([
                new LabeledAction('new task', [
                    CreateTaskAction.create('untitle task'),
                ]),
            ])
        }
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
}

function inject(
    IActionDispatcher: any,
): (target: LearnContextMenuService, propertyKey: 'actionDispatcher') => void {
    throw new Error('Function not implemented.')
}
