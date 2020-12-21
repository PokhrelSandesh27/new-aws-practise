import * as source from './source'

export function createExamReport (req) {
    return {
        type: 'CREATE_EXAM_REPORT',
        payload: source.createExamReport(req),
    }
}

export function getExamReports () {
    return function (dispatch) {
        dispatch({
            type: 'GET_EXAM_REPORTS',
            payload: source.getExamReports(),
        })
    }
}

export function getExamReport (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_EXAM_REPORT',
            payload: source.getExamReport(id),
        })
    }
}


export function searchExamReports (reqParam = {}) {
    return function (dispactch) {
        dispactch({
            type: 'SEARCH_EXAM_REPORT',
            payload: source.searchExamReport(reqParam),
        })
    }
}

export function createReportReleased (req) {
    return {
        type: 'CREATE_EXAM_REPORT_RELEASED',
        payload: source.createReportReleased(req),
    }
}
