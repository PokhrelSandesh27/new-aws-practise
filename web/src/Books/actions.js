import { getTodo } from "./source";

export function getTodoAction() {
  return function (dispatch) {
    dispatch({
      type: "GET_TODO",
      payload: getTodo(),
    });
  };
}
