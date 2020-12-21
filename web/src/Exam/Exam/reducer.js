const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,

    exam: {},
    exams: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_EXAM_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_EXAM_FULFILLED':
            return { ...state, createState: 2, exam: action.payload.data }
        case 'CREATE_EXAM_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_EXAM_PENDING':
            return { ...state, readState: 1 }
        case 'GET_EXAM_FULFILLED':
            return { ...state, readState: 2, exam: action.payload.data }
        case 'GET_EXAM_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_EXAMS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_EXAMS_FULFILLED':
            return { ...state, readAllState: 2, exams: action.payload.data }
        case 'GET_EXAMS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_EXAM_DETAILS_PENDING':
            return { ...state, readAllState: 1 }
        case 'SEARCH_EXAM_DETAILS_FULFILLED':
            return { ...state, readAllState: 2, exams: action.payload.data }
        case 'SEARCH_EXAM_DETAILS_REJECTED':
            return { ...state, readAllState: 3, }

        default:
            return state
    }
}

export default reducer
