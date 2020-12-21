const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,
    makeAPaymentState: 0,

    payment: {},
    payments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_PAYMENT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_PAYMENT_FULFILLED':
            return { ...state, createState: 2, payment: action.payload.data }
        case 'CREATE_PAYMENT_REJECTED':
            return { ...state, createState: 3, }

        case 'ADD_PAYMENT_CATEGORY_PENDING':
            return { ...state, createState: 1 }
        case 'ADD_PAYMENT_CATEGORY_FULFILLED':
            return { ...state, createState: 2, payment: action.payload.data }
        case 'ADD_PAYMENT_CATEGORY_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_PAYMENT_PENDING':
            return { ...state, readState: 1 }
        case 'GET_PAYMENT_FULFILLED':
            return { ...state, readState: 2, payment: action.payload.data }
        case 'GET_PAYMENT_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_All_PAYMENTS_CATEGORY_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_All_PAYMENTS_CATEGORY_FULFILLED':
            return { ...state, readAllState: 2, payments: action.payload.data }
        case 'GET_All_PAYMENTS_CATEGORY_REJECTED':
            return { ...state, readAllState: 3, }

        case 'GET_PAYMENTS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_PAYMENTS_FULFILLED':
            return { ...state, readAllState: 2, payments: action.payload.data }
        case 'GET_PAYMENTS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_PAYMENTS_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_PAYMENTS_FULFILLED':
            return { ...state, searchState: 2, payments: action.payload.data }
        case 'SEARCH_PAYMENTS_REJECTED':
            return { ...state, searchState: 3, }

        case 'MAKE_A_PAYMENT_PENDING':
            return { ...state, makeAPayment: 1 }
        case 'MAKE_A_PAYMENT_FULFILLED':
            return { ...state, makeAPayment: 2, payment: action.payload.data }
        case 'MAKE_A_PAYMENT_REJECTED':
            return { ...state, makeAPayment: 3, }

        default:
            return state
    }
}

export default reducer
