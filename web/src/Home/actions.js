import * as source from './source'

export function addClassroom (createReq) {
    return function (dispactch) {
        dispactch({
            type: 'ADD_CLASSROOM',
            payload: source.addClassroom(createReq),
        })
    }
}

export function getClassroomById (id) {
    return function (dispactch) {
        dispactch({
            type: 'GET_CLASSROOM_BY_ID',
            payload: source.getClassroomById(id),
        })
    }
}

export function updateClassroom () {
    return function (dispactch) {
        dispactch({
            type: 'UPDATE_CLASSROOM',
            payload: source.updateClassroom(),
        })
    }
}

export function deleteClassroom () {
    return function (dispactch) {
        dispactch({
            type: 'DELETE_CLASSROOM',
            payload: source.deleteClassroom(),
        })
    }
}

export function getAllClassroom () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_CLASSROOM',
            payload: source.getAllClassroom(),
        })
    }
}
//
// export function searchClassroom (reqParam = {}) {
//     return function (dispatch) {
//         dispatch({
//             type: 'SEARCH_Classroom',
//             payload: source.searchClassroom(reqParam)
//         })
//     }
// }
