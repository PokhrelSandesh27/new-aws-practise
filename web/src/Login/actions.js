import { loginUser } from './source'
import { LOGIN_USER } from './konstants'

export function login (auth) {
    return {
        type: LOGIN_USER,
        payload: loginUser(auth)
    }
}

export function setUser (user) {
    return function (dispatch) {
        dispatch({
            type: 'SET_USER',
            payload: user
        })
    }
}

//export function login (auth) {
//     return function (dispatch) {
//         dispatch({
//             type: 'LOGIN_USER',
//             payload: loginUser(auth)
//         })
//     }
// }
