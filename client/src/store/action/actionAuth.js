import axios from "axios"

export const AUTH = 'AUTH'
export const FETCH_USER = 'FETCH_USER'
// export const HANDLE_TOKEN = 'HANDLE_TOKEN'

export const auth = (details) => {
    return {
        type: AUTH,
        userDetails: details
    }
}

export const authFetchUser = (data) => {
    return {
        type: FETCH_USER,
        userDetails: data
    }
}

// export const stripeToken  = (data) => {
//     return {
//         type : HANDLE_TOKEN,
//         payload: data
//     }
// }

export const authenticate = () => {
    return dispatch => {
        axios.get('/auth/google')
        .then(res => {
            console.log(res)
            dispatch(auth(res))
        })
        .catch(err => console.log(err))
    }
}

export const fetchUser = () => {
    return dispatch => {
        axios.get('/api/current_user')
        .then(res => {
            console.log("User Data:", res.data._id)
            dispatch(authFetchUser(res.data))
        })
    }
}

export const handleToken = (token) => {
    return dispatch => {
        axios.post('/api/stripes', token)
        .then(res => {
            console.log("successful!! HANDLE TOKEN  data is",res.data)
            dispatch(authFetchUser(res.data))
        })
        .catch(err => console.log(err))
    }
}