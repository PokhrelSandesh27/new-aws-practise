import { request } from '../../request'

export const createRelease = req => {
    return request.post('examreportreleases/create', req)
}

export const getRelease = () => {
    return request.get('examreportreleases/read')
}

export const getReleased = id => {
    return request.get(`examreportreleases/read/${id}`)
}

export const searchReleaseReport = req => {
    return request.post('examreportreleases/search', req)
}
