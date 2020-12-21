import { request } from '../../request'

export const createMarkSheet = req => {
    return request.post('marksheets/create', req)
}

export const getMarkSheets = () => {
    return request.get('marksheets/read')
}

export const getMarkSheet = id => {
    return request.get(`marksheets/read/${id}`)
}

export const searchMarkSheets = req => {
    return request.post(`marksheets/search`, req)
}
