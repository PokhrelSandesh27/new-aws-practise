import React, { Component } from 'react'
// import { getExams } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { getClassroomById } from '../../Home/actions'
import { getPayments, searchPayments } from '../actions'

class ListAllPaymentsForStudent extends Component {

    state = {
        type: null,
    }

    componentDidMount () {
        const student = getUser()

        const { classroom } = student
        this.props.dispatch(getClassroomById(classroom))
        this.props.dispatch(searchPayments({ classroom }))
    }

    render () {
        const { classroom } = this.props.classroomReducer
        const { payments, searchState } = this.props.paymentReducer

        return (

            <div className="page-content">

                <h2>List of payments for {classroom && ` Classroom : ${classroom.grade} ${classroom.section}`}</h2>
                <button onClick={this.props.history.goBack}
                        style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                >⬅ Go back
                </button>
                <div className="row">
                    {/*<NavLink*/}
                    {/*    to={'/receipts/student/list'}>*/}
                    {/*            {*/}
                    {/*                <button style={{ marginLeft: '3%', backgroundColor: 'dimgrey' }}>*/}
                    {/*                    View Receipts*/}
                    {/*                </button>*/}
                    {/*            }*/}
                    {/*        </NavLink>*/}
                    <table className="assingmentTable" id="dev-table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            payments &&
                            payments.map((payment, i) => {

                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{payment.category}</td>
                                        <td>{payment.amount}</td>
                                        <td>
                                            <NavLink className = "navlink"
                                                     to={{
                                                         pathname: `/receipts/student/list/${payment._id}`,
                                                     }}>
                                                <b>View Receipts</b>
                                            </NavLink>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>





                </div>
            </div>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    paymentReducer: state.paymentReducer,
}))(ListAllPaymentsForStudent)
