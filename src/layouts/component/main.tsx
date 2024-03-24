import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const LayoutMain = () => {
  return (
    <Layout.Content>
      <Outlet></Outlet>
    </Layout.Content>
  )
}

export default LayoutMain
