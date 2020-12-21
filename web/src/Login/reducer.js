import { LOGIN_USER } from './konstants'

const initialState = {
    user: {},
    loginState: 0,
    loginError: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }

        case `${LOGIN_USER}_PENDING`:
            return { ...state, loginState: 1 }
        case `${LOGIN_USER}_FULFILLED`:
            const user = action.payload.data
            localStorage.setItem('user', JSON.stringify(user))
            return { ...state, loginState: 2, user }
        case `${LOGIN_USER}_REJECTED`:
            return { ...state, loginState: 3, loginError: action.payload.response.data }

        default:
            return state
    }
}

export default reducer
