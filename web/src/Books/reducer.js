const initialState = {
  todo: {},
  fetchState: 0,
  error: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODO_PENDING":
      return { ...state, fetchState: 1 };
    case "GET_TODO_FULFILLED":
      const todo = action.payload.data;
      // localStorage.setItem("user", JSON.stringify(user));
      return { ...state, fetchState: 2, todo: todo };
    case "GET_TODO_REJECTED":
      return {
        ...state,
        fetchState: 3,
      };

    default:
      return state;
  }
};

export default reducer;
