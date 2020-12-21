const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

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

        case 'ADD_PAYMENT_CATEGORY_PENDING':
            return { ...state, createState: 1 }
        case 'ADD_PAYMENT_CATEGORY_FULFILLED':
            return { ...state, createState: 2, payment: action.payload.data }
        case 'ADD_PAYMENT_CATEGORY_REJECTED':
            return { ...state, createState: 3, }

        case 'CREATE_PAYMENT_CONFIG_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_PAYMENT_CONFIG_FULFILLED':
            return { ...state, createState: 2, payment: action.payload.data }
        case 'CREATE_PAYMENT_CONFIG_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_All_PAYMENTS_CONFIG_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_All_PAYMENTS_CONFIG_FULFILLED':
            return { ...state, readAllState: 2, payments: action.payload.data }
        case 'GET_All_PAYMENTS_CONFIG_REJECTED':
            return { ...state, readAllState: 3, }

        case 'GET_All_SCHOLAR_CONFIG_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_All_SCHOLAR_CONFIG_FULFILLED':
            return { ...state, readAllState: 2, payments: action.payload.data }
        case 'GET_All_SCHOLAR_CONFIG_REJECTED':
            return { ...state, readAllState: 3, }

        case 'CREATE_SCHOLAR_CONFIG_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_SCHOLAR_CONFIG_FULFILLED':
            return { ...state, createState: 2, payment: action.payload.data }
        case 'CREATE_SCHOLAR_CONFIG_REJECTED':
            return { ...state, createState: 3, }

        case 'GENERATE_PAYMENT_CONFIG_PENDING':
            return { ...state, readState: 1 }
        case 'GENERATE_PAYMENT_CONFIG_FULFILLED':
            const index = action.meta //getting values from meta

            const payments = [...state.payments] // copying all the payments

            payments[index].isGenerated = true

            return { ...state, readState: 2, payment: action.payload.data, payments }
        case 'GENERATE_PAYMENT_CONFIG_REJECTED':
            return { ...state, readState: 3, }

        case 'GENERATE_SCHOLARSHIP_PENDING':
            return { ...state, readState: 1 }
        case 'GENERATE_SCHOLARSHIP_FULFILLED':
            const i = action.meta
            const scholar = [...state.payments]
            scholar[i].isGenerated = true
            return { ...state, readState: 2, payment: action.payload.data, payments: scholar }
        case 'GENERATE_SCHOLARSHIP_REJECTED':
            return { ...state, readState: 3, }

        case 'SEARCH_PAYMENT_CONFIG_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_PAYMENT_CONFIG_FULFILLED':
            return { ...state, serchState: 2, payments: action.payload.data }
        case 'SEARCH_PAYMENT_CONFIG_REJECTED':
            return { ...state, serchState: 3 }

        default:
            return state
    }
}

export default reducer
