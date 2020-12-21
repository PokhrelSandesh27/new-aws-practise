import React, {Component} from 'react'
import {getClassroomById} from '../../Home/actions'
import {connect} from 'react-redux'
import '../static/css/style.css'
import {getUser} from '../../utils'
import {searchReceipts} from '../actions'
import {get} from 'lodash'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SingleReceiptRow from './SingleReceiptRow'
import {getPayment} from '../../Payment/actions'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import {withStyles} from '@material-ui/core'
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import YearMonthPicker from 'react-year-month-picker'

toast.configure()

class ListAllReceiptsForStudentByPayment extends Component {

    filterTypes = ['All', 'UnPaid', 'Paid']

    date = new Date()

    state = {
        localStore: [],
        searchStore: {
            year: (new Date()).getFullYear(),
            month: (new Date()).getMonth() + 1,
        },
        currentPayFilter: 1,
        isMultiple: false,
        totalAdded: 0,
        totalToPay: 0,
        isDisabled: false,
    }

    async componentDidMount() {
        const user = getUser()
        const {classroom, student} = user
        const year = this.date.getFullYear()
        const month = this.date.getMonth() + 1

        const studentId = student._id || student

        // const payment = get(this.props.match, 'params.payment')

        // this.props.dispatch((getClassroomById(classroom)))

        const searchStore = {student: studentId, year, month}

        const req = {...searchStore, isPaid: false}

        // if (!!payment) {
        //     req.payment = payment
        //     this.props.dispatch((getPayment(payment)))
        // }

        this.props.dispatch((searchReceipts(req)))
        this.setState({searchStore})
    }

    dateChanged(d) {
        const dateObj = d._d
        const date = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1
        }
        this.setState({
            searchStore: {
                ...this.state.searchStore, ...date
            }
        })
        this.refreshReceipt(date)
    }

    refreshReceipt(options = {}) {
        const {currentPayFilter} = this.state
        const currentValue = options.currentPayFilter || currentPayFilter // on payFilterChanged, immediate call after setting state won't change state immediately
        if (options.hasOwnProperty('currentPayFilter')) delete options.currentPayFilter
        const req = {...this.state.searchStore, ...options}

        // if (!!this.state.payment) req.payment = this.state.payment

        if (currentValue > 0) req.isPaid = !!(currentValue - 1)
        this.props.dispatch((searchReceipts(req)))
    }

    payFilterChanged = event => {
        const currentValue = event.target.value
        const value = {currentPayFilter: event.target.value}
        this.setState({...value})
        this.refreshReceipt(value)
    }

    onPay = id => {
        console.log(id);
    }
    print(){
        window.print();
    }


    addNewPay = (id, status, receipt) => {

        const localStore = this.state.localStore
        let totalToPay = this.state.totalToPay

        if (!status) {

            const index = localStore.findIndex(item => item._id === id)

            totalToPay -= receipt.payment.amount

            localStore.splice(index, 1)
        } else {
            totalToPay += receipt.payment.amount

            localStore.push({
                _id: id,
                receipt
            })
        }
        this.setState({
            isMultiple: !!localStore.length,
            localStore,
            totalToPay
        })

    }

    render() {
        const {classroom} = getUser()
        // const { classroom } = this.props.classroomReducer
        const {student, searchSingleState} = this.props.studentReducer
        const {receipts} = this.props.receiptReducer
        const {payment, readState: paymentRead} = this.props.paymentReducer
        const {classes} = this.props

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">

                        <h2>Receipts </h2>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">
                                    <div>

                                        <Button variant="contained" style={{width: '100%'}} color="primary">
                                            {
                                                `Student :${getUser().fullName}`

                                            }
                                            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            {

                                                `ClassRoom : ${classroom.grade} ${classroom.section}`
                                            }
                                            {/*&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;*/}
                                            {/*{*/}

                                            {/*    `Payment : ${payment.category}`*/}
                                            {/*}*/}
                                        </Button>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            {/*<div className="col-6">*/}
                                            {/*<button*/}
                                            {/*    style={{ marginLeft: '7%', margin: '1%', backgroundColor: 'dimgrey' }}*/}
                                            {/*    onClick={() => {*/}
                                            {/*        this.setState({*/}
                                            {/*            receiptGenerationForm: !this.state.receiptGenerationForm*/}
                                            {/*        })*/}
                                            {/*    }}>Create New Receipt*/}
                                            {/*</button>*/}
                                            {/*</div>*/}
                                            <select name="category" id="category" className="urpSelect"
                                                    style={{width: '60%', marginLeft: '19%', marginBottom: '1%'}}
                                                    value={this.state.currentPayFilter}
                                                    onChange={this.payFilterChanged}>
                                                {
                                                    this.filterTypes.map((type, i) => {
                                                        return (
                                                            <option value={i}> {type}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <YearMonthPicker
                                                className="urpInput"
                                                id="dateSelector"
                                                defaultYear={this.date.getFullYear()}
                                                defaultMonth={this.date.getMonth() + 1}
                                                minYear={this.date.getFullYear() - 5}
                                                maxYear={this.date.getFullYear()}
                                                closeOnSelect
                                                onChange={this.dateChanged.bind(this)}
                                            />

                                        </div>

                                    </div>

                                    <TableContainer component={Paper} style={{backgroundColor: 'f0f1f6'}}>
                                        <div className="invoice">
                                            <div className="invoice-logo">
                                                <img src="https://placeimg.com/640/480/arch/any" alt=""></img>
                                            </div>
                                            <div className="invoice-sec-1">
                                                <div className="invoice-sec-1-ref">
                                                    <div className="ref-no">
                                                        <p>Ref: Association Member - <span>A754</span></p>
                                                        <p>Invoice No: <span>BASIS-2019/UCBL/1148</span></p>
                                                    </div>
                                                    <div className="to-invoice">
                                                        <p>To</p>
                                                        <p>  {student && searchSingleState === 2 && get(student, 'student.fullName')}</p>
                                                        <p>Class: <span>{classroom.grade} '{classroom.section}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="invoice-sec-1-date">
                                                    <p>Date:
                                                        {
                                                            receipts &&
                                                            receipts.map((receipt, i) => {
                                                                return (
                                                                    <span>{receipt.month}/{receipt.year}</span>

                                                                )
                                                            })
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="invoice-banner">
                                                <div className="banner-d">
                                                    <p>Invoice</p>
                                                </div>
                                            </div>

                                            <TableContainer>
                                                <div className="invoice-table">
                                                    <div className="invoice-table-container">
                                                        <div className="invoice-table-data">
                                                            <div className="invoice-table-sl invoice-table-sl-h">
                                                                <strong><p>Sl. No</p></strong>
                                                            </div>
                                                            <div className="invoice-table-sl invoice-table-sl-h">
                                                                <strong><p>Check</p></strong>
                                                            </div>
                                                            <div
                                                                className="invoice-table-amount invoice-table-amount-h">
                                                                <strong><p>Payment Category</p></strong>
                                                            </div>
                                                            <div
                                                                className="invoice-table-amount invoice-table-amount-h">
                                                                <strong><p>Amount</p></strong>
                                                            </div>
                                                            <div className="invoice-table-sl invoice-table-sl-h">
                                                                <strong><p>Status</p></strong>
                                                            </div>
                                                            <div className="invoice-table-sl invoice-table-sl-h">
                                                                <strong><p>Action</p></strong>
                                                            </div>
                                                        </div>
                                                        {
                                                            receipts &&
                                                            receipts.map((receipt, i) => {
                                                                return (
                                                                    <SingleReceiptRow
                                                                        key={receipt._id}
                                                                        receipt={receipt}
                                                                        index={i + 1}
                                                                        enableSinglePay={true}
                                                                        onPay={this.onPay.bind(this)}
                                                                        onSelected={this.addNewPay}

                                                                    />

                                                                )
                                                            })

                                                        }
                                                        <div className="invoice-table-footer">
                                                            <div className="invoice-total">
                                                                <p>Total</p>
                                                            </div>
                                                            <div className="invoice-total-amount">
                                                                <p>Amount to be paid: {this.state.totalToPay}</p>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </TableContainer>
                                            <div className="invoice-declaration">
                                                <p>Please pay cash directly to any UCBL branch and send us the invoice
                                                    with bank &
                                                    signature</p>
                                            </div>
                                            <div className="invoice-greeting">
                                                <p>

                                                    <Button variant="contained" color="primary" onClick={this.print}>
                                                        print
                                                    </Button>
                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    Thank You
                                                </p>
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
    studentReducer: state.studentReducer,
    receiptReducer: state.receiptReducer,
    paymentReducer: state.paymentReducer,
}))(withStyles(useStyles)(ListAllReceiptsForStudentByPayment))
