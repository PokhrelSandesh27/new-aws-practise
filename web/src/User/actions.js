import * as source from './source'

export function getAllUsers () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_USER',
            payload: source.getAllUsers(),
        })
    }
}

export function createUser (req) {
    return {
        type: 'CREATE_USER',
        payload: source.createUser(req),
    }
}

export function uploadProfile (userId, formBody) {
    return function (dispatch) {
        dispatch({
            type: 'UPLOAD_PROFILE',
            payload: source.uploadBook(userId, formBody),
        })
    }
}

export const getUserById = id => dispatch => {
    dispatch(getUserByIdAwait(id))
}

export const getUserByIdAwait = id => ({
    type: 'GET_USER_BY_ID',
    payload: source.getUserById(id),
})

export function searchUser (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_USER',
            payload: source.searchUser(req),
        })
    }
}

export const searchUsers = req => dispatch => {
    dispatch(searchUserAwait(req))
}

export function searchUserAwait (req) {
    return {
        type: 'SEARCH_USER',
        payload: source.searchUser(req),
    }
}


export function clearSearch () {
    return function (dispatch) {
        dispatch({
            type: 'CLEAR_SEARCH_USERS',
        })
    }
}
