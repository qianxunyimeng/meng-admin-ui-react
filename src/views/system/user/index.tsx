import { useNavigate } from 'react-router-dom'

export default function User() {
  const nav = useNavigate()
  const goDept = () => {
    nav('/system/menu')
  }
  return (
    <div>
      用户管理页面
      <input />
      <button onClick={goDept}>go dept</button>
    </div>
  )
}
