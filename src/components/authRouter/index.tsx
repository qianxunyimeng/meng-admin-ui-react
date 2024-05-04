import { useLocation, useNavigate } from 'react-router-dom'
import { HOME_PATHNAME, LOGIN_PATHNAME } from '@/config/config'
import { useEffect } from 'react'
//import { getActivedRoute } from '@/utils/route'
import { Session } from '@/utils/storage'
import useMatchRoute from '@/hooks/useMatchRoute'
import { isRelogin } from '@/utils/http'

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
  useEffect(() => {
    // const route = getActivedRoute(pathname)
    // if (route?.children) {
    //   nav(route.children[0].path!)
    // }
    //(pathname)

    //console.log(matchRoute)
    if (pathname == '/') {
      nav(HOME_PATHNAME)
    }
    if (matchRoute?.handle?.redirect) {
      nav(matchRoute.handle.redirect)
    }
    document.title = matchRoute?.title || 'Meng React Admin'
    if (!Session.get('token')) {
      // 没有用户信息，跳转到登录页面
      nav(LOGIN_PATHNAME)
    }
    isRelogin.show = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, matchRoute])
  return props.children
}
