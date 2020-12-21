import * as source from './source'

export const createPayment = (req) => dispatch => dispatch(createPaymentAwait(req))

export function createPaymentAwait (req) {
    return {
        type: 'CREATE_PAYMENT',
        payload: source.createPayment(req),
    }
}

export function addPaymentCategory (createReq) {
    return {
        type: 'ADD_PAYMENT_CATEGORY',
        payload: source.addPaymentCategories(createReq)
    }
}

export function getAllPaymentCategory () {
    return function (dispatch) {
        dispatch({
            type: 'GET_All_PAYMENTS_CATEGORY',
            payload: source.getAllPaymentCategory(),
        })
    }
}

export function getPayments () {
    return function (dispatch) {
        dispatch({
            type: 'GET_PAYMENTS',
            payload: source.getPayments(),
        })
    }
}

export function getPayment (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_PAYMENT',
            payload: source.getPayment(id),
        })
    }
}

export const searchPayments = req => dispatch => {
    dispatch(searchPaymentsAwait(req))
}

export const searchPaymentsAwait = req => ({
    type: 'SEARCH_PAYMENTS',
    payload: source.searchPayments(req),
})
export const makeAPayment = id => dispatch => {
    dispatch(makeAPaymentAwait(id))
}

export const makeAPaymentAwait = id => ({
    type: 'MAKE_A_PAYMENT',
    payload: source.makeAPayment(id),
})

export function createPaymentConfig (req) {
    return {
        type: 'CREATE_PAYMENT_CONFIG',
        payload: source.createPaymentConfig(req),
    }
}

export function getAllPaymentConfig () {
    return function (dispatch) {
        dispatch({
            type: 'GET_All_PAYMENTS_CONFIG',
            payload: source.getAllPaymentConfig(),
        })
    }
}

export function searchPaymentConfig (reqParam = {}) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_PAYMENT_CONFIG',
            payload: source.searchPaymentConfig(reqParam)
        })
    }
}

export function getAllScholarConfig () {
    return function (dispatch) {
        dispatch({
            type: 'GET_All_SCHOLAR_CONFIG',
            payload: source.getAllScholarConfig(),
        })
    }
}

export function createScholarConfig (req) {
    return {
        type: 'CREATE_SCHOLAR_CONFIG',
        payload: source.createScholarConfig(req),
    }
}

export function generatePayment (id, index) {
    return {
        type: 'GENERATE_PAYMENT_CONFIG',
        payload: source.generatePayment(id),
        meta: index
    }
}

export function generateScholar (id, i) {
    return {
        type: 'GENERATE_SCHOLARSHIP',
        payload: source.generateScholar(id),
        meta: i
    }
}
