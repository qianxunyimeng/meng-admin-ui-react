import { UserModel } from './model/user'

export interface Result {
  code: string
  msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T
}

export interface LoginApiResponse extends Result {
  data?: {
    userInfo: UserModel
    token: string
  }
}
