/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import classnames from 'classnames'
import { injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { IView, RenderingContext, SNode } from 'sprotty';
import { TaskNode } from './model';

@injectable()
export class TaskNodeView implements IView {
    render(node: Readonly<SNode & TaskNode>, context: RenderingContext): VNode {
        const selected = node.selected
        return <g>
            <rect
                class={{ 'sprotty-node': true, 'task': true, running: node.isRunning, finished: node.isFinished }}
                // class-sprotty-node={true} class-task={true}
                //     class-running={node.isRunning}
                //     class-finished={node.isFinished}
                width={node.size.width}
                height={node.size.height}
            >
            </rect>
            {selected ? <g >
                <rect class={{ 'task-handler': true }} width={5} height={5} x={-5} y={-5}></rect>
                <rect class={{ 'task-handler': true }} width={5} height={5} x={-5} y={node.size.height}></rect>
                <rect class={{ 'task-handler': true }} width={5} height={5} x={node.size.width} y={-5} ></rect>
                <rect class={{ 'task-handler': true }} width={5} height={5} x={node.size.width} y={node.size.height}></rect>
            </g> : null}
            <text x={node.size.width / 2} y={node.size.height / 2 + 5}>{node.name}</text>
        </g>;
    }
}