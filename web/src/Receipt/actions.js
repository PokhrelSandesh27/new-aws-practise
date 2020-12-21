import * as source from './source'

export const createReceipt = req => dispatch => dispatch(createReceiptAwait(req))

export function createReceiptAwait (req) {
    return {
        type: 'CREATE_RECEIPT',
        payload: source.createReceipt(req),
    }
}

export function getReceipts () {
    return function (dispatch) {
        dispatch({
            type: 'GET_RECEIPTS',
            payload: source.getReceipts(),
        })
    }
}

export function getReceipt (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_RECEIPT',
            payload: source.getReceipt(id),
        })
    }
}

export function searchReceipts (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_RECEIPTS',
            payload: source.searchReceipts(req),
        })
    }
}

export const generateReceipts = (req) => dispatch => dispatch(generateReceiptsAwait(req))

export function generateReceiptsAwait (req) {
    return {
        type: 'GENERATE_RECEIPTS',
        payload: source.generateReceipts(req),
    }
}

export const makeAPayment = id => dispatch => dispatch(makeAPaymentAwait(id))

export function makeAPaymentAwait (id) {
    return {
        type: 'MAKE_A_PAYMENT',
        payload: source.makeAPayment(id),
    }
}
