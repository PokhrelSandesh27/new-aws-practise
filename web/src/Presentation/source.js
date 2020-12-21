import {request} from '../request'

export const createPresentation = requestParam => {
    return request.post('presentations/create', requestParam)
}

export const uploadPresentation = (presentation,req) => {
    const contentType = `multipart/form-data; boundary=${req.get('file').size}`;
    return request.put(`presentations/${presentation}/upload`, req, { 'Content-Type': contentType });
};

export const getAllPresentation = reqParam => {
    return request.get('presentations/read', reqParam)
}

export const getPresentationDetails = reqParam => {
    return request.get('presentations/read/5f38bd7a6027e14d72d1e5fd', reqParam)
}

export const searchPresentation = reqParam => {
    return request.post('presentations/search', reqParam)
}
