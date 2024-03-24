import { useNavigate } from 'react-router-dom'

export default function Menu() {
  const nav = useNavigate()
  const goUser = () => {
    nav('/system/user')
  }
  return (
    <div className='b-1 px-6 px-5'>
      菜单管理页面
      <input />
      <button onClick={goUser}>go user</button>
    </div>
  )
}
