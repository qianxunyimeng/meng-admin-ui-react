//import 'virtual:uno.css'
//import React from 'react'
import ReactDOM from 'react-dom/client' //ReactDOM.createRoot
//import ReactDOM from 'react-dom'
import { AliveScope } from 'react-activation'
import NProgress from 'nprogress'
/** 重置样式 这里引入自定义的重置样式也可 */
//import '@unocss/reset/tailwind.css'
/**
 *  项目内的样式，
 *  注意：最好放在重置样式后，uno.css前
 */
import './index.scss'
import 'nprogress/nprogress.css'
import 'uno.css'
import 'virtual:unocss-devtools'
import App from './App.tsx'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  parent: '#root',
})

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <AliveScope>
      <App />
    </AliveScope>
  </QueryClientProvider>,
  //</React.StrictMode>,
)

// ReactDOM.render(
//   <AliveScope>
//     <App />
//   </AliveScope>,
//   document.getElementById('root')
// )
