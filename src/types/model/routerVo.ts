export interface RouterHandleVo {
  title: string
  icon: string
  component: string
}
export interface RouterVo {
  path: string
  handle: RouterHandleVo
  children?: RouterVo[]
}
