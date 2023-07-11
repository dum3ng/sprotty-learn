import { injectable } from 'inversify';
import { MouseListener, SModelElement } from 'sprotty';
import { Action } from 'sprotty-protocol';
/**
 * a menu when node is seleted
 */

export interface SmartMenuProvider {
    getItems()
}

@injectable()
export class LearnSmartMenuProvider implements SmartMenuProvider {
    getItems() {
        throw new Error('Method not implemented.');
    }

}

@injectable()
export class SmartMenuMouseListener extends MouseListener {

    mouseDown(target: SModelElement, event: MouseEvent): (Action | Promise<Action>)[] {
        
    }
}

/**
 * use custom action handler to handle the selection action, and show up the smart menu
 */
@injectable()
export class SmartMenuActionHandler extends Actionh