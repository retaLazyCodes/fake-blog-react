import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { Post } from './Post'
import { getAllPosts } from './services/posts/getAllPosts'
import './css/home.css'


export const Home = () => {
  const { newPosts } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllPosts().then(post => {
      setPosts(post)
      newPosts ? setPosts([...posts, newPosts]) :
        setLoading(false)
    })
      .catch(e => {
        console.log(e)
        setError('Error en el servidor. No se han podido obtener los datos')
      })
  }, [])

  console.log(newPosts)

  return (
    <div>
      <h1>Posts</h1>
      { loading ? <h2>Cargando...</h2> : ''}
      <ul>
        {posts.map(post =>
          <Post key={post.id} post={post} />
        )}
      </ul>
      {error ? < span className="error">{error}</span> : ''}
    </div >
  )
}
