import { RouterProvider } from 'react-router-dom'

import routerConfig from './router'
import { ConfigProvider, ConfigProviderProps } from 'antd'
import zhCN from 'antd/locale/zh_CN'
//import dayjs from 'dayjs'
//import 'dayjs/locale/zh-cn'
import { useState } from 'react'
type Locale = ConfigProviderProps['locale']
//dayjs.locale('zhCN')
export default function App() {
  const [locale] = useState<Locale>(zhCN)
  return (
    <ConfigProvider locale={locale}>
      <RouterProvider router={routerConfig}></RouterProvider>
    </ConfigProvider>
  )
}
