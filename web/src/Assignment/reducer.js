const initialState = {
    fetchState: 0,
    uploadState: 0,
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

    assignment: {},
    assignments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ASSIGNMENT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_ASSIGNMENT_FULFILLED':
            return { ...state, createState: 2, assignment: action.payload.data }
        case 'CREATE_ASSIGNMENT_REJECTED':
            return { ...state, createState: 3, }

        case 'UPLOAD_ASSIGNMENT_PENDING':
            return { ...state, uploadState: 1 }
        case 'UPLOAD_ASSIGNMENT_FULFILLED':
            return { ...state, uploadState: 2, assignment: action.payload.data }
        case 'UPLOAD_ASSIGNMENT_REJECTED':
            return { ...state, uploadState: 3, }

        case 'GET_ASSIGNMENT_PENDING':
            return { ...state, readState: 1 }
        case 'GET_ASSIGNMENT_FULFILLED':
            return { ...state, readState: 2, assignment: action.payload.data }
        case 'GET_ASSIGNMENT_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_ASSIGNMENTS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_ASSIGNMENTS_FULFILLED':
            return { ...state, readAllState: 2, assignments: action.payload.data }
        case 'GET_ASSIGNMENTS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_ASSIGNMENT_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_ASSIGNMENT_FULFILLED':
            return { ...state, searchState: 2, assignments: action.payload.data }
        case 'SEARCH_ASSIGNMENT_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
