import * as source from './source'

export const createEvent = req => dispatch => {
    dispatch(createEventAwait(req))
}

export function createEventAwait (req) {
    return {
        type: 'CREATE_EVENT',
        payload: source.createEvent(req),
    }
}

export function getEvents () {
    return function (dispatch) {
        dispatch({
            type: 'GET_EVENTS',
            payload: source.getEvents(),
        })
    }
}

export function getEventAwait (id) {
    return {
        type: 'GET_EVENT',
        payload: source.getEvent(id),
    }
}

export const getEvent = id => dispatch => dispatch(getEventAwait(id))

export function searchEventAwait (req) {
    return {
        type: 'SEARCH_EVENT',
        payload: source.searchEvent(req),
    }
}

export const searchEvent = req => dispatch => dispatch(searchEventAwait(req))
