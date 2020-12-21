const initialState = {
    questionSet: {},
    questionSets: [],

    examDetail: {},
    examDetails: [],

    addState: 0,
    fetchState: 0,

    updateState: 0,
    deleteState: 0,
    mcq: {},
    mcqs: [], // -> {}
    searchState:0,
    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_QUESTION_FULFILLED':
            return { ...state, addState: 2, questionSet: action.payload.data }
        case 'UPLOAD_QUESTION_REJECTED':
            return { ...state, addState: 3 }
        case 'UPLOAD_QUESTION_PENDING':
            return { ...state, addState: 1 }

        case 'CREATE_QUESTION_SET_FULFILLED':
            return { ...state, addState: 2, questionSet: action.payload.data }
        case 'CREATE_QUESTION_SET_REJECTED':
            return { ...state, addState: 3 }
        case 'CREATE_QUESTION_SET_PENDING':
            return { ...state, addState: 1 }

        case 'GET_ALL_QUESTIONS_FULFILLED':
            return { ...state, fetchState: 2, questionSets: action.payload.data }
        case 'GET_ALL_QUESTIONS_REJECTED':
            return { ...state, fetchState: 3 }
        case 'GET_ALL_QUESTIONS_PENDING':
            return { ...state, fetchState: 1 }

        case 'GET_ALL_EXAMS_FULFILLED':
            return { ...state, fetchState: 2, questionSets: action.payload.data }
        case 'GET_ALL_EXAMS_REJECTED':
            return { ...state, fetchState: 3 }
        case 'GET_ALL_EXAMS_PENDING':
            return { ...state, fetchState: 1 }

        case 'SEARCH_AN_EXAM_FULFILLED':
            return { ...state, fetchState: 2, questionSets: action.payload.data }
        case 'SEARCH_AN_EXAM_REJECTED':
            return { ...state, fetchState: 3 }
        case 'SEARCH_AN_EXAM_PENDING':
            return { ...state, fetchState: 1 }


        case 'SEARCH_EXAM_DETAILS_FULFILLED':
            return { ...state, fetchState: 2, examDetails: action.payload.data }
        case 'SEARCH_EXAM_DETAILS_REJECTED':
            return { ...state, fetchState: 3 }
        case 'SEARCH_EXAM_DETAILS_PENDING':
            return { ...state, fetchState: 1 }


        // case 'GET_ATTENDANCE_BY_ID_PENDING':
        //     return { ...state, fetchState: 1 }
        // case 'GET_ATTENDANCE_BY_ID_FULFILLED':
        //     return { ...state, fetchState: 2, attendance: action.payload.data }
        // case 'GET_TIMETABLE_BY_ID_REJECTED':
        //     return { ...state, fetchState: 3 }

        case 'GET_ALL_MCQ_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_MCQ_FULFILLED':
            return { ...state, fetchState: 2, mcqs: action.payload.data }
        case 'GET_ALL_MCQ_REJECTED':
            return { ...state, fetchState: 3 }





        case 'SEARCH_MCQ_ID_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_MCQ_ID_FULFILLED':

            // const SN = action.meta //getting values from meta
            // console.log("serial number",SN);
            // const attendances = {...state.attendances}
            // attendances[SN] = action.payload.data

            return { ...state, serchState: 2, mcq:action.payload.data }

        case 'SEARCH_MCQ_ID_REJECTED':
            return { ...state, serchState: 3 }






        case 'SEARCH_MCQ_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_MCQ_FULFILLED':
            return { ...state, serchState: 2, mcqs: action.payload.data }

        case 'SEARCH_MCQ_REJECTED':
            return { ...state, serchState: 3 }

        default:
            return state
    }
}

export default reducer
