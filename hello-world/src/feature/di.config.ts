import { ContainerModule } from 'inversify'
import { TYPES } from 'sprotty'
const module = new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TYPES.MouseListener).to()
})
export default module
