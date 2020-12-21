import { request } from '../request'

export const createPayment = req => {
    return request.post('payments/create', req)
}

export const getPayments = () => {
    return request.get('payments/read')
}

export const getPayment = id => {
    return request.get(`payments/read/${id}`)
}

export const searchPayments = req => {
    return request.post(`payments/search`, req)
}
