import * as source from './source'

export function createReleaseReport (req) {
    return {
        type: 'CREATE_RELEASE_REPORT',
        payload: source.createRelease(req),
    }
}

export function getRelease () {
    return function (dispatch) {
        dispatch({
            type: 'GET_RELEASE',
            payload: source.getRelease(),
        })
    }
}

export function getReleased (id) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_RELEASE_REPORT',
            payload: source.getRelease(id),
        })
    }
}

export function searchReleaseReport (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_RELEASE_REPORT',
            payload: source.searchReleaseReport(req),
        })
    }
}
