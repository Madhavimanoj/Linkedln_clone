import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthCtx = createContext(null)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ml_user')
    return raw ? JSON.parse(raw) : null
  })
  const [token, setToken] = useState(localStorage.getItem('ml_token'))

  useEffect(() => {
    if (user) localStorage.setItem('ml_user', JSON.stringify(user))
    else localStorage.removeItem('ml_user')
  }, [user])
  useEffect(() => {
    if (token) localStorage.setItem('ml_token', token)
    else localStorage.removeItem('ml_token')
  }, [token])

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
    const data = await res.json()
    setUser({ id: data.user.id || data.user._id, name: data.user.name, email: data.user.email, bio: data.user.bio })
    setToken(data.token)
  }

  const register = async (name, email, password, bio='') => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, bio })
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Register failed')
    const data = await res.json()
    setUser({ id: data.user.id || data.user._id, name: data.user.name, email: data.user.email, bio: data.user.bio })
    setToken(data.token)
  }

  const logout = () => { setUser(null); setToken(null) }

  const authFetch = (url, opts={}) => {
    return fetch(url, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...(opts.headers||{}), ...(token ? { Authorization: `Bearer ${token}` } : {}) }
    })
  }

  return <AuthCtx.Provider value={{ user, token, login, register, logout, authFetch, API }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
