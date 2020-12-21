const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

    examReportRelease: {},
    examReportReleases: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_RELEASE_REPORT_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_RELEASE_REPORT_FULFILLED':
            return { ...state, createState: 2, examReportRelease: action.payload.data }
        case 'CREATE_RELEASE_REPORT_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_RELEASE_PENDING':
            return { ...state, readState: 1 }
        case 'GET_RELEASE_FULFILLED':
            return { ...state, readState: 2, examReportRelease: action.payload.data }
        case 'GET_RELEASE_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_RELEASE_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_RELEASE_FULFILLED':
            return { ...state, readAllState: 2, examReportReleases: action.payload.data }
        case 'GET_RELEASE_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_RELEASE_REPORT_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_RELEASE_REPORT_FULFILLED':
            return { ...state, searchState: 2, examReportReleases: action.payload.data }
        case 'SEARCH_RELEASE_REPORT_REJECTED':
            return { ...state, searchState: 3, }

        default:
            return state
    }
}

export default reducer
