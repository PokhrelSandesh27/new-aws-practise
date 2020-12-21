import * as source from './source'

export function uploadQuestion (createReq, urlParam) {
    return function (dispatch) {
        dispatch({
            type: 'UPLOAD_QUESTION',
            payload: source.uploadQuestion(createReq, urlParam),
        })
    }
}

export function getAllQuestions () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_QUESTIONS',
            payload: source.getAllQuestions(),
        })
    }
}

export function createQuestionSet (req) {
    return function (dispatch) {
        dispatch({
            type: 'CREATE_QUESTION_SET',
            payload: source.createQuestionSet(req),
        })
    }
}

export function getAllExams () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_EXAMS',
            payload: source.getAllExams(),
        })
    }
}


export function getAllMCQ () {
    return function (dispactch) {
        dispactch({
            type: 'GET_ALL_MCQ',
            payload: source.getAllMCQ()
        })
    }
}

export function searchAnExam (searchReq) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_AN_EXAM',
            payload: source.searchAnExam(searchReq),
        })
    }
}

export function searchMCQsID (id) {

    return function (dispatch) {
        dispatch({
            type: 'SEARCH_MCQ_ID',
            payload: source.searchMCQsID(id),

        })
    }
}

export function searchExamDetail (searchReq) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_EXAM_DETAILS',
            payload: source.searchExamDetail(searchReq),
        })
    }
}

export function searchMCQs (reqParam = {}) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_MCQ',
            payload: source.searchMCQs(reqParam)
        })
    }
}
