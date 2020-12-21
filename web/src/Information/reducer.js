const initialState = {
    uploadState: 0,
    searchState: 0,
    createState: 0,
    readState: 0,
    readAllState: 0,

    information: {},
    informations: [],

    fetchState: 0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_INFORMATION_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_INFORMATION_FULFILLED':
            return { ...state, createState: 2, information: action.payload.data }
        case 'CREATE_INFORMATION_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_INFORMATION_PENDING':
            return { ...state, readState: 1 }
        case 'GET_INFORMATION_FULFILLED':
            return { ...state, readState: 2, information: action.payload.data }
        case 'GET_INFORMATION_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_INFORMATIONS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_INFORMATIONS_FULFILLED':
            return { ...state, readAllState: 2, informations: action.payload.data }
        case 'GET_INFORMATIONS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_INFORMATION_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_INFORMATION_FULFILLED':
            return { ...state, searchState: 2, informations: action.payload.data }
        case 'SEARCH_INFORMATION_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
