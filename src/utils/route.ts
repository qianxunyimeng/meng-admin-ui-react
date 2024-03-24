import { routes } from '@/router'
import { CustomRouteConfig } from '@/types/route'

export const getActivedRoute = (pathname: string, roots = routes): CustomRouteConfig | null => {
  let result = null
  for (const item of roots) {
    if (item.path === pathname) return item
    if (item.children) {
      const res = getActivedRoute(pathname, item.children)
      if (res && Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr: string = ''
  const newArr: any[] = []
  const arr = path.split('/').map((i) => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}
