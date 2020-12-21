const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,

    examReport: {},
    examReports: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_EXAM_REPORT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_EXAM_REPORT_FULFILLED':
            return { ...state, createState: 2, examReport: action.payload.data }
        case 'CREATE_EXAM_REPORT_REJECTED':
            return { ...state, createState: 3, }

        case 'SEARCH_EXAM_REPORT_PENDING':
            return { ...state, fetchState: 1 }
        case 'SEARCH_EXAM_REPORT_FULFILLED':
            return { ...state, fetchState: 2, examReports: action.payload.data }
        case 'SEARCH_EXAM_REPORT_REJECTED':
            return { ...state, fetchState: 3 }

        case 'GET_EXAM_REPORT_PENDING':
            return { ...state, readState: 1 }
        case 'GET_EXAM_REPORT_FULFILLED':
            return { ...state, readState: 2, examReport: action.payload.data }
        case 'GET_EXAM_REPORT_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_EXAM_REPORTS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_EXAM_REPORTS_FULFILLED':
            return { ...state, readAllState: 2, examReports: action.payload.data }
        case 'GET_EXAM_REPORTS_REJECTED':
            return { ...state, readAllState: 3, }

        default:
            return state
    }
}

export default reducer
