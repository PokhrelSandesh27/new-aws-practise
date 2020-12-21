import { request } from '../request'

export const getEvents = () => {
    return request.get('events/read')
}

export const getEvent = (id) => {
    return request.get(`events/read/${id}`)
}

export const createEvent = (req) => {
    return request.post(`events/create`, req)
}

export const searchEvent = (req) => {
    return request.post(`events/search`, req)
}

//
// export const searchClassroom = reqParam => {
//     return request.post('/search', reqParam)
// }
