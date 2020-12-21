import * as source from './source'

export function addSlot(createReq) {
    return function (dispatch) {
        dispatch({
            type: 'ADD_SLOT',
            payload: source.addSlot(createReq),
        })

    }
}

export function getSlotById (id) {
    return function (dispactch) {
        dispactch({
            type: 'GET_SLOT_BY_ID',
            payload: source.getSlotById(),
        })
    }
}

export function getAllSlot () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_SLOT',
            payload: source.getAllSlot(),
        })
    }
}


export function searchSlot (reqParam = {}) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_SLOT',
            payload: source.searchSlot(reqParam)
        })
    }
}
