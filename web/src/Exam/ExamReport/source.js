import { request } from '../../request'

export const createExamReport = req => {
    return request.post('examreports/create', req)
}

export const getExamReports = () => {
    return request.get('examreports/read')
}

export const getExamReport = id => {
    return request.get(`examreports/read/${id}`)
}

export const searchExamReport = reqParam => {
    return request.post('examreports/search', reqParam)
}

export const createReportReleased=req=>{
    return request.post('examreportreleases/create', req)
}
