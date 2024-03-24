import { HOME_PATHNAME } from '@/config/config'
import useMatchRoute from '@/hooks/useMatchRoute'
import { useThemeStore } from '@/store/theme'
import { IRouteMeta } from '@/types/route'
import { Tabs } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface KeepAliveTab {
  title: string
  routePath: string
  key: string
  pathname: string
  children: any
  handle?: IRouteMeta
}

function getKey() {
  return new Date().getTime().toString()
}

const TagsView = () => {
  //const { pathname } = useLocation()
  const navigate = useNavigate()
  // 获取所有匹配路由
  //const matches = useMatches()
  // 当前激活的tab
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('')

  // 缓存的页面记录
  const [keepAliveTabs, setKeepAliveTabs] = useState<KeepAliveTab[]>([])

  // 当前匹配的路由
  const matchRoute = useMatchRoute()

  const enableTagsView = useThemeStore((state) => state.enableTagsView)

  useEffect(() => {
    if (!matchRoute) return
    if (matchRoute.handle?.redirect) return
    const existKeepAliveTab = keepAliveTabs.find((item) => item.routePath === matchRoute.routePath)
    if (!existKeepAliveTab) {
      //addTabs()
      setKeepAliveTabs((prev) => [
        ...prev,
        {
          title: matchRoute.title,
          key: getKey(),
          routePath: matchRoute.routePath,
          pathname: matchRoute.pathname,
          children: matchRoute.children,
          handle: matchRoute.handle,
        },
      ])
    }
    setActiveTabRoutePath(matchRoute.routePath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchRoute])

  const tabItems = useMemo(() => {
    return keepAliveTabs.map((tab) => {
      return {
        key: tab.routePath,
        label: tab.title,
        // children: (
        //   <div key={tab.key} className='px-[16px]'>
        //     {tab.children}
        //   </div>
        // ),
        closable: keepAliveTabs.length > 1, // 剩最后一个就不能删除了
      }
    })
  }, [keepAliveTabs])

  const clickTabs = (path: string) => {
    navigate(path)
  }

  const editTabs = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'remove') {
      closeTab(targetKey as string)
    }
  }

  const closeTab = (routePath: string) => {
    if (routePath === HOME_PATHNAME) return
    const index = keepAliveTabs.findIndex((o) => o.routePath === routePath)
    if (keepAliveTabs[index].routePath === activeTabRoutePath && keepAliveTabs.length > 1) {
      if (index > 0) {
        navigate(keepAliveTabs[index - 1].routePath)
      } else {
        navigate(keepAliveTabs[index + 1].routePath)
      }
    }
    keepAliveTabs.splice(index, 1)

    setKeepAliveTabs([...keepAliveTabs])
  }

  return (
    <>
      {enableTagsView && (
        <Tabs
          animated
          type='editable-card'
          hideAdd
          size='small'
          activeKey={activeTabRoutePath}
          onChange={clickTabs}
          onEdit={editTabs}
          items={tabItems}></Tabs>
      )}
    </>
  )
}

export default TagsView
