const initialState = {
    slot: {},
    slots: [],

    addState: 0,
    fetchState: 0,
    serchState:0,

    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SLOT_PENDING':
            return { ...state, addState: 1 }
        case 'ADD_SLOT_FULFILLED':
            return { ...state, addState: 2, slot: action.payload.data }
        case 'ADD_SLOT_REJECTED':
            return { ...state, addState: 3 }

        case 'GET_SLOT_BY_ID_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_SLOT_BY_ID_FULFILLED':
            return { ...state, fetchState: 2, slot: action.payload.data }
        case 'GET_SLOT_BY_ID_REJECTED':
            return { ...state, fetchState: 3 }

        case 'GET_ALL_SLOT_PENDING':
            return { ...state, fetchState: 1 }
        case 'GET_ALL_SLOT_FULFILLED':
            return { ...state, fetchState: 2, slots: action.payload.data }
        case 'GET_ALL_SLOT_REJECTED':
            return { ...state, fetchState: 3 }

        case 'SEARCH_SLOT':
            return { ...state, fetchState: 1 }
        case 'SEARCH_SLOT':
            return { ...state, fetchState: 2, slot: action.payload.data }
        case 'SEARCH_SLOT':
            return { ...state, fetchState: 3 }
        default:
            return state

    }
}

export default reducer
