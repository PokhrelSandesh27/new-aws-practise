const initialState = {
    student: {},
    students: [],

    addState: 0,
    fetchState: 0,

    searchSingleState: 0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STUDENT_PENDING':
            return { ...state, addState: 1 }
        case 'ADD_STUDENT_FULFILLED':
            return { ...state, addState: 2, student: action.payload.data }
        case 'ADD_STUDENT_REJECTED':
            return { ...state, addState: 3 }

        case 'ASSIGN_STUDENT_TO_CLASSROOM_PENDING':
            return { ...state, addState: 1 }
        case 'ASSIGN_STUDENT_TO_CLASSROOM_FULFILLED':
            return { ...state, addState: 2, student: action.payload.data }
        case 'ASSIGN_STUDENT_TO_CLASSROOM_REJECTED':
            return { ...state, addState: 3 }

        case 'SEARCH_STUDENT_PENDING':
            return { ...state, fetchState: 1 }
        case 'SEARCH_STUDENT_FULFILLED':
            return { ...state, fetchState: 2, students: action.payload.data }
        case 'SEARCH_STUDENT_REJECTED':
            return { ...state, fetchState: 3 }

        case 'CLEAR_SEARCH_STUDENTS':
            return { ...state, fetchState: 0, students: [] }

        case 'SEARCH_STUDENT_BY_ID_PENDING':
            return { ...state, searchSingleState: 1 }
        case 'SEARCH_STUDENT_BY_ID_FULFILLED':
            return { ...state, searchSingleState: 2, student: action.payload.data[0] || {} }
        case 'SEARCH_STUDENT_BY_ID_REJECTED':
            return { ...state, searchSingleState: 3 }

        case 'GET_STUDENT_BY_ID_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_STUDENT_BY_ID_FULFILLED':
            return { ...state, fetchState: 2, student: action.payload.data }
        case 'GET_STUDENT_BY_ID_REJECTED':
            return { ...state, fetchState: 3 }

        default:
            return state
    }
}

export default reducer
