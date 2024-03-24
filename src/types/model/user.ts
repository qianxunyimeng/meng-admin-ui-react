/**
 * 用户实体
 */
export interface UserModel {
  address?: string
  avatar?: string
  /**
   * 生日
   */
  birthday?: string
  /**
   * 邮箱
   */
  email?: string
  gender: string
  /**
   * ID 编号
   */
  id: string
  /**
   * 昵称
   */
  nickName: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 账号状态，0:正常 1:禁用
   */
  status: string
  /**
   * 登录用户名，名称
   */
  userName: string
  [property: string]: any
}
