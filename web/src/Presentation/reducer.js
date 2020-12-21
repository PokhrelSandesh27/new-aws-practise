const initialState = {
    presentation: {},
    presentations:[],
    uploadState: 0,
    createState: 0,
    fetchState: 0,
    searchState: 0,
    error: {},
}

const reducer = (state =initialState, action) => {
    switch (action.type)  {
        case 'CREATE_PRESENTATION_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_PRESENTATION_FULFILLED':
            return { ...state, createState: 2, presentation: action.payload.data }
        case 'CREATE_PRESENTATION_REJECTED':
            return { ...state, createState: 3 }


        case 'UPLOAD_PRESENTATION_PENDING':
            return { ...state, uploadState: 1 }
        case 'UPLOAD_PRESENTATION_FULFILLED':
            return { ...state, uploadState: 2, presentation: action.payload.data }
        case 'UPLOAD_PRESENTATION_REJECTED':
            return { ...state, uploadState: 3 }


        case 'GET_PRESENTATION_DETAILS_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_PRESENTATION_DETAILS_FULFILLED':
            return { ...state, fetchState: 2, presentation: action.payload.data }
        case 'GET_PRESENTATION_DETAILS_REJECTED':
            return { ...state, fetchState: 3 }

        case 'GET_ALL_PRESENTATION_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_PRESENTATION_FULFILLED':
            return { ...state, fetchState: 2, presentations: action.payload.data }
        case 'GET_ALL_PRESENTATION_REJECTED':
            return { ...state, fetchState: 3 }

        case 'SEARCH_PRESENTATION_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_PRESENTATION_FULFILLED':
            return { ...state, searchState: 2, presentations: action.payload.data }
        case 'SEARCH_PRESENTATION_REJECTED':
            return { ...state, searchState: 3, }

        default: return state

    }
}

export default reducer
