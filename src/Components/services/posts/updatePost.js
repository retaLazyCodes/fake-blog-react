import axios from 'axios'

export const updatePost = (id) => {

    return axios.put("https://jsonplaceholder.typicode.com/posts/" + id)
        .then(response => {
            const { data } = response
            return data
        })


}