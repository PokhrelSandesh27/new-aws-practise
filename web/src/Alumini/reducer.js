const initialState = {
    alumini: {},
    aluminis: [],

    addState: 0,
    fetchState: 0,

    updateState: 0,
    deleteState: 0,
    error: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {





        case 'GET_ALL_ALUMINI_FULFILLED':
            return { ...state, fetchState: 2, aluminis: action.payload.data }
        case 'GET_ALL_ALUMINI_REJECTED':
            return { ...state, fetchState: 3 }
        case 'GET_ALL_ALUMINI_PENDING':
            return { ...state, fetchState: 1 }

        default:
            return state
    }
}

export default reducer
