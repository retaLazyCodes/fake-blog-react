import axios from 'axios'

export const getAllPosts = (id) => {
    if (id) {
        return axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
            .then(response => {
                const { data } = response
                return data
            })
    }

    else {
        return axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const { data } = response
                return data
            })

    }
}