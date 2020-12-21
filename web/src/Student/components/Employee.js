import React, { Component } from "react";
import { connect } from "react-redux";
import { addEmployeeDetailsAction } from "../actions";

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeName: "",
      age: "",
      salary: "",
    };
  }

  changeHandler = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
    // this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.addEmployeeDetailsAction(this.state);
    // this.props.dispatch(addEmployeeDetailsAction(this.state));
    console.log(this.state);
  };

  render() {
    const { employeeName, age, salary } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              name="employeeName"
              value={employeeName}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="age"
              value={age}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              name="salary"
              value={salary}
              onChange={this.changeHandler}
            />
          </div>
          <button type="submit">Create New EmpData</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addEmployeeDetailsAction })(Employee);
