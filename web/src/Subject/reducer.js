const initialState = {
    subject: {},
    subjects: [],
    fetchState: 0,


    createState: 0,

    error: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_SUBJECTS_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_SUBJECTS_FULFILLED':
            return { ...state, fetchState: 2, subjects: action.payload.data }
        case 'GET_ALL_SUBJECTS_REJECTED':
            return { ...state, fetchState: 3 }

        case 'CREATE_SUBJECT_PENDING':
            return { ...state, addState: 1 }
        case 'CREATE_SUBJECT_FULFILLED':
            return { ...state, createState: 2,  subject: action.payload.data  }
        case 'CREATE_SUBJECT_REJECTED':
            return { ...state, addState: 3 }

        case 'GET_SUBJECT_PENDING':
            return { ...state, getState: 1 }
        case 'GET_SUBJECT_FULFILLED':
            return { ...state, getState: 2,  subject: action.payload.data  }
        case 'GET_SUBJECT_REJECTED':
            return { ...state, getState: 3 }

        default:
            return state
    }
}

export default reducer
