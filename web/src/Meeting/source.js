import {request} from '../request'

export const addMeeting = createReq => {
    return request.post('meetings/create', createReq)
}

export const getMeetingById = (id) => {
    return request.get('meetings/read/' + id)
}

export const updateMeeting = auth => {
    return request.put('meetings/5edef69442078c4a3cd12511/update', auth)
}

export const deleteMeeting = auth => {
    return request.delete('meetings/5edef69442078c4a3cd12511/delete', auth)
}

export const getAllMeeting = auth => {
    return request.get('meetings/read', auth)
}

export const searchMeeting = reqParam => {
    return request.post('meetings/search', reqParam)
}

