import { request } from '../request'

export const getAllUsers = () => {
    return request.post('users/search', {})
}


export const uploadBook = (userId, formBody) => {
    return request.putFormData(`users/${userId}/upload`, formBody)
}

export const createUser = req => {
    return request.post("users/create", req);
};


export const getUserById = id => {
    return request.get(`users/read/${id}`);
};

export const searchUser = req => {
    return request.post("users/search", req);
};

