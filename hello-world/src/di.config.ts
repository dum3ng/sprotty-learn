import { Container, ContainerModule } from 'inversify'
import {
    configureModelElement,
    configureViewerOptions,
    ConsoleLogger,
    edgeIntersectionModule,
    loadDefaultModules,
    LocalModelSource,
    LogLevel,
    PolylineEdgeView,
    RectangularNode,
    SEdge,
    SGraph,
    SGraphView,
    TYPES,
} from 'sprotty'
import { TaskNodeView } from './views'
import { MouseListenerA, MouseListenerB } from './mouse-listener'
import { ContextMenuCreateProvider } from './context-menu'

export default (containerId: string) => {
    const ASCETExamleModule = new ContainerModule(
        (bind, unbind, isBound, rebind) => {
            bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope()
            rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope()
            rebind(TYPES.LogLevel).toConstantValue(LogLevel.log)
            const context = { bind, unbind, isBound, rebind }
            configureModelElement(context, 'graph', SGraph, SGraphView)
            configureModelElement(
                context,
                'task',
                RectangularNode,
                TaskNodeView,
            )
            configureModelElement(context, 'edge', SEdge, PolylineEdgeView)

            configureViewerOptions(context, {
                needsClientLayout: false,
                baseDiv: containerId,
            })

            bind(TYPES.MouseListener).to(MouseListenerA).inSingletonScope()
            bind(TYPES.MouseListener).to(MouseListenerB).inSingletonScope()
            bind(TYPES.IContextMenuItemProvider).to(ContextMenuCreateProvider)
            bind(TYPES.IContextMenuService)
        },
    )

    const container = new Container()
    loadDefaultModules(container)
    container.load(ASCETExamleModule)
    container.load(edgeIntersectionModule)
    return container
}
