import {request} from "../request";

export const createAssignmentSubmission = req => {
  return request.post("assignmentsubmissions/create", req);
};

export const uploadAssignmentSubmission = (assignment,req) => {
    // To upload file
    const contentType = `multipart/form-data; boundary=${req.get('file').size}`;
  return request.put(`assignmentsubmissions/${assignment}/upload`, req, { 'Content-Type': contentType });
};

export const getAssignmentsSubmission = () => {
  return request.get("assignmentsubmissions/read");
};

export const getAssignmentSubmission = id => {
  return request.get(`assignmentsubmissions/read/${id}`);
};

export const searchAssignmentSubmission = req => {
  return request.post("assignmentsubmissions/search", req);
};
