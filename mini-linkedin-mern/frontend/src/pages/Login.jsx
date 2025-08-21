import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="card space-y">
      <h2>Login</h2>
      {error && <div className="small" style={{color:'crimson'}}>{error}</div>}
      <form className="space-y" onSubmit={onSubmit}>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="button" type="submit">Login</button>
      </form>
      <div className="small">No account? <Link to="/register">Register</Link></div>
    </div>
  )
}
