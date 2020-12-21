import * as source from './source'

export function addAttendance (createReq) {
    return {
        type: 'ADD_ATTENDANCE',
        payload: source.addCreate(createReq)
    }
}
//
// export function getTimeTableById (id) {
//     return function (dispactch) {
//         dispactch({
//             type: 'GET_TIMETABLE_BY_ID',
//             payload: source.getTimeTableById(id)
//         })
//     }
// }

export function getAllAttendance () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_ATTENDANCE',
            payload: source.getAllAttendance()
        })
    }
}

export function searchAttendances (reqParam, SN) {
    console.log("serial in action",SN)
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_ATTENDANCE_ID',
            payload: source.searchAttendance(reqParam),
            // send snx_id -> meta
            meta: SN
        })
    }
}

export function searchAttendance (reqParam = {}) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_ATTENDANCE',
            payload: source.searchAttendance(reqParam)
        })
    }
}
