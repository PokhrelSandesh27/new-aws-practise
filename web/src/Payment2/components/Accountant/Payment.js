import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Filter from './Filter'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeAPaymentAwait, searchPayments } from '../../actions'
import { cleanObject, getMonth } from '../../../utils'
import moment from 'moment'
import InputLabel from '@material-ui/core/InputLabel'
import PaymentRow from './PaymentRow'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import logo from '../../../img/logo.svg'
import { toast } from 'react-toastify'
import { get, orderBy } from 'lodash'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Receipt from './Receipt'
import PaymentGroup from './PaymentGroup'
import credit from '../../../img/credit.svg'

toast.configure()

class Payment extends React.Component {

    state = {
        localStore: {
            user: undefined
        },
        payStore: [],
        isPaid: -1,
        showReceipt: false,
    }

    isPaidStateChanged = e => {
        const isPaid = e.target.value
        this.setState({ isPaid })
        this.updateList({ isPaid })
    }

    hideReceipt = (state) => {
        this.setState({
            payStore: [],
            showReceipt: false,
        })
        if (state) this.updateList()
    }

    updateList = (data = {}) => {
        const { localStore, isPaid } = this.state
        const reqA = { ...localStore, isPaid, ...data }
        if (reqA.isPaid === -1) reqA.isPaid = undefined
        const req = cleanObject(reqA)
        if (req.hasOwnProperty('user')) {
            req.user = req.user.student._id
            this.props.dispatch(searchPayments(req))
        }
    }

    showReceipt = (payStore = []) => {
        this.setState({ payStore, showReceipt: true })
    }

    stateChanged = state => {
        state.startDate = moment(state.startDate).utc().startOf('month').valueOf()
        state.endDate = moment(state.endDate).utc().endOf('month').valueOf()
        this.setState({ localStore: state })
        this.updateList({ ...state })
    }

    filterPayments = payments => {
        let pa = []
        for (let payment of payments) {
            let date = `${getMonth(payment.month)}, ${payment.year}`
            let index = pa.findIndex(item => item.date === date)
            if (index > -1)
                pa[index].payments.push(payment)
            else
                pa.push({ date, month: payment.month, year: payment.year, payments: [payment] })
        }
        pa = orderBy(pa, 'month', 'desc')
        pa = orderBy(pa, 'year', 'desc')
        return pa
    }

    render () {
        const { classes } = this.props
        const { localStore } = this.state
        const { payments, searchState } = this.props.paymentReducer
        const { user } = this.state.localStore
        const filteredPayment = this.filterPayments(payments)
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Payments</h2>
                        {
                            this.state.showReceipt &&
                            <Receipt payments={this.state.payStore} user={user}
                                     closeModal={this.hideReceipt}/>
                        }
                        <Paper>
                        <Filter onChanged={this.stateChanged}/>
                        {/*<InputLabel id="payment-status-label">Filter Payment</InputLabel>*/}
                        <Select
                            variant={'filled'}
                            style={{marginTop:"1%", marginLeft:"3%"}}
                            labelId="payment-status-label"
                            id="payment-status"
                            value={this.state.isPaid}
                            onChange={this.isPaidStateChanged}>
                            <MenuItem value={-1}>All Payments</MenuItem>
                            <MenuItem value={false}>Due Payments</MenuItem>
                            <MenuItem value={true}>Payment History</MenuItem>
                        </Select>
                        </Paper>
                        <div>
                            {
                                !localStore.user &&
                                <div style={{ Display:"flex", JustifyContent:"center" }}>

                                <img src={credit} style={{width:"18%", display:"flex", justifyContent:"center",marginTop:"1%", marginLeft:"40%"}}/>
                                    <h3 style={{marginLeft:"40%"}}> Oops please select a student.</h3>
                                </div>
                            }
                            {
                                !!localStore.user &&
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding={'checkbox'}>{''}</TableCell>
                                                <TableCell align="left"
                                                           padding={'checkbox'}><b>S.N.</b></TableCell>
                                                <TableCell align="left" padding={'checkbox'}><b>&nbsp; </b></TableCell>
                                                <TableCell align="right"><b>&nbsp; Date</b></TableCell>
                                                <TableCell align="left"><b>&nbsp; Payment Status</b></TableCell>
                                                <TableCell align="right"><b>&nbsp; Amount</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                searchState === 2 && filteredPayment &&
                                                filteredPayment.map((payment, i) => {
                                                    return (
                                                        <PaymentGroup key={`${payment.date}-${user._id}`}
                                                                      payments={payment} user={user}
                                                                      id={i += 1} onGenerate={this.showReceipt}/>
                                                    )
                                                })
                                            }
                                            {
                                                searchState === 1 &&
                                                <TableRow> <TableCell align={'center'}
                                                                      colSpan={6}>Searching...</TableCell></TableRow>
                                            }
                                            {
                                                searchState === 3 &&
                                                <TableRow> <TableCell align={'center'} colSpan={6}>An Error
                                                    Occurred.</TableCell></TableRow>
                                            }
                                            {
                                                filteredPayment.length === 0 &&
                                                <TableRow> <TableCell align={'center'} colSpan={6}>No records
                                                    found.</TableCell></TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </div>


                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    // paymentConfigurationReducer: state.paymentConfigurationReducer,
    // scholarshipConfigurationReducer: state.scholarshipConfigurationReducer,
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(Payment))
