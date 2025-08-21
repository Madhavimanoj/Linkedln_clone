import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

export default function Feed(){
  const { user, authFetch, API } = useAuth()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  const load = async () => {
    const res = await fetch(`${API}/api/posts`)
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    const res = await authFetch(`${API}/api/posts`, { method:'POST', body: JSON.stringify({ content }) })
    if (res.ok) { setContent(''); load() }
  }

  return (
    <div>
      {user && (
        <div className="card space-y">
          <h3>Create a post</h3>
          <form className="space-y" onSubmit={create}>
            <textarea className="textarea" rows="3" placeholder="What's on your mind?" value={content} onChange={e=>setContent(e.target.value)} />
            <button className="button" type="submit">Post</button>
          </form>
        </div>
      )}
      <div className="space-y">
        {posts.map(p => (
          <div className="card" key={p._id}>
            <div><strong><Link to={`/profile/${p.user?._id}`}>{p.user?.name}</Link></strong></div>
            <div className="small">{new Date(p.createdAt).toLocaleString()}</div>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
