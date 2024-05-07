import { antdUtils } from '@/utils/antdUtil'
import { App } from 'antd'
import { lazy, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './baseRouter'
import KeepAlive from 'react-activation'
import LazyLoad from '@/components/lazy'
import { RoutersVo } from '@/api/system/menu'

const Router = () => {
  const { notification, message, modal } = App.useApp()

  useEffect(() => {
    antdUtils.setMessageInstance(message)
    antdUtils.setNotificationInstance(notification)
    antdUtils.setModalInstance(modal)
  }, [notification, message, modal])

  return <RouterProvider router={router} />
}

const modules = import.meta.glob('@/views/**/*/index.tsx')

export const LoadView = (props: RoutersVo) => {
  if (props.handle.component === 'Layout') {
    return null
  }
  return (
    <KeepAlive cacheKey={props.path}>
      {LazyLoad(lazy(modules[`/src${props.handle.component}.tsx`] as any))}
    </KeepAlive>
  )
}

export default Router
