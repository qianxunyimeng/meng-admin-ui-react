import { Spin } from 'antd'
import { Suspense } from 'react'

const LazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => (
  <Suspense
    fallback={
      <Spin
        size='large'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      />
    }>
    <Component />
  </Suspense>
)

export default LazyLoad
