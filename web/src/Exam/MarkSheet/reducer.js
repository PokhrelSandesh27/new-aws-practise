const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

    markSheet: {},
    markSheets: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_MARK_SHEET_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_MARK_SHEET_FULFILLED':
            return { ...state, createState: 2, markSheet: action.payload.data }
        case 'CREATE_MARK_SHEET_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_MARK_SHEET_PENDING':
            return { ...state, readState: 1 }
        case 'GET_MARK_SHEET_FULFILLED':
            return { ...state, readState: 2, markSheet: action.payload.data }
        case 'GET_MARK_SHEET_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_MARK_SHEETS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_MARK_SHEETS_FULFILLED':
            return { ...state, readAllState: 2, markSheets: action.payload.data }
        case 'GET_MARK_SHEETS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_MARK_SHEETS_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_MARK_SHEETS_FULFILLED':
            return { ...state, searchState: 2, markSheets: action.payload.data }
        case 'SEARCH_MARK_SHEETS_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
