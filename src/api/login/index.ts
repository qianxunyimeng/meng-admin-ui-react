import request from '@/utils/request'
import { LoginApiResponse } from '@/types/api'
import { ReqLogin } from '@/types/interface'
export const LoginApi = (data: ReqLogin) => {
  return request.post<LoginApiResponse>('/login', data)
}
