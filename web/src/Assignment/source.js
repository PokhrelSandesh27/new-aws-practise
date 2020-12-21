import {request} from "../request";

export const createAssignment = req => {
  return request.post("assignments/create", req);
};

export const uploadAssignment = (assignment,req) => {
    // To upload file
    const contentType = `multipart/form-data; boundary=${req.get('file').size}`;
  return request.put(`assignments/${assignment}/upload`, req, { 'Content-Type': contentType });
};

export const getAssignments = () => {
  return request.get("assignments/read");
};

export const getAssignment = id => {
  return request.get(`assignments/read/${id}`);
};

export const searchAssignment = req => {
  return request.post("assignments/search", req);
};
