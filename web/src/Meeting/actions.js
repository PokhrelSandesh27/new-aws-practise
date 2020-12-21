import * as source from './source'

export function addMeeting (createReq) {
    return function (dispatch) {
        dispatch({
            type: 'ADD_MEETING',
            payload: source.addMeeting(createReq),
        })

    }
}

export function getMeetingById (id) {
    return function (dispactch) {
        dispactch({
            type: 'GET_MEETING_BY_ID',
            payload: source.getMeetingById(id),
        })
    }
}

export function updateMeeting () {
    return function (dispactch) {
        dispactch({
            type: 'UPDATE_MEETING',
            payload: source.updateMeeting(),
        })
    }
}

export function deleteMeeting () {
    return function (dispactch) {
        dispactch({
            type: 'DELETE_MEETING',
            payload: source.deleteMeeting(),
        })
    }
}

export function getAllMeeting () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_MEETING',
            payload: source.getAllMeeting(),
        })
    }
}

export function searchMeeting (reqParam = {}) { // complete the rest of the work here, source and then reducer
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_MEETING',
            payload: source.searchMeeting(reqParam),
        })
    }
}
