import { createBrowserRouter } from 'react-router-dom'
import { frontEndRoutes } from './frontEnd'
import { BASE_ROUTE } from '@/config/config'
import { CustomRouteConfig } from '@/types/route'

const router = createBrowserRouter(frontEndRoutes, {
  basename: BASE_ROUTE,
})

function findNodeByPath(routes: CustomRouteConfig[], path: string) {
  for (let i = 0; i < routes.length; i += 1) {
    const element = routes[i]

    if (element.path === path) return element

    findNodeByPath(element.children || [], path)
  }
}

export const addRoutes = (parentPath: string, routes: CustomRouteConfig[]) => {
  if (!parentPath) {
    router.routes.push(...(routes as any))
    return
  }

  const curNode = findNodeByPath(router.routes as any[], parentPath)

  if (curNode?.children) {
    curNode?.children.push(...routes)
  } else if (curNode) {
    curNode.children = routes
  }
}

export const routes = frontEndRoutes
export { asyncRouter } from './asyncRoute'
export default router

console.log(frontEndRoutes)
