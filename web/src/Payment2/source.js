import { request } from '../request'

export const createPayment = req => {
    return request.post('payments/create', req)
}

export const addPaymentCategories = req => {
    return request.post('payment-categories/create', req)
}
export const getAllPaymentCategory = () => {
    return request.get('payment-categories/read')
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

export const makeAPayment = id => {
    return request.put(`payments/${id}/pay`)
}

export const createPaymentConfig = req => {
    return request.post('payment-configurations/create', req)
}
export const getAllPaymentConfig = () => {
    return request.get('payment-configurations/read')
}
export const getAllScholarConfig = () => {
    return request.get('scholarship-configurations/read')
}

export const searchPaymentConfig = reqParam => {
    return request.post('payment-configurations/search', reqParam)
}

export const createScholarConfig = req => {
    return request.post('scholarship-configurations/create', req)
}

export const generatePayment = id => {
    return request.post(`payment-configurations/generate/${id}`)
}

export const generateScholar = id => {
    return request.post(`scholarship-configurations/generate/${id}`)
}
