import React, { useState, useEffect } from 'react'
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { getAllPosts } from './services/posts/getAllPosts'


export const PostDetails = () => {
    const [post, setPosts] = useState({})
    const { id } = useParams()

    useEffect(() => {
        getAllPosts(id).then(post => {
            setPosts(post)
        })
            .catch(e => {
                console.log(e)
            })
    }, [id])

    return (
        <div className="container mt-5">


            <div className="card p-2">
                <div className="card-header">
                    Id: {post.id}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <p>UserId: {post.userId}</p>
                    <Link to="/" className="btn btn-primary">Go back</Link>
                </div>
            </div>

        </div >
    )

}