import * as source from './source'

export function createAssignmentSubmission (req) {
    return {
        type: 'CREATE_ASSIGNMENT_SUBMISSION',
        payload: source.createAssignmentSubmission(req),
    }
}

export function uploadAssignmentSubmission (assignment, req) {
    return {
        type: 'UPLOAD_ASSIGNMENT_SUBMISSION',
        payload: source.uploadAssignmentSubmission(assignment, req),
    }
}

export function getAssignmentSubmissions () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ASSIGNMENT_SUBMISSIONS',
            payload: source.getAssignmentsSubmission(),
        })
    }
}

export const getAssignmentSubmission = id => dispatch => dispatch(getAssignmentSubmissionAwait(id))

export function getAssignmentSubmissionAwait (id) {
    return {
        type: 'GET_ASSIGNMENT_SUBMISSION',
        payload: source.getAssignmentSubmission(id),
    }
}

export function searchAssignmentSubmission (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_ASSIGNMENT_SUBMISSION',
            payload: source.searchAssignmentSubmission(req),
        })
    }
}
