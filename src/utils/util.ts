import { MenuDataItem } from '@/types/menu'
import sha265 from './sha265'
import { pathToRegexp } from 'path-to-regexp'

/** 判断是否是非空数组 */
export const notNullArray = (value: any) => Array.isArray(value) && value.length > 0

/**
 * 如果不是 / 开头的和父节点做一下合并
 * 如果是 / 开头的不作任何处理
 * 如果是 url 也直接返回
 * @param path
 * @param parentPath
 */
export const mergePath = (path: string = '', parentPath: string = '/') => {
  if (path.endsWith('/*')) {
    return path.replace('/*', '/')
  }
  if ((path || parentPath).startsWith('/')) {
    return path
  }
  if (isUrl(path)) {
    return path
  }
  return `/${parentPath}/${path}`.replace(/\/\//g, '/').replace(/\/\//g, '/')
}

export const isUrl = (path: string): boolean => {
  if (!path.startsWith('http')) {
    return false
  }
  try {
    const url = new URL(path)
    return !!url
  } catch (error) {
    return false
  }
}

/** 判断是否是图片链接 */
export function isImg(path: string): boolean {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path)
}

export function stripQueryStringAndHashFromPath(url: string) {
  return url.split('?')[0].split('#')[0]
}

export const getKeyByPath = (item: MenuDataItem) => {
  const { path } = item
  if (!path || path === '/') {
    // 如果还是没有，用对象的hash 生成一个
    try {
      return `/${sha265(JSON.stringify(item))}`
    } catch (error) {
      // dom some thing
    }
  }

  return path ? stripQueryStringAndHashFromPath(path) : path
}

export class RouteListMap<V> extends Map<string, V> {
  get(pathname: string) {
    let routeValue
    try {
      for (const [key, value] of this.entries()) {
        const path = stripQueryStringAndHashFromPath(key)
        if (!isUrl(key as string) && pathToRegexp(path as any, []).test(pathname as any)) {
          routeValue = value
          break
        }
      }
    } catch (error) {
      routeValue = undefined
    }

    return routeValue
  }
}
