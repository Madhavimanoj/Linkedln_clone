import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Profile(){
  const { id } = useParams()
  const { API } = useAuth()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const run = async () => {
      const r1 = await fetch(`${API}/api/users/${id}`)
      if (r1.ok) setUser(await r1.json())
      const r2 = await fetch(`${API}/api/posts/user/${id}`)
      if (r2.ok) setPosts(await r2.json())
    }
    run()
  }, [id])

  if (!user) return <div className="card">Loading...</div>

  return (
    <div className="space-y">
      <div className="card">
        <h2>{user.name}</h2>
        <div className="small">{user.email}</div>
        {user.bio && <p style={{marginTop:8}}>{user.bio}</p>}
      </div>
      <div className="space-y">
        {posts.map(p => (
          <div className="card" key={p._id}>
            <div className="small">{new Date(p.createdAt).toLocaleString()}</div>
            <p>{p.content}</p>
          </div>
        ))}
        {posts.length === 0 && <div className="card small">No posts yet.</div>}
      </div>
    </div>
  )
}
