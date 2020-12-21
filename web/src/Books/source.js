import {request} from "../request";

export const getTodo = () => {
  return request.get("https://jsonplaceholder.typicode.com/todos/1");
};
