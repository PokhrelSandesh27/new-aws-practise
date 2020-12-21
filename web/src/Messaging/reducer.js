const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

    message: {},
    messages: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_MESSAGE_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_MESSAGE_FULFILLED':
            return { ...state, createState: 2, message: action.payload.data }
        case 'CREATE_MESSAGE_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_MESSAGE_PENDING':
            return { ...state, readState: 1 }
        case 'GET_MESSAGE_FULFILLED':
            return { ...state, readState: 2, message: action.payload.data }
        case 'GET_MESSAGE_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_MESSAGES_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_MESSAGES_FULFILLED':
            return { ...state, readAllState: 2, messages: action.payload.data }
        case 'GET_MESSAGES_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_MESSAGES_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_MESSAGES_FULFILLED':
            return { ...state, searchState: 2, messages: action.payload.data }
        case 'SEARCH_MESSAGES_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
