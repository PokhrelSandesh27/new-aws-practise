import {request} from '../request'

export const createSubject = body => {
    return request.post('subjects/create', body)
}

export const getAllSubjects = () => {
    return request.get('subjects/read')
}

export const getSubjectById = (id) => {
    return request.get('subjects/read/' + id)
}
