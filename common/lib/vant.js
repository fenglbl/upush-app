// #ifdef H5
import 'vant/lib/index.css'
import { Button, Cell, CellGroup, Icon, Switch } from 'vant'

const vantComponents = [Button, Cell, CellGroup, Icon, Switch]

export function setupVant(app) {
  vantComponents.forEach((component) => {
    app.use(component)
  })
}
// #endif

// #ifndef H5
export function setupVant() {}
// #endif
