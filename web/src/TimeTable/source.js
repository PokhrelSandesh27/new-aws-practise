import {request} from '../request'

export const addTimeTable = createReq => {
    return request.post('timetables/create', createReq)
}

export const getTimeTableById = (id) => {
    return request.get('timetables/read/' + id)
}

export const getAllTimeTable = auth => {
    return request.get('timetables/read', auth)
}

export const searchTimeTable = reqParam => {
    return request.post('timetables/search', reqParam)
}


