import * as source from './source'

export function addTimeTable (createReq) {
    return {
        type: 'ADD_TIMETABLE',
        payload: source.addTimeTable(createReq)
    }
}

export function getTimeTableById (id) {
    return function (dispactch) {
        dispactch({
            type: 'GET_TIMETABLE_BY_ID',
            payload: source.getTimeTableById(id)
        })
    }
}

export function getAllTimeTable () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_TIMETABLE',
            payload: source.getAllTimeTable()
        })
    }
}

export function searchTimeTable (reqParam = {}) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_TIMETABLE',
            payload: source.searchTimeTable(reqParam)
        })
    }
}
