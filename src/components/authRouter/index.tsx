import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/config/config'
import { useEffect } from 'react'
//import { getActivedRoute } from '@/utils/route'
import { Session } from '@/utils/storage'
import useMatchRoute from '@/hooks/useMatchRoute'
import { permissions, useUserStore } from '@/store/user'
import { getInfoApi } from '@/api/common'
import { replaceRoutes, router } from '@/router/baseRouter'
import { treeToArray } from '@/utils/util'
import NotFound from '@/views/404'
import { getRoutersApi } from '@/api/system/menu'
import { LoadView } from '@/router'
const whiteList = ['/login', '/register']
/**
 * 路由守卫
 * @param props
 * @returns
 */
export default function AuthRouter(props: { children: JSX.Element }) {
  //const userInfo = useUserStore((state) => state.user)
  const nav = useNavigate()
  const { pathname } = useLocation()
  const matchRoute = useMatchRoute()
  console.log(pathname, matchRoute)

  useEffect(() => {
    if (!Session.get('token')) {
      if (whiteList.indexOf(pathname) === -1) {
        // 没有用户信息并且不在白名单中，重定向到登录页面
        nav(`${LOGIN_PATHNAME}?redirect=${encodeURIComponent(pathname)}`)
      }
    } else {
      if (
        (pathname !== LOGIN_PATHNAME || whiteList.indexOf(pathname) === -1) &&
        permissions().length === 0
      ) {
        getInfoApi().then((res) => {
          if (res.code === 0) {
            useUserStore.setState({
              user: res.data?.user,
              roles: res.data?.roles,
              permissions: res.data?.permissions,
            })

            getRoutersApi().then((res) => {
              if (res.code === 0) {
                //console.log(router.routes)
                const flatenRoutes = treeToArray(res.data)
                console.log(flatenRoutes)

                replaceRoutes('*', [
                  ...flatenRoutes.map((menu: any) => {
                    return {
                      path: `/*${menu.path}`,
                      // Component: menu.filePath ? lazy(components[menu.filePath]) : null,
                      element: LoadView(menu),
                      id: `/*${menu.path}`,
                      handle: menu.handle,
                    }
                  }),
                  {
                    id: '*',
                    path: '*',
                    element: <NotFound></NotFound>,
                    handle: {
                      path: '404',
                      name: '404',
                    },
                  },
                ])

                console.log('最新路由信息：', router.routes)

                //router.routes[router.routes.length - 1].children = rr as any
                // replace一下当前路由，为了触发路由匹配
                router.navigate(`${location.pathname}${location.search}`, { replace: true })
              }
            })
          }
        })
      }
    }

    // if (pathname === LOGIN_PATHNAME) {
    //   // 登录页面放行
    // } else if (whiteList.indexOf(pathname) !== -1) {
    //   // 白名单放行
    // }
    // if (pathname == '/') {
    //   nav(HOME_PATHNAME)
    // }
    // if (matchRoute?.handle?.redirect) {
    //   nav(matchRoute.handle.redirect)
    // }
    // document.title = matchRoute?.title || 'Meng React Admin'
    // if (!Session.get('token')) {
    //   // 没有用户信息，跳转到登录页面
    //   nav(LOGIN_PATHNAME)
    // }
    // isRelogin.show = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, matchRoute])
  return props.children
}
