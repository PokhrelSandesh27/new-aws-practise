import * as source from './source'

export function createSubject (body) {
    return function (dispatch) {
        dispatch({
            type: 'CREATE_SUBJECT',
            payload: source.createSubject(body),
        })
    }
}

export function getAllSubjects () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_SUBJECTS',
            payload: source.getAllSubjects(),
        })
    }
}
export function getSubject (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_SUBJECT',
            payload: source.getSubjectById(id),
        })
    }
}
