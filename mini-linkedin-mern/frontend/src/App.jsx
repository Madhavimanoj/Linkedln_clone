import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import { AuthProvider, useAuth } from './store/AuthContext.jsx'

const Nav = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="nav">
      <div className="nav-inner container">
        <Link to="/"><strong>Mini LinkedIn</strong></Link>
        <div className="flex">
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="button secondary">Profile</Link>
              <button className="button" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="button secondary">Login</Link>
              <Link to="/register" className="button">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
