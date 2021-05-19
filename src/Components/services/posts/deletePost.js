import axios from 'axios'

export const deletePost = (id) => {

    return axios.delete("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(response => {
            const { data } = response
            return data
        })


}