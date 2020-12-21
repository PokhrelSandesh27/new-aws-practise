import { request } from '../request'

export const createMessage = req => {
    return request.post('messages/create', req)
}

export const getMessages = () => {
    return request.get('messages/read')
}

export const getMessage = id => {
    return request.get(`messages/read/${id}`)
}

export const searchMessages = req => {
    return request.post(`messages/search`, req)
}
