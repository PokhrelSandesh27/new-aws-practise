import { request } from '../request'

export const getInformations = () => {
    return request.get('informations/read')
}

export const getInformation = (id) => {
    return request.get(`informations/read/${id}`)
}

export const createInformation = (req) => {
    return request.post(`informations/create`, req)
}

export const searchInformation = (req) => {
    return request.post(`informations/search`, req)
}

//
// export const searchClassroom = reqParam => {
//     return request.post('/search', reqParam)
// }
