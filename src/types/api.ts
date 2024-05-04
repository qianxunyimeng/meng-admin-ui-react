import { CaptchaResp } from './model/base'
import { UserResp } from './model/user'

export interface Result {
  code: number
  msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T
}

export interface LoginApiResponse extends Result {
  data: {
    userInfo: UserResp
    token: string
  }
}

export interface CaptchaApiResponse extends Result {
  data?: CaptchaResp
}
