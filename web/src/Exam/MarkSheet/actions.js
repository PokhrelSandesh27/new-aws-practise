import * as source from './source'

export function createMarkSheet (req) {
    return {
        type: 'CREATE_MARK_SHEET',
        payload: source.createMarkSheet(req),
    }
}

export function getMarkSheets () {
    return function (dispatch) {
        dispatch({
            type: 'GET_MARK_SHEETS',
            payload: source.getMarkSheets(),
        })
    }
}

export function getMarkSheet (id) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_MARK_SHEET',
            payload: source.getMarkSheet(id),
        })
    }
}

export function searchMarkSheets (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_MARK_SHEETS',
            payload: source.searchMarkSheets(req),
        })
    }
}
