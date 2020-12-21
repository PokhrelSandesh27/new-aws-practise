import * as source from './source'

export const createPayment = (req) => dispatch => dispatch(createPaymentAwait(req))

export function createPaymentAwait (req) {
    return {
        type: 'CREATE_PAYMENT',
        payload: source.createPayment(req),
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

export function searchPayments (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_PAYMENTS',
            payload: source.searchPayments(req),
        })
    }
}
