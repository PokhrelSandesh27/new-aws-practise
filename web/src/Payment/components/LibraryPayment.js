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

import logo from '../../img/logo.svg'

class LibraryPayment extends Component {

    state = {
        type: null,
        classroom: this.props.match.params.classroom
    }

    componentDidMount () {
        const { classroom } = this.state
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(searchPayments({ classroom }))
    }
print(){
        window.print();
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
                                        <div id="invoiceholder">
                                            <div id="invoice" className="effect2">

                                                <div id="invoice-top">
                                                    <div className="logo"><img
                                                        src={logo}
                                                        alt="Logo"></img></div>
                                                    <div className="title">
                                                        <h1>Invoice #<span
                                                            className="invoiceVal invoice_num">tst-inv-23</span></h1>
                                                        <p>Invoice Date: <span id="invoice_date">18 Sept 2020</span><br/>
                                                            GL Date: <span id="gl_date">20 Sept 2020</span>
                                                        </p>
                                                    </div>

                                                </div>



                                                <div id="invoice-mid">
                                                    <div id="message">
                                                        <h2>Hello Bishal Shrestha,</h2>
                                                        <p>An invoice with invoice number #<span
                                                            id="invoice_num">tst-inv-23</span> is created for <span
                                                            id="supplier_name">EverestWalk Pvt.Ltd</span> which is 100% matched
                                                            with PO and is waiting for your approval. </p>
                                                    </div>
                                                    <div className="cta-group mobile-btn-group">
                                                        <a href="javascript:void(0);"
                                                           className="btn-primary">Print</a>

                                                    </div>
                                                    <div className="clearfix">
                                                        <div className="col-left">
                                                            <div className="clientlogo"><img
                                                                src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png"
                                                                alt="Sup"/></div>
                                                            <div className="clientinfo">
                                                                <h2 id="supplier">EverestWalk Pvt.Ltd</h2>
                                                                <p><span id="address">Koteshower, 64</span><br></br><span
                                                                    id="city">KATHAMNDU, NEPAL</span><br></br><span
                                                                    id="country">IT</span> - <span id="zip">44066</span><br></br><span
                                                                    id="tax_num">555-555-5555</span><br></br></p>
                                                            </div>
                                                        </div>
                                                        <div className="col-right">
                                                            <table className="table">
                                                                <tbody>

                                                                <tr>
                                                                    <td colSpan="2"><span>Note</span>#<label
                                                                        id="note">None</label></td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div id="invoice-bot">

                                                    <div id="table">
                                                        <table className="table-main">
                                                            <thead>
                                                            <tr className="tabletitle">
                                                                <th>S.N.</th>
                                                                <th>Check</th>
                                                                <th>Category</th>
                                                                <th>Months</th>
                                                                <th>Amount</th>
                                                                <th>Bonus</th>
                                                                <th>Total</th>
                                                            </tr>
                                                            </thead>
                                                            <tr className="list-item">
                                                                <td data-label="S.N" className="tableitem">1</td>
                                                                <td data-label="Check"
                                                                    className="tableitem"><Button className="" variant="contained" color="primary">
                                                                    check

                                                                </Button>
                                                                </td>
                                                                <td data-label="Category" className="tableitem">Monthly
                                                                </td>
                                                                <td data-label="Monthly" className="tableitem">Sept 2020</td>
                                                                <td data-label=" Amount"
                                                                    className="tableitem">40,000
                                                                </td>
                                                                <td data-label="Bonus" className="tableitem">5000
                                                                </td>

                                                                <td data-label="Total" className="tableitem">45,000</td>
                                                            </tr>

                                                            <tr className="list-item total-row">
                                                                <th colSpan="9" className="tableitem">Grand Total</th>
                                                                <td data-label="Grand Total"
                                                                    className="tableitem">45,000
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>

                                                    <div className="cta-group">
                                                        <a href="javascript:void(0);"
                                                           className="btn-primary" onClick={this.print}>Print</a>

                                                    </div>

                                                </div>

                                                <footer>
                                                    <div id="legalcopy" className="clearfix">
                                                        <p className="col-right">Our mailing address is:
                                                            <span className="email"><a
                                                                href="everestwalk123@gmail.com">everestwalk123@gmail.com</a></span>
                                                        </p>
                                                    </div>
                                                </footer>
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
}))(withStyles(useStyles)(LibraryPayment))
