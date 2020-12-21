import React, { Component } from "react";
import { getEmployeeDetailsAction } from "../actions";
import { connect } from "react-redux";

class Students extends Component {
  clickFunction() {
    console.log("Button clicked for employee details");
    this.props.dispatch(getEmployeeDetailsAction());
  }

  render() {
    console.log("this.props", this.propls);
    const studentReducer = this.props.studentReducer;

    return (
      <div>
        Student Route-getting employee details
        <button onClick={this.clickFunction.bind(this)}>Click</button>
        {studentReducer.fetchState === 1 && <div> Details loading...</div>}
        {studentReducer.fetchState === 2 && (
          <div> Data recieved {studentReducer.employeeDetails.id}</div>
        )}
      </div>
    );
  }
}

export default connect((state) => ({
  studentReducer: state.studentReducer,
}))(Students);
