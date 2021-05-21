import React, { useState, useEffect } from 'react'
import { PostList } from './PostList'
import { Pagination } from './Pagination'
import { getAllPosts } from './services/posts/getAllPosts'
import './css/home.css'


export const Home = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllPosts().then(post => {
      if (localStorage.getItem('posts')) {
        const storedPosts = JSON.parse(localStorage.getItem('posts'))
        setPosts([...post, ...storedPosts])
      }
      else {
        setPosts(post)
      }
      setLoading(false)
    })
      .catch(e => {
        console.log(e)
        setError('Server error. Data could not be obtained')
      })
  }, [])

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <PostList
        posts={posts}
        currentPosts={currentPosts}
        loading={loading}
        error={error} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate} />
    </div>
  )
}
