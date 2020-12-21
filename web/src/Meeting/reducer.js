const initialState = {
    meeting: {},
    meetings: [],

    addState: 0,
    fetchState: 0,

    updateState: 0,
    deleteState: 0,
    serchState:0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MEETING_PENDING':
            return { ...state, addState: 1 }
        case 'ADD_MEETING_FULFILLED':
            return { ...state, addState: 2, meeting: action.payload.data }
        case 'ADD_MEETING_REJECTED':
            return { ...state, addState: 3 }

        case 'GET_MEETING_BY_ID_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_MEETING_BY_ID_FULFILLED':
            return { ...state, fetchState: 2, meeting: action.payload.data }
        case 'GET_MEETING_BY_ID_REJECTED':
            return { ...state, fetchState: 3 }

        case 'UPDATE_MEETING_PENDING':
            return { ...state, updateState: 1 }
        case 'UPDATE_MEETING_FULFILLED':
            return { ...state, updateState: 2, meeting: action.payload.data }
        case 'UPDATE_MEETING_REJECTED':
            return { ...state, updateState: 3 }

        case 'DELETE_MEETING_PENDING':
            return { ...state, deleteState: 1 }
        case 'DELETE_MEETING_FULFILLED':
            return { ...state, deleteState: 2, meeting: action.payload.data }
        case 'DELETE_MEETING_REJECTED':
            return { ...state, deleteState: 3 }

        case 'GET_ALL_MEETING_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_MEETING_FULFILLED':
            return { ...state, fetchState: 2, meetings: action.payload.data }
        case 'GET_ALL_MEETING_REJECTED':
            return { ...state, fetchState: 3 }

        case 'SEARCH_MEETING_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_MEETING_FULFILLED':
            return { ...state, serchState: 2, meetings: action.payload.data }
        case 'SEARCH_MEETING_REJECTED':
            return { ...state, serchState: 3 }

        default:
            return state
    }
}

export default reducer
