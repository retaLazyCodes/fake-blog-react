import { useForm } from "react-hook-form";
import { Alert } from './Alert'
import { createPost } from './services/posts/createPost'
import Swal from 'sweetalert2'

export const PostForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        data.userId = 1
        createPost(data).then(post => {
            console.log(post)
            savePost(post)
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        })
            .catch(e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })

        e.target.reset()
    }

    const savePost = (data) => {
        if (!localStorage.getItem('posts')) {
            localStorage.setItem('posts', JSON.stringify([data]));
        } else {
            const posts = JSON.parse(localStorage.getItem('posts'));
            console.log({ posts })
            const lastId = posts[posts.length - 1].id
            data.id = lastId + 1
            posts.push(data);
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container w-50 mt-3">

            <div className="mb-5">
                <label className="form-label" style={{ fontSize: "1.5rem" }}>
                    Title
                </label>
                <input
                    className="form-control my-3"
                    placeholder="I'm a Alkymer!!"
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

            <label className="form-label" style={{ fontSize: "1.5rem" }}>
                Post content
            </label>
            <textarea
                className="form-control my-3"
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
            { errors?.body?.message ? <Alert msg={errors.body.message} type="danger" /> : null}

            <div className="row">
                <div className="col text-center">
                    <button className="btn btn-lg btn-outline-primary mr-3">
                        Add Post
                    </button>
                </div>
            </div>
        </form>
    )
}