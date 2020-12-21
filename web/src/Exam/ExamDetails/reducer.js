const initialState = {
    createState: 0,
    readState: 0,
    readAllState: 0,

    examDetail: {},
    examDetails: [],

    serchState: 0,
    readStateAttend:[],
    hasAttends:[]


}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_EXAM_DETAIL_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_EXAM_DETAIL_FULFILLED':
            return { ...state, createState: 2, examDetail: action.payload.data }
        case 'CREATE_EXAM_DETAIL_REJECTED':
            return { ...state, createState: 3, }

        case 'GET_EXAM_DETAIL_PENDING':
            return { ...state, readState: 1 }
        case 'GET_EXAM_DETAIL_FULFILLED':
            return { ...state, readState: 2, examDetail: action.payload.data }
        case 'GET_EXAM_DETAIL_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_EXAM_DETAILS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_EXAM_DETAILS_FULFILLED':
            return { ...state, readAllState: 2, examDetails: action.payload.data }
        case 'GET_EXAM_DETAILS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_EXAM_DETAILS_PENDING':
            return { ...state, serchState: 1 }
        case 'SEARCH_EXAM_DETAILS_FULFILLED':
            return { ...state, serchState: 2, examDetails: action.payload.data }

        case 'SEARCH_EXAM_DETAILS_REJECTED':
            return { ...state, serchState: 3 }


        case 'HAS_ATTEND_EXAM_PENDING':
            const SNs1 = action.meta
            const readStateAttends1 = {...state.readStateAttend}
            readStateAttends1[SNs1] = 1

            return { ...state, readStateAttend: readStateAttends1 }
        case 'HAS_ATTEND_EXAM_FULFILLED','HAS_ATTEND_EXAM_REJECTED':

            const SN = action.meta //getting values from meta
            console.log("serial number",SN);
            const hasAttends = {...state.hasAttends}
            const readStateAttend = {...state.readStateAttend}
            hasAttends[SN] = action.payload.data
            readStateAttend[SN] = 2

            return { ...state, readStateAttend, hasAttends }

        case 'HAS_ATTEND_EXAM_REJECTED':
            return { ...state, readStateAttend:3}



        //
        //
        // case 'HAS_ATTEND_EXAM_PENDING':
        //     return { ...state, readStateAttend: 1 }
        // case 'HAS_ATTEND_EXAM_FULFILLED':
        //     return { ...state, readStateAttend: 2, hasAttends: action.payload.data }
        //
        // case 'HAS_ATTEND_EXAM_REJECTED':
        //     return { ...state, readStateAttend: 3 }

        default:
            return state
    }
}

export default reducer
