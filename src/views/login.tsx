import { LoginApi } from '@/api/login'
import { HOME_PATHNAME } from '@/config/config'
//import { addRoutes, asyncRouter } from '@/router'
import { setUser } from '@/store/user'
import { Session } from '@/utils/storage'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Row } from 'antd'
import { createStyles } from 'antd-style'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import loginBG from '@/assets/img/bg.svg'
const useStyles = createStyles(({ token }) => ({
  container: {
    //backgroundImage: `url(${loginBG})`,
    backgroundColor: token.colorBgContainer,
  },
}))

type FieldType = {
  userName?: string
  password?: string
  remember?: string
}

export default function Login() {
  const { styles, cx } = useStyles()
  const [btnLoad, setBtnLoad] = useState(false)
  const nav = useNavigate()
  const onFinsh = useCallback(async (values: any) => {
    setBtnLoad(true)
    try {
      const { data } = await LoginApi({
        userName: values.userName,
        password: values.password,
      })
      if (data.data?.token) {
        Session.set('token', data.data?.token)
        setUser(data.data.userInfo)

        //addRoutes('/', asyncRouter)

        nav(HOME_PATHNAME, {
          replace: true,
        })
      }
    } catch (error: any) {
      setBtnLoad(false)
    }
  }, [])
  return (
    <div className={cx('bg-white wh-full', 'login-container', styles.container)}>
      <div className=''>
        <div className='font-size-28 font-800 text-center'>Meng React Admin</div>
        <div className='mt-20 text-center'>欢迎使用，请先登录</div>
        <Form className='w-300 my-50' onFinish={onFinsh}>
          <Form.Item<FieldType>
            name='userName'
            rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder='账号:admin/test123' />
          </Form.Item>
          <Form.Item<FieldType> name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              prefix={<LockOutlined />}
              type='password'
              autoComplete='off'
              placeholder='密码:admin/test123'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item<FieldType> name='remember' valuePropName='checked' noStyle>
              <Checkbox className='float-left'>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
          <Row justify='space-around'>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              loading={btnLoad}>
              登录
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Row>
        </Form>
      </div>
    </div>
  )
}
