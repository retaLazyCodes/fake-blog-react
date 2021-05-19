import React, { useEffect, useState } from 'react'
import { createPost } from './services/posts/createPost'
import { Link, Route } from "react-router-dom";
import { Home } from './Home'

export const PostForm = () => {
    const [posts, setPosts] = useState([])
    const [newPostBody, setNewPostBody] = useState('')
    const [newPostTitle, setNewPostTitle] = useState('')
    const [error, setError] = useState('')

    const handlePostBodyChange = (event) => {
        setNewPostBody(event.target.value)
    }

    const handlePostTitleChange = (event) => {
        setNewPostTitle(event.target.value)
    }

    useEffect(() => {
        console.log(posts)
    }, [posts])

    const handleSubmit = (event) => {
        event.preventDefault()

        const postToAdd = {
            title: newPostTitle,
            body: newPostBody,
            userId: 1
        }

        console.log({ postToAdd })

        createPost(postToAdd).then(post => {
            setPosts([...posts, post])
        })
            .catch(e => {
                console.log(e)
                setError('Error en el servidor. No se han podido enviar los datos')
            })

        setNewPostTitle('')
        setNewPostBody('')
    }

    < Route
        path="/"
        exact
        render={(posts) => (
            <Home newPosts={posts} />
        )} />


    return (
        <div className="container">
            <form className="w-90 mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1" style={{ fontSize: "1.5rem" }}>Title</label>
                    <input value={newPostTitle} onChange={handlePostTitleChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="I'm a Alkymer!!" />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "1.5rem" }}>Post content</label>
                    <textarea value={newPostBody} onChange={handlePostBodyChange} className="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-lg btn-outline-primary mr-3">
                            Add Post
                        </button>
                        <Link to="/" className="btn btn-lg btn-outline-success ml-3">Go back</Link>
                    </div>
                </div>
            </form>
            {error ? < span className="error" style={{ color: "red" }}>{error}</span> : ''}
        </div>
    )
}