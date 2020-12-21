import React, { Component } from 'react'
// import { getExams } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { getClassroomById } from '../../Home/actions'
import { getPayments, searchPayments } from '../actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'

class ListAllPayments extends Component {

    state = {
        type: null,
        classroom: this.props.match.params.classroom
    }

    componentDidMount () {
        const { classroom } = this.state
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(searchPayments({ classroom }))
    }

    render () {
        const { classroom } = this.props.classroomReducer
        const { payments, searchState } = this.props.paymentReducer
        const {classes} = this.props

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <div className="py-5 text-center">
                    <h2>List of payments for {classroom && ` Classroom : Grade ${classroom.grade} Section ${classroom.section}`}</h2>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <Button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</Button>

                            <TableContainer component={Paper}>
                            <div className="invoice">

                                <div className="invoice-sec-1">
                                    <div className="invoice-sec-1-ref">

                                        <div className="to-invoice">

                                        </div>
                                    </div>

                                </div>
                                <div className="invoice-banner">
                                    <div className="banner-d">
                                        <p>Invoice</p>
                                    </div>
                                </div>
                                <div className="invoice-table">
                                    <div className="invoice-table-container">
                                        <div className="invoice-table-data">
                                            <div className="invoice-table-sl invoice-table-sl-h">
                                                <strong><p>Sl. No</p></strong>
                                            </div>
                                            <div className="invoice-table-desc invoice-table-desc-h">
                                                <strong><p>Category</p></strong>
                                            </div>
                                            <div className="invoice-table-amount invoice-table-amount-h">
                                                <strong><p>Amount</p></strong>
                                            </div>
                                        </div>
                                        {
                                            payments &&
                                            payments
                                                .map((payment, i) => {
                                                    return (
                                                        <div className="invoice-table-data">
                                                            <div className="invoice-table-sl">
                                                                <p>{i + 1}</p>
                                                            </div>
                                                            <div className="invoice-table-desc">
                                                                <p>{payment.category}</p>
                                                            </div>
                                                            <div className="invoice-table-amount">
                                                                <p>{payment.amount}</p>
                                                            </div>

                                                        </div>

                                                    )
                                                })
                                        }

                                    </div>
                                </div>

                            </div>
                            </TableContainer>

                        </div>
                    </div>
                </div>
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    paymentReducer: state.paymentReducer,
}))(withStyles(useStyles)(ListAllPayments))
