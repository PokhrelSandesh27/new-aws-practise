import {request} from '../request'

export const addStudent = requestParam => {
    return request.post('students/create', requestParam)
}

export const searchStudent = reqParam => {
    return request.post('students/search', reqParam)
}

export const createStudent = reqParam => {
    return request.post('students/create', reqParam)
}

export const getStudentById = id => {
    return request.get(`users/read/${id}`)
}
