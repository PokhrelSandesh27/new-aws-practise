import * as source from './source'

export const createInformation = req => dispatch => {
    dispatch(createInformationAwait(req))
}

export function createInformationAwait (req) {
    return {
        type: 'CREATE_INFORMATION',
        payload: source.createInformation(req),
    }
}

export function getInformations () {
    return function (dispatch) {
        dispatch({
            type: 'GET_INFORMATIONS',
            payload: source.getInformations(),
        })
    }
}

export function getInformationAwait (id) {
    return {
        type: 'GET_INFORMATION',
        payload: source.getInformation(id),
    }
}

export const getInformation = id => dispatch => dispatch(getInformationAwait(id))

export function searchInformationAwait (req) {
    return {
        type: 'SEARCH_INFORMATION',
        payload: source.searchInformation(req),
    }
}

export const searchInformation = req => dispatch => dispatch(searchInformationAwait(req))
