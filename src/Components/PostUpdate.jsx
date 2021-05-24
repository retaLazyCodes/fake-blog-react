import { useParams } from "react-router"
import { PostDetails } from './PostDetails';
import { useForm } from "react-hook-form";
import { Alert } from './Alert'
import { updatePost } from './services/posts/updatePost'
import Swal from 'sweetalert2'

export const PostUpdate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams()

    const onSubmit = (data, e) => {
        data.userId = 1

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')

                if (id <= 100) {
                    updatePost(id).then(post => {
                        console.log(post)
                    })
                        .catch(e => {
                            console.log(e)
                        })

                    e.target.reset()
                }
                else {
                    data.id = parseInt(id)
                    updateStoredPost(data)
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }

    const updateStoredPost = (data) => {
        console.log(data)
        const storedPosts = JSON.parse(localStorage.getItem('posts'))
        const filteredPosts = storedPosts.filter(post => post.id !== data.id)
        const indexPost = storedPosts.findIndex(post => post.id === data.id)
        if (filteredPosts.length > 0) {
            storedPosts[indexPost] = data
            localStorage.setItem('posts', JSON.stringify(storedPosts))
        }
    }

    return (
        <>
            <PostDetails />
            <form onSubmit={handleSubmit(onSubmit)} className="container w-50 mt-1">

                <div className="mb-3">
                    <label className="form-label" style={{ fontSize: "1.2rem" }}>
                        Title
                </label>
                    <input
                        className="form-control my-1"
                        placeholder="Enter the new Title"
                        {...register("title", {
                            required: {
                                value: true,
                                message: "The title is required"
                            },
                            minLength: {
                                value: 5,
                                message: "The title must be longer than 5 characters"
                            }
                        })}
                    />
                    {errors?.title?.message ? <Alert msg={errors.title.message} type="danger" /> : null}

                </div>

                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                    Post content
            </label>
                <textarea
                    className="form-control my-1"
                    rows="6"
                    {...register("body", {
                        required: {
                            value: true,
                            message: "The post content is required"
                        },
                        minLength: {
                            value: 10,
                            message: "The post content must be longer than 10 characters"
                        }
                    })}
                >

                </textarea>
                {errors?.body?.message ? <Alert msg={errors.body.message} type="danger" /> : null}

                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-lg btn-outline-primary mr-3 mb-4">
                            Update Post
                    </button>
                    </div>
                </div>
            </form>
        </>
    )

}
