import { request } from '../../request'

export const createExam = req => {
    return request.post('exams/create', req)
}

export const getExams = () => {
    return request.get('exams/read')
}

export const getExam = id => {
    return request.get(`exams/read/${id}`)
}


export const searchExam = reqParam => {
    return request.post('exams/search', reqParam)
}
