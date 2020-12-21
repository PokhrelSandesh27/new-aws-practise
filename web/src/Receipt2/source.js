import { request } from '../request'

export const createReceipt = req => {
    return request.post('receipts/create', req)
}

export const getReceipts = () => {
    return request.get('receipts/read')
}

export const getReceipt = id => {
    return request.get(`receipts/read/${id}`)
}

export const searchReceipts = req => {
    return request.post(`receipts/search`, req)
}

export const generateReceipts = req => {
    return request.put(`receipts/generate`, req)
}

export const makeAPayment = id => {
    return request.put(`receipts/${id}/pay`)
}
