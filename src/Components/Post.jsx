import { Link } from "react-router-dom";
import { ROUTES } from './services/routes/myRoutes'
import { deletePost } from './services/posts/deletePost'

export const Post = ({ post }) => {
    const { id } = post

    const handleOnClick = (event) => {
        console.log("clicked Delete")
        const target = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        deletePost(id).then(post => {
            target.remove()
            if (id > 100) {
                deleteStoredPost(id)
            }
        })
            .catch(e => {
                console.log(e)
            })
    }

    const deleteStoredPost = (id) => {
        const posts = JSON.parse(localStorage.getItem('posts'));
        const filteredPosts = posts.filter(el => el.id !== id);
        localStorage.setItem('posts', JSON.stringify(filteredPosts))
    }

    return (
        <li>
            <div className="container mb-5">

                <h4>{post.title}</h4>
                <div className="d-flex flex-row">
                    <div className="p-2">

                        <div className="btn-group">
                            <Link to={`${ROUTES.postDetails}/${post.id}`} className="btn btn-primary">
                                Go to the post
                            </Link>
                            <Link to="/" onClick={handleOnClick} className="btn btn-danger ml-1">Delete post</Link>
                            <Link to="/" className="btn btn-warning ml-1">Edit post</Link>
                        </div>

                    </div>
                </div>

            </div>
        </li >
    )
}

