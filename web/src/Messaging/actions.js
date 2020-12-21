import * as source from './source'

export const createMessage = req => dispatch => dispatch(createMessageAwait(req))

export function createMessageAwait (req) {
    return {
        type: 'CREATE_MESSAGE',
        payload: source.createMessage(req),
    }
}

export function getMessages () {
    return function (dispatch) {
        dispatch({
            type: 'GET_MESSAGES',
            payload: source.getMessages(),
        })
    }
}

export function getMessage (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_MESSAGE',
            payload: source.getMessage(id),
        })
    }
}

export const searchMessages = req => dispatch => dispatch(searchMessagesAwait(req))

export const searchMessagesAwait = req => {
    return {
        type: 'SEARCH_MESSAGES',
        payload: source.searchMessages(req),
    }
}
