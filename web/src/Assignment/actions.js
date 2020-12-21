import * as source from './source'

export function createAssignment (req) {
    return {
        type: 'CREATE_ASSIGNMENT',
        payload: source.createAssignment(req),
    }
}

export function uploadAssignment (assignment, req) {
    return {
        type: 'UPLOAD_ASSIGNMENT',
        payload: source.uploadAssignment(assignment, req),
    }
}

export function getAssignments () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ASSIGNMENTS',
            payload: source.getAssignments(),
        })
    }
}

export function getAssignmentAwait (id) {
    return {
        type: 'GET_ASSIGNMENT',
        payload: source.getAssignment(id),
    }
}

export const getAssignment = id => dispatch => dispatch(getAssignmentAwait(id))

export function searchAssignment (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_ASSIGNMENT',
            payload: source.searchAssignment(req),
        })
    }
}
