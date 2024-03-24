import { Dropdown, Modal } from 'antd'
import { ThemeMode, createStyles } from 'antd-style'
import type { MenuProps } from 'antd'
import Avatar from '@/assets/img/avatar.webp'
import { LoginOutlined, UserOutlined } from '@ant-design/icons'
import ThemeConfig from '@/components/theme'
import { useMemo, useState } from 'react'
import { Session } from '@/utils/storage'
import { useNavigate } from 'react-router'
import { LOGIN_PATHNAME } from '@/config/config'
import FullScreen from '@/components/fullScreen'
import { useThemeStore } from '@/store/theme'
import { useShallow } from 'zustand/react/shallow'
import { LayoutMode } from '@/types/theme'
import { DarkIcon, FollowSysyemIcon, LightIcon } from '@/components/icon/themSwitchIcon'

const useStyles = createStyles(
  ({ token, css }, props: { layoutMode: LayoutMode; splitMenus: boolean }) => {
    let num: string | number = ''
    const { layoutMode: layout, splitMenus } = props
    //const { layout, isClassicSplitMenu } = themeConfig.value
    //const layoutArr: string[] = ['defaults', 'columns']
    if (layout === 'mix' && !splitMenus) {
      num = '1'
    } else {
      num = ''
    }

    // const commonCard = css`
    //   border-radius: ${token.borderRadiusLG}px;
    //   padding: ${token.paddingLG}px;
    // `
    return {
      container: {
        height: '100%',
        paddingRight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: num,
      },
      dropdown: {
        color: token.colorTextTertiary,
      },
      iconContainer: css`
        height: 100%;
        padding: 0 10px;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: ${token.colorTextTertiary};
        cursor: pointer;

        &:hover {
          background-color: ${token.colorBgTextHover};
          .icon {
            animation: logoAnimation 0.3s ease-in-out;
          }
          .anticon {
            animation: logoAnimation 0.3s ease-in-out;
          }
        }
      `,
    }
  },
)

const items: MenuProps['items'] = [
  {
    key: 'userInfo',
    label: <a>个人中心</a>,
    icon: <UserOutlined />,
  },
  {
    key: 'logout',
    label: <a>退出登录</a>,
    icon: <LoginOutlined />,
  },
]

const darkLightItems: MenuProps['items'] = [
  {
    key: 'auto',
    label: <a>跟随系统</a>,
    icon: <FollowSysyemIcon></FollowSysyemIcon>,
  },
  {
    key: 'light',
    label: <a>亮色模式</a>,
    icon: <LightIcon></LightIcon>,
  },
  {
    key: 'dark',
    label: <a>暗色模式</a>,
    icon: <DarkIcon></DarkIcon>,
  },
]

const LayoutUser = () => {
  const nav = useNavigate()
  const { layoutMode, splitMenus, themeMode } = useThemeStore(
    useShallow((state) => ({
      layoutMode: state.layout,
      splitMenus: state.splitMenus,
      themeMode: state.themeMode,
    })),
  )
  const { styles, cx } = useStyles({ layoutMode, splitMenus })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      setIsModalOpen(true)
    }
  }

  const handleOk = () => {
    Session.remove('token')
    setIsModalOpen(false)
    setTimeout(() => {
      nav(LOGIN_PATHNAME)
    }, 0)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const currentMode = useMemo(() => {
    if (themeMode === 'dark') {
      return <DarkIcon></DarkIcon>
    } else if (themeMode === 'light') {
      return <LightIcon></LightIcon>
    } else {
      return <FollowSysyemIcon></FollowSysyemIcon>
    }
  }, [themeMode])

  return (
    <div className={cx(styles.container)}>
      {/* <div className={cx(styles.iconContainer)}>
        <SkinOutlined className='icon' title='主题配置' />
      </div> */}

      <Dropdown
        className={cx(styles.dropdown)}
        placement='top'
        menu={{
          items: darkLightItems,
          onClick: (e) => {
            //console.log(e.key)
            useThemeStore.setState((state) => {
              state.themeMode = e.key as ThemeMode
            })
          },
          selectable: true,
          defaultSelectedKeys: [themeMode],
        }}>
        <span
          className={cx(
            'h-full flex flex-items-center px header-action-icon',
            styles.iconContainer,
          )}>
          {currentMode}
        </span>
      </Dropdown>

      <ThemeConfig></ThemeConfig>

      <FullScreen></FullScreen>

      <Dropdown className={cx(styles.dropdown)} menu={{ items, onClick }}>
        <span className='h-full flex flex-items-center'>
          <img
            src={Avatar}
            style={{
              height: '25px',
              width: '25px',
              borderRadius: '100%',
              marginRight: '5px',
            }}></img>
          admin
          <i className='i-ep:arrow-down ml-5' style={{ height: '14px', width: '14px' }}></i>
        </span>
      </Dropdown>

      <Modal
        title='提示'
        okText='确定'
        cancelText='取消'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>此操作即将退出登录，是否继续</p>
      </Modal>
    </div>
  )
}
export default LayoutUser
