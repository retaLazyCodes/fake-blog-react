import { Post } from './Post'

export const PostList = ({ currentPosts, loading, error }) => {
    return (
        <div>
            <h1>Posts</h1>
            { loading ? <h2>Loading...</h2> : ''}
            <ul>
                {currentPosts.map(post =>
                    <Post key={post.id} post={post} />
                )}
            </ul>
            {error ? < span className="error">{error}</span> : ''}
        </div >
    )
}
