import { Link } from "react-router-dom";
import { ROUTES } from './services/routes/myRoutes'

export const Post = ({ post }) => {

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
                            <Link to="/" className="btn btn-danger ml-1">Delete post</Link>
                            <Link to="/" className="btn btn-warning ml-1">Edit post</Link>
                        </div>

                    </div>
                </div>

            </div>
        </li >
    )
}

