import { IRouteMeta } from '@/types/route'
import { useEffect, useState } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

interface MatchRouteType {
  // 菜单名称
  title: string
  // tab对应的url
  pathname: string
  // 要渲染的组件
  children: any
  // 路由，和pathname区别是，详情页 pathname是 /:id，routePath是 /1
  routePath: string
  handle?: IRouteMeta
}

/**
 * 获取当前匹配到路由
 * @returns
 */
export default function useMatchRoute() {
  // 获取路由组件实例
  const children = useOutlet()
  // 获取所有路由
  const matches = useMatches()
  // 获取当前url
  const { pathname } = useLocation()

  const [matchRoute, setMatchRoute] = useState<MatchRouteType | undefined>()

  // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matches.at(-1)

    if (!lastRoute?.handle) return

    setMatchRoute({
      title: (lastRoute.handle as IRouteMeta).title || '',
      pathname,
      children,
      routePath: lastRoute?.pathname || '',
      handle: lastRoute.handle,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return matchRoute
}
