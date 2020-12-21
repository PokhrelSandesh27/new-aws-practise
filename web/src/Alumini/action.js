import * as source from './source'




export function getAllAlumini () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_ALUMINI',
            payload: source.getAllAlumini(),
        })
    }
}
//
// export function searchClassroom (reqParam = {}) {
//     return function (dispatch) {
//         dispatch({
//             type: 'SEARCH_Classroom',
//             payload: source.searchClassroom(reqParam)
//         })
//     }
// }
