import {request} from '../request'


export const getAllAlumini = () => {
    return request.get('alumni/read')
}
//
// export const searchClassroom = reqParam => {
//     return request.post('/search', reqParam)
// }
