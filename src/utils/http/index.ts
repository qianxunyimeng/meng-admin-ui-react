import { RequstInterceptors } from './type'
import type { AxiosError } from 'axios'
import axios from 'axios'
import AxiosMax from './Axios'
import { retry } from './axiosRetry'
import { checkErrorStatus } from './checkErrorStatus'
import staticAxiosConfig from './config'
import { Session } from '../storage'

const _RequstInterceptors: RequstInterceptors = {
  requestInterceptors(config) {
    //config.headers!['Authorization'] = `${Session.get('token')}`
    if (Session.get('token')) {
      config.headers['Authorization'] = 'Bearer ' + Session.get('token')
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  requestInterceptorsCatch(err) {
    return err
  },
  responseInterceptor(config) {
    return config
  },
  responseInterceptorsCatch(axiosInstance, err: AxiosError) {
    const message = err.code === 'ECONNABORTED' ? '请求超时' : undefined
    if (axios.isCancel(err)) {
      return Promise.reject(err)
    }
    console.log(err)
    checkErrorStatus((err as AxiosError).response?.status, message, (message) =>
      console.log(message),
    )
    return retry(axiosInstance, err as AxiosError)
  },
}

const useRequest = new AxiosMax({
  directlyGetData: true,
  baseURL: staticAxiosConfig.baseUrl,
  timeout: 3000,
  interceptors: _RequstInterceptors,
  abortRepetitiveRequest: true,
  retryConfig: {
    count: 5,
    waitTime: 500,
  },
})

export default useRequest
