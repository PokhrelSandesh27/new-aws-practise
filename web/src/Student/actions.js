import * as source from './source'

export function addStudent (requestParam) {
    return function (dispatch) {
        dispatch({
            type: 'ADD_STUDENT',
            payload: source.addStudent(requestParam),
        })
    }
}

export function searchStudent (reqParam = {}) {
    return function (dispactch) {
        dispactch({
            type: 'SEARCH_STUDENT',
            payload: source.searchStudent(reqParam),
        })
    }
}

export function clearSearch () {
    return function (dispatch) {
        dispatch({
            type: 'CLEAR_SEARCH_STUDENTS',
        })
    }
}

export const searchStudentById = id => (dispatch) => dispatch(searchStudentByIdAwait(id))

export function searchStudentByIdAwait (id) {
    return {
        type: 'SEARCH_STUDENT_BY_ID',
        payload: source.searchStudent({ 'student': id }),
    }
}

export function getStudentById (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_STUDENT_BY_ID',
            payload: source.getStudentById(id),
        })
    }
}

export function createNewUser (requestParam) {
    return {
        type: 'ADD_STUDENT',
        payload: source.addStudent(requestParam),
    }
}

export function assignUserToClassroom (requestParam) {
    return function (dispatch) {
        dispatch({
            type: 'ASSIGN_STUDENT_TO_CLASSROOM',
            payload: source.createStudent(requestParam),
        })
    }
}
