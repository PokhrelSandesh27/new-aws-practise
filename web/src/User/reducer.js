const initialState = {
    user: {},
    users: [], // users: []

    addState: 0,
    fetchState: 0, // .
    lookState:0,
    updateState: 0,
    deleteState: 0,
    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_USER_FULFILLED':
            return { ...state, fetchState: 2, users: action.payload.data }
        case 'GET_ALL_USER_REJECTED':
            return { ...state, fetchState: 3 }
        case 'GET_ALL_USER_PENDING':
            return { ...state, fetchState: 1 }



        case 'CREATE_USER_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_USER_FULFILLED':
            return { ...state, createState: 2, user: action.payload.data }
        case 'CREATE_USER_REJECTED':
            return { ...state, createState: 3, }

        case 'UPLOAD_PROFILE_PENDING':
            return { ...state, uploadState: 1 }
        case 'UPLOAD_PROFILE_FULFILLED':
            return { ...state, uploadState: 2, user: action.payload.data }
        case 'UPLOAD_PROFILE_REJECTED':
            return { ...state, uploadState: 3, }

        case 'GET_USER_BY_ID_PENDING':
            return { ...state, readState: 1 }
        case 'GET_USER_BY_ID_FULFILLED':
            return { ...state, readState: 2, user: action.payload.data }
        case 'GET_USER_BY_ID_REJECTED':
            return { ...state, readState: 3, }

        case 'SEARCH_USER_PENDING':
            return { ...state, lookState: 1 }
        case 'SEARCH_USER_FULFILLED':
            return { ...state, lookState: 2, users: action.payload.data }
        case 'SEARCH_USER_REJECTED':
            return { ...state, lookState: 3, }

        default:
            return state
    }
}

export default reducer
