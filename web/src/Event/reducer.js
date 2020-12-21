const initialState = {
    uploadState: 0,
    searchState: 0,
    createState: 0,
    readState: 0,
    readAllState: 0,
    fetchState: 0,

    event: {},
    events: [],
    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CREATE_EVENT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_EVENT_FULFILLED':
            return { ...state, createState: 2, event: action.payload.data }
        case 'CREATE_EVENT_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_EVENT_PENDING':
            return { ...state, readState: 1 }
        case 'GET_EVENT_FULFILLED':
            return { ...state, readState: 2, event: action.payload.data }
        case 'GET_EVENT_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_EVENTS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_EVENTS_FULFILLED':
            return { ...state, readAllState: 2, events: action.payload.data }
        case 'GET_EVENTS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_EVENT_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_EVENT_FULFILLED':
            return { ...state, searchState: 2, events: action.payload.data }
        case 'SEARCH_EVENT_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
