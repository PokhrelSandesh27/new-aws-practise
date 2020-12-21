const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,
    generateState: 0,
    makeAPaymentState: 0,

    receipt: {},
    receipts: [],
    generateMsg: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RECEIPT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_RECEIPT_FULFILLED':
            return { ...state, createState: 2, receipt: action.payload.data }
        case 'CREATE_RECEIPT_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_RECEIPT_PENDING':
            return { ...state, readState: 1 }
        case 'GET_RECEIPT_FULFILLED':
            return { ...state, readState: 2, receipt: action.payload.data }
        case 'GET_RECEIPT_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_RECEIPTS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_RECEIPTS_FULFILLED':
            return { ...state, readAllState: 2, receipts: action.payload.data }
        case 'GET_RECEIPTS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_RECEIPTS_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_RECEIPTS_FULFILLED':
            return { ...state, searchState: 2, receipts: action.payload.data }
        case 'SEARCH_RECEIPTS_REJECTED':
            return { ...state, searchState: 3, }

        case 'GENERATE_RECEIPTS':
            return { ...state, generateState: 0 }

        case 'GENERATE_RECEIPTS_PENDING':
            return { ...state, generateState: 1 }
        case 'GENERATE_RECEIPTS_FULFILLED':
            return { ...state, generateState: 2, generateMsg: action.payload.data }
        case 'GENERATE_RECEIPTS_REJECTED':
            return { ...state, generateState: 3, }

        case 'MAKE_A_PAYMENT_PENDING':
            return { ...state, makeAPaymentState: 1 }
        case 'MAKE_A_PAYMENT_FULFILLED':
            return { ...state, makeAPaymentState: 2, receipt: action.payload.data }
        case 'MAKE_A_PAYMENT_REJECTED':
            return { ...state, makeAPaymentState: 3, }

        default:
            return state
    }
}

export default reducer
