import {request} from '../request'

export const addCreate = createReq => {
    return request.post('attendances/create', createReq)
}

export const getAllAttendance = () => {
    return request.get("attendances/read");
}

export const searchAttendance = reqParam => {
    return request.post('attendances/search', reqParam)
}

//
// export const searchAttendance = req => {
//     return request.post("attendances/search", req);
// };
