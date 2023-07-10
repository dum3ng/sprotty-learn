import { injectable } from 'inversify'
import { MouseListener, SModelElement } from 'sprotty'
import { Action } from 'sprotty-protocol'

@injectable()
export class MouseListenerA extends MouseListener {
    mouseDown(
        target: SModelElement,
        event: MouseEvent,
    ): (Action | Promise<Action>)[] {
        console.log('A: mouse down')
        return []
    }
}

@injectable()
export class MouseListenerB extends MouseListener {
    mouseDown(
        target: SModelElement,
        event: MouseEvent,
    ): (Action | Promise<Action>)[] {
        console.log('B: mouse down')
        return []
    }
}
