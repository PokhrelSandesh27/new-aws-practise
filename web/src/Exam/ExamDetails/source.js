import { request } from '../../request'
import * as source from '../../MCQ/source'

export const createExamDetail = req => {
    return request.post('examdetails/create', req)
}

export const getExamDetails = () => {
    return request.get('examdetails/read')
}

export const getExamDetail = (id) => {
    return request.get('examdetails/read/'+ id)
}

export const searchExamDetail = reqParam => {
    return request.post('examdetails/search', reqParam)
}


export const hasAttend = (studentID, examDetailsId) => {
    return request.get(`examdetails/${studentID}/${examDetailsId}/has_attended`)
}
