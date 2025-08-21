import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Register(){
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password, bio)
      navigate('/')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="card space-y">
      <h2>Register</h2>
      {error && <div className="small" style={{color:'crimson'}}>{error}</div>}
      <form className="space-y" onSubmit={onSubmit}>
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <textarea className="textarea" rows="3" placeholder="Bio" value={bio} onChange={e=>setBio(e.target.value)} />
        <button className="button" type="submit">Create account</button>
      </form>
      <div className="small">Have an account? <Link to="/login">Login</Link></div>
    </div>
  )
}
