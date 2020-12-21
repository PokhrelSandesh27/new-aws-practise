import React, { Component } from "react";
import { getTodoAction } from "../actions";
import { connect } from "react-redux";

class Books extends Component {
  clickMeFunc() {
    console.log("Button clicked");
    this.props.dispatch(getTodoAction()); // calling api endpoint
  }

  render() {
    console.log("this.props", this.props);
    const bookReducer = this.props.bookReducer; // reading from reducer (this where i get the response)

    return (
      <div>
        Hello Books
        <button onClick={this.clickMeFunc.bind(this)}>Click me</button>
        {bookReducer.fetchState === 1 && <div>Loading ...</div>}
        {bookReducer.fetchState === 2 && (
          <div>Okay data came {bookReducer.todo.id}</div>
        )}
      </div>
    );
  }
}

export default connect((state) => ({
  bookReducer: state.bookReducer,
}))(Books);

// component -> action <-> source
// component <- reducer

// 1. create new student Module and a component
// 2. map this compoent to /users/student
// 3. call this endpoint http://dummy.restapiexample.com/api/v1/employees and get results
// while you are fetching show loading and once done show fetch result

// challenge: go to this url http://dummy.restapiexample.com/ and get a post call
// add another component to student module (/user/employee)
// do all the above for a post call
