import { BASE_ROUTE } from '@/config/config'
import MengLayout from '@/layouts'
//import { CustomRouteConfig } from '@/types/route'
import NotAuth from '@/views/403'
import NotFound from '@/views/404'
import NotNotWork from '@/views/500'
import Login from '@/views/login'
import Register from '@/views/register'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

export const StaticRoute: RouteObject[] = [
  {
    index: false,
    path: '/login',
    element: <Login></Login>,
    handle: {
      title: '登录',
      fullPath: '/login',
    },
  },
  {
    path: '/register',
    element: <Register></Register>,
    handle: {
      title: '注册',
      fullPath: '/register',
    },
  },
  {
    path: '/403',
    element: <NotAuth></NotAuth>,
    handle: {
      title: '403',
      fullPath: '/403',
    },
  },
  {
    path: '/404',
    element: <NotFound></NotFound>,
    handle: {
      title: '404',
      fullPath: '/404',
    },
  },
  {
    path: '/500',
    element: <NotNotWork></NotNotWork>,
    handle: {
      title: '500',
      fullPath: '/500',
    },
  },
]

const routerData: RouteObject[] = [
  {
    path: '/',
    element: <MengLayout></MengLayout>,
    children: [],
  },
  ...StaticRoute,
  {
    path: '*',
    //element: <NotFound></NotFound>,
    element: <MengLayout></MengLayout>,
  },
]

export const router = createBrowserRouter(routerData, {
  basename: BASE_ROUTE,
})

function findNodeByPath(routes: RouteObject[], path: string) {
  for (let i = 0; i < routes.length; i += 1) {
    const element = routes[i]

    if (element.path === path) return element

    findNodeByPath(element.children || [], path)
  }
}

export const addRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...(routes as any))
    return
  }

  const curNode = findNodeByPath(router.routes, parentPath)

  if (curNode?.children) {
    curNode?.children.push(...routes)
  } else if (curNode) {
    curNode.children = routes
  }
}

export const replaceRoutes = (parentPath: string, routes: RouteObject[]) => {
  if (!parentPath) {
    router.routes.push(...(routes as any))
    return
  }

  const curNode = findNodeByPath(router.routes, parentPath)

  if (curNode) {
    curNode.children = routes
  }
}
