import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getUser } from '../../utils'
import 'react-toastify/dist/ReactToastify.css'
import { searchPayments } from '../../Payment2/actions'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import YearMonthPicker from 'react-year-month-picker'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '../../TablePagination'
import moment from 'moment'
import { groupBy } from 'lodash'

class ViewPaymentForStudents extends Component {

    state = {
        localStore: {
            startDate: moment.utc().startOf('month').valueOf(),
            endDate: moment.utc().endOf('month').valueOf(),
            user: getUser()._id
        }
    }

    componentDidMount () {
        this.props.dispatch(searchPayments(this.state.localStore))
    }

    startDateChanged (date) {
        const localStore = { ...this.state.localStore, startDate: date.startOf('month').valueOf() }
        this.setState({ localStore })
    }

    endDateChanged (date) {
        const localStore = { ...this.state.localStore, endDate: date.endOf('month').valueOf() }
        this.setState({ localStore })
    }

    fetchUnpaidPayment () {
        const req = {...this.state.localStore, isPaid:"false"}
        this.props.dispatch(searchPayments(req))
    }

    fetchPaidPayment () {
        const req = {...this.state.localStore, isPaid:"True"}
        this.props.dispatch(searchPayments(req))
    }
    renderSwitch(param) {
        switch(param) {
            case 0:
                return 'jan';
            case 1:
                return 'feb';
            case 2:
                return 'mar';
            case 3:
                return 'apr';
            case 4:
                return 'may';
            case 5:
                return 'june';
            case 6:
                return 'july';
            case 7:
                return 'aug';
            case 8:
                return 'sept';
            case 9:
                return 'oct';
            case 10:
                return 'nov';
            case 11:
                return 'dec';
            default:
                return '';
        }
    }

    render () {

        const date = new Date()

        const { payments } = this.props.paymentReducer
        const { receipts } = this.props.receiptReducer
        const { classes } = this.props

        const paymentsByMonth = groupBy(payments, 'month')

        console.log("paymentsByMonth", paymentsByMonth)

        const showTable = payments.length > 0
        return (

            <Container maxWidth="lg" className={classes.container}>
                <div className="page-content">

                    <h2>My Payment List </h2>

                    <div className="row">
                        <div className="col-md-6">
                            <Button onClick={this.props.history.goBack}
                                    style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                            >⬅ Go back</Button>
                            <div className="panel panel-primary">

                                <label htmlFor="dateSelector" style={{ fontSize: '18px', color: 'dimgrey' }}>Select
                                    starting date</label>
                                <YearMonthPicker
                                    className="urpInput"
                                    id="dateSelector"
                                    defaultYear={date.getFullYear()}
                                    defaultMonth={date.getMonth() + 1}
                                    minYear={date.getFullYear()}
                                    maxYear={date.getFullYear() + 100}
                                    closeOnSelect
                                    onChange={this.startDateChanged.bind(this)}
                                />

                            </div>
                            <div className="panel panel-primary">

                                <label htmlFor="dateSelector" style={{ fontSize: '18px', color: 'dimgrey' }}>Select
                                    ending date</label>
                                <YearMonthPicker
                                    className="urpInput"
                                    id="dateSelector"
                                    defaultYear={date.getFullYear()}
                                    defaultMonth={date.getMonth() + 1}
                                    minYear={date.getFullYear()}
                                    maxYear={date.getFullYear() + 100}
                                    closeOnSelect
                                    onChange={this.endDateChanged.bind(this)}
                                />

                            </div>

                            <br/>
                            <br/>
                            <b> Filter your data in the table with these button => &nbsp;&nbsp;&nbsp; </b>
                            <Button variant="contained" color="default"
                                    onClick={this.fetchUnpaidPayment.bind(this)}>Due Payments
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="contained" color="default"
                                    onClick={this.fetchPaidPayment.bind(this)}>Payment History
                            </Button>
                            <br/>
                            <br/>
                            <br/>
                            <hr/>

                        </div>

                    </div>
                    {
                        showTable &&
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                        <TableCell align="center"><b>Month</b></TableCell>
                                        <TableCell align="center"><b>Year</b></TableCell>
                                        <TableCell><b>&nbsp;Amount</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        payments &&
                                        payments.map((payment, i) => {

                                            const pay = payment.month
                                            console.log("paymentCategoryID", pay)


                                            return (

                                                <TableRow>
                                                    <TableCell align="center">
                                                        {i + 1}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {this.renderSwitch(pay)}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {payment.year}
                                                    </TableCell>
                                                    <TableCell>
                                                        {payment.amount}
                                                    </TableCell>
                                                    {/*</TableCell>*/}
                                                    {/*<TableCell align="center">*/}
                                                    {/*    {payment.isPaid ? 'Paid' : 'Not Paid'}*/}
                                                    {/*</TableCell>*/}

                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <TablePagination>

                            </TablePagination>
                        </TableContainer>

                    }

                    {
                        !showTable &&
                        <div>
                            <br/>
                            <br/>
                            <h1 align="center">Oops!!</h1>
                            <br/>


                            <h2 align="center">The record for the chosen criteria is not there!!</h2>
                            <br/>

                        </div>

                    }

                </div>
            </Container>
        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    receiptReducer: state.receiptReducer,
}))(withStyles(useStyles)(ViewPaymentForStudents))


