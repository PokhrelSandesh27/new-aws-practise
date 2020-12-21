import * as source from './source'

export function createExam (req) {
    return {
        type: 'CREATE_EXAM',
        payload: source.createExam(req),
    }
}

export function getExams () {
    return function (dispatch) {
        dispatch({
            type: 'GET_EXAMS',
            payload: source.getExams(),
        })
    }
}


export function getExam (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_EXAM',
            payload: source.getExam(id),
        })
    }
}


export function searchExam (reqParam) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_EXAM_DETAILS',
            payload: source.searchExam(reqParam)
        })
    }
}
