import {request} from '../request'

export const addClassroom = createReq => {
    return request.post('classrooms/create', createReq)
}

export const getClassroomById  = (id) => {
    return request.get('classrooms/read/'+id)
}

export const updateClassroom = auth => {
    return request.put('classrooms/5edeee65807c6725682d190d/update', auth)
}

export const deleteClassroom = auth => {
    return request.delete('classrooms/5edeee65807c6725682d190d/delete', auth)
}

export const getAllClassroom = () => {
    return request.get('classrooms/read')
}
//
// export const searchClassroom = reqParam => {
//     return request.post('/search', reqParam)
// }
