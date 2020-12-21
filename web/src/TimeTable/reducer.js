const initialState = {
    timetable: {},
    timetables: [],

    addState: 0,
    fetchState: 0,
    serchState:0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TIMETABLE_PENDING':
            return { ...state, addState: 1 }
        case 'ADD_TIMETABLE_FULFILLED':
            return { ...state, addState: 2, timetable: action.payload.data }
        case 'ADD_TIMETABLE_REJECTED':
            return { ...state, addState: 3 }

        case 'GET_TIMETABLE_BY_ID_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_TIMETABLE_BY_ID_FULFILLED':
            return { ...state, fetchState: 2, timetable: action.payload.data }
        case 'GET_TIMETABLE_BY_ID_REJECTED':
            return { ...state, fetchState: 3 }

        case 'GET_ALL_TIMETABLE_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_TIMETABLE_FULFILLED':
            return { ...state, fetchState: 2, timetables: action.payload.data }
        case 'GET_ALL_TIMETABLE_REJECTED':
            return { ...state, fetchState: 3 }

        case 'SEARCH_TIMETABLE_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_TIMETABLE_FULFILLED':
            return { ...state, serchState: 2, timetables: action.payload.data }
        case 'SEARCH_TIMETABLE_REJECTED':
            return { ...state, serchState: 3 }

        default:
            return state
    }
}

export default reducer
