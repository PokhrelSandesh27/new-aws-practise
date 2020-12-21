const initialState = {
    attendance: {},
    attendances: [], // -> {}

    addState: 0,
    fetchState: 0,
    searchState:0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ATTENDANCE_PENDING':
            return { ...state, addState: 1 }
        case 'ADD_ATTENDANCE_FULFILLED':
            return { ...state, addState: 2, attendance: action.payload.data }
        case 'ADD_ATTENDANCE_REJECTED':
            return { ...state, addState: 3 }

        case 'GET_ATTENDANCE_BY_ID_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ATTENDANCE_BY_ID_FULFILLED':
            return { ...state, fetchState: 2, attendance: action.payload.data }
        case 'GET_TIMETABLE_BY_ID_REJECTED':
            return { ...state, fetchState: 3 }

        case 'GET_ALL_ATTENDANCE_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_ATTENDANCE_FULFILLED':
            return { ...state, fetchState: 2, attendances: action.payload.data }
        case 'GET_ALL_ATTENDANCE_REJECTED':
            return { ...state, fetchState: 3 }

        case 'SEARCH_ATTENDANCE_ID_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_ATTENDANCE_ID_FULFILLED':

            const SN = action.meta //getting values from meta
            console.log("serial number",SN);
            const attendances = {...state.attendances}
            attendances[SN] = action.payload.data

            return { ...state, serchState: 2, attendances }

        case 'SEARCH_ATTENDANCE_ID_REJECTED':
            return { ...state, serchState: 3 }






        case 'SEARCH_ATTENDANCE_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_ATTENDANCE_FULFILLED':
            return { ...state, serchState: 2, attendances: action.payload.data }

        case 'SEARCH_ATTENDANCE_REJECTED':
            return { ...state, serchState: 3 }

        default:
            return state
    }
}

export default reducer
