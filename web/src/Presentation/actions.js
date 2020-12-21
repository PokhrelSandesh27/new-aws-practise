import * as source from './source'

export function createPresentation (requestParam) {
    return {
        type: 'CREATE_PRESENTATION',
        payload: source.createPresentation(requestParam),
    }
}

export function uploadPresentation (presentation, reqParam) {
    return {
        type: 'UPLOAD_PRESENTATION',
        payload: source.uploadPresentation(presentation, reqParam),
    }
}


export function getAllPresentation () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_PRESENTATION',
            payload: source.getAllPresentation(),
        })
    }
}

export function getPresentationDetails (req) {
    return function (dispatch) {
        dispatch({
            type: 'GET_PRESENTATION_DETAILS',
            payload: source.getPresentationDetails(req),

        })
    }
}

export function searchPresentation (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_PRESENTATION',
            payload: source.searchPresentation(req),

        })
    }
}
