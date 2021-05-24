import { Link } from "react-router-dom";
import { ROUTES } from './services/routes/myRoutes'
import { deletePost } from './services/posts/deletePost'
import Swal from 'sweetalert2'

export const Post = ({ post }) => {
    const { id } = post

    const handleOnClick = (event) => {
        console.log("clicked Delete")

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const target = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
                deletePost(id).then(post => {
                    target.style.display = "none"
                    if (id > 100) {
                        deleteStoredPost(id)
                    }
                })
                    .catch(e => {
                        console.log(e)
                    })

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
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
                            <Link to={`${ROUTES.editPost}/${post.id}`} className="btn btn-warning ml-1">Edit post</Link>
                        </div>

                    </div>
                </div>

            </div>
        </li >
    )
}

