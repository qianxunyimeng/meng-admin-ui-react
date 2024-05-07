import { ResultData } from '@/types/api'
import useRequest from '@/utils/http'
import { MenuModel, SearchFormField } from '@/views/system/menu/type'

import { useQuery } from '@tanstack/react-query'

export interface RouterHandleVo {
  title: string
  icon: string
  component: string
}
export interface RoutersVo {
  path: string
  handle: RouterHandleVo
}

export const insertMenuApi = (data: MenuModel) => {
  return useRequest.post<ResultData>({
    url: '/menu',
    data,
  })
}

export const updateMenuApi = (data: MenuModel, menuId: number) => {
  return useRequest.put<ResultData>({
    url: `/menu/${menuId}`,
    data,
  })
}

export const getMenuListApi = (data: SearchFormField) => {
  return useRequest.get<ResultData<MenuModel[]>>({
    url: '/menu',
    params: data,
  })
}

export const getMenuById = (menuId: number) => {
  return useRequest.get<ResultData<MenuModel>>({
    url: `/menu/${menuId}`,
  })
}

export const deleteMenuById = (ids: number[]) => {
  return useRequest.delete<ResultData<MenuModel>>({
    url: '/menu/',
    data: { ids },
  })
}

export const useMenuList = (data: SearchFormField) => {
  return useQuery({
    queryKey: ['sys-menu', 'menu', 'get', data],
    queryFn: () => getMenuListApi(data),
  })
}

export const getRoutersApi = () => {
  return useRequest.get<ResultData<RoutersVo[]>>({
    url: '/menu/getRouters',
  })
}
