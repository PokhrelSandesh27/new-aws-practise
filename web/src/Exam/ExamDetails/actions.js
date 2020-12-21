import * as source from './source'

export function createExamDetailAwait (req) {
    return {
        type: 'CREATE_EXAM_DETAIL',
        payload: source.createExamDetail(req),
    }
}

export const createExamDetail = req => dispatch => dispatch(createExamDetailAwait(req))

export const getExamDetails = () => dispatch => dispatch(getExamDetailsAwait())

export const getExamDetail = (id) => dispatch => dispatch(getExamDetailAwait(id))

export function getExamDetailsAwait () {
    return {
        type: 'GET_EXAM_DETAILS',
        payload: source.getExamDetails(),
    }
}

export function getExamDetailAwait (id) {
    return {
        type: 'GET_EXAM_DETAIL',
        payload: source.getExamDetail(id),
    }
}

export function searchExamDetail (reqParam) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_EXAM_DETAILS',
            payload: source.searchExamDetail(reqParam)
        })
    }
}


export function hasAttend (studentID, examDetailsId) {
    return function (dispatch) {
        dispatch({
            type: 'HAS_ATTEND_EXAM',
            payload: source.hasAttend(studentID, examDetailsId),
            meta:examDetailsId
        })
    }
}
