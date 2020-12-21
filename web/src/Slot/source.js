import {request} from '../request'

export const addSlot = createReq => {
    return request.post('slots/create', createReq)
}

export const getSlotById = (id) => {
    return request.get('slots/read/' + id)
}


export const getAllSlot = auth => {
    return request.get('slots/read')
}


export const searchSlot = reqParam => {
    return request.post('slots/read/', reqParam)
}

