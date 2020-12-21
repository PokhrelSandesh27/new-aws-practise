import {request} from '../request'

export const uploadQuestion = (uploadReq, urlParam) => {
    return request.put(`examdetails/${urlParam}/addquestion`, uploadReq)
}
export const getAllQuestions = () => {
    return request.get('questionsets/read')
}

export const getAllExams = () => {
    return request.get('exams/read')
}

export const searchAnExam = reqParam => {
    return request.post('exams/search', reqParam)
}
export const searchExamDetail = reqParam => {
    return request.post('examdetails/search', reqParam)
}

export const getAllMCQ = () => {
    return request.get("questionsets/read");
}

export const searchMCQs = reqParam => {
    return request.post('questionsets/search', reqParam)
}

export const createQuestionSet = reqParam => {
    return request.post('questionsets/create', reqParam)
}
export const searchMCQsID = (id) => {
    return request.get(`questionsets/read/${id}`);
};
