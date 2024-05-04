//import 'virtual:uno.css'
//import React from 'react'
import ReactDOM from 'react-dom/client' //ReactDOM.createRoot
//import ReactDOM from 'react-dom'
import { AliveScope } from 'react-activation'
/** 重置样式 这里引入自定义的重置样式也可 */
//import '@unocss/reset/tailwind.css'
/**
 *  项目内的样式，
 *  注意：最好放在重置样式后，uno.css前
 */
import './index.scss'

import 'uno.css'
import 'virtual:unocss-devtools'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
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
