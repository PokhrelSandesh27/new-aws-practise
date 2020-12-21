import React, { Component } from 'react'
import { makeAPaymentAwait } from '../actions'
import { getClassroomById } from '../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getPaymentCategories, getUser } from '../../utils'
import { searchStudentByIdAwait } from '../../Student/actions'
import { searchReceipts } from '../actions'
import { get } from 'lodash'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateReceipt from './CreateReceipt'
import SingleReceiptRow from './SingleReceiptRow'

import { createMarkSheet } from '../../Exam/MarkSheet/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

toast.configure()

class ListAllReceipts extends Component {

    filterTypes = ['All', 'UnPaid', 'Paid']

    state = {
        localStore: [],
        currentPayFilter: 1,
        receiptGenerationForm: false,
        isMultiple: false,
        totalAdded: 0,
        isDisabled: false,
    }

    async componentDidMount () {
        const classroom = this.props.match.params.classroom
        const student = this.props.match.params.student
        this.props.dispatch((getClassroomById(classroom)))

        const studentReducer = await this.props.dispatch(searchStudentByIdAwait(student))
        if ((studentReducer.value || undefined) && studentReducer.value.request.status === 200) {
            const studentData = studentReducer.value.data
            console.log(studentData)
            if (studentData.length === 1) {
                this.props.dispatch((searchReceipts({ student: studentData[0]._id, isPaid: false })))
                this.setState({
                    student: studentData[0]._id
                })
            } else {
                toast.info('This student account is incomplete. This info will mostly show only on dev environment')
            }
        }
    }

    refreshReceipt (index = undefined) {
        const { currentPayFilter } = this.state
        const currentValue = index || currentPayFilter // on payFilterChanged, immediate call after setting state won't change state immediately
        const req = { student: this.state.student }
        if (currentValue > 0) {
            req.isPaid = !!(currentValue - 1)
        }
        this.props.dispatch((searchReceipts(req)))
    }

    payFilterChanged = event => {
        const currentValue = event.target.value
        this.setState({
            currentPayFilter: currentValue
        })
        this.refreshReceipt(currentValue)
    }

    receiptGenerated = status => {
        if (status)
            this.refreshReceipt()

        this.setState({
            receiptGenerationForm: false
        })
    }

    singlePay = async (receiptId) => {
        const paymentReducer = await this.props.dispatch(makeAPaymentAwait(receiptId))
        if ((paymentReducer.value || undefined) && paymentReducer.value.request.status === 200) {
            const paymentData = paymentReducer.value.data
            if (paymentData.isPaid) {
                toast.success('Receipt Paid')
            } else
                toast.success('An error occurred')

            this.refreshReceipt()
        }
    }

    addNewPay = (id, status) => {

        const localStore = this.state.localStore

        if (!status) {
            const index = localStore.findIndex(item => item._id === id)
            localStore.splice(index, 1)
        } else
            localStore.push({
                _id: id
            })
        this.setState({
            isMultiple: !!localStore.length,
            localStore
        })
    }

    async payNow () {
        this.setState({ isDisabled: true })

        let isError = false

        const data = this.state.localStore

        data.map((item, index) => {
                this.props.dispatch(makeAPaymentAwait(item._id)).then(paymentReducer => {
                    if ((paymentReducer.value || undefined) && paymentReducer.value.request.status === 200) {
                        const paymentData = paymentReducer.value.data
                        console.log(paymentData)
                        if (paymentData.isPaid) {
                            toast.success(`Receipt paid of ${paymentData.year}/${paymentData.month}`)
                        } else
                            toast.success('An error occurred while paying a receipt')
                        this.refreshReceipt()
                    }
                })


                if (this.state.localStore.length === index + 1) {
                    // TODO Refactor this so that, the paid index will only be removed
                    // Assume that all were paid.

                    this.setState({
                        localStore: [],
                        isMultiple: false,
                        isDisabled: false
                    })

                }
            }
        )

    }

    render () {
        const { classes } = this.props;
        const { classroom } = this.props.classroomReducer
        const { student, searchSingleState } = this.props.studentReducer
        const { receipts } = this.props.receiptReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">

                    <h2>List of receipts </h2>
                <div className="row">
                    <div className="col-md-6">
                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</Button>
                        <div className="panel panel-primary">
                            <div>
                                <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {student && searchSingleState === 2 && get(student, 'student.fullName')}
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `ClassRoom : ${classroom.grade} ${classroom.section}`
                                    }

                                </Button>


                            </div>
                            <div className="row">
                                <div className="col-6">

                                    <div className="col-6">
                                        <Button variant="contained"
                                            style={{marginLeft:"7%", margin:"1%", backgroundColor: "dimgrey"}}
                                            onClick={() => {
                                                this.setState({
                                                    receiptGenerationForm: !this.state.receiptGenerationForm
                                                })
                                            }}>Create New Receipt
                                        </Button>
                                    </div>
                                    {/*<label htmlFor="category">Switch</label>*/}
                                    <select name="category" id="category" className="urpSelect"
                                            style={{width: "60%", marginLeft: "19%", marginBottom: "1%"}}
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
                                </div>

                            </div>
                            <CreateReceipt
                                onCompletion={this.receiptGenerated.bind(this)}
                                isHidden={this.state.receiptGenerationForm}
                                student={this.state.student}
                                classroom={this.props.match.params.classroom}
                            />
                            <TableContainer component={Paper}>
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
                                            <p>Class: <span>{classroom.grade} '{classroom.section}</span></p>
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
                                            <div className="invoice-table">
                                                <div className="invoice-table-container">
                                                    <div className="invoice-table-data">
                                                        <div className="invoice-table-sl invoice-table-sl-h">
                                                            <strong><p>Sl. No</p></strong>
                                                        </div>
                                                        <div className="invoice-table-sl invoice-table-sl-h">
                                                            <strong><p>Check</p></strong>
                                                        </div>
                                                        <div className="invoice-table-amount invoice-table-amount-h">
                                                            <strong><p>Payment Category</p></strong>
                                                        </div>
                                                        <div className="invoice-table-amount invoice-table-amount-h">
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
                                                                    enableSinglePay={!this.state.isMultiple}
                                                                    onPay={this.singlePay}
                                                                    onSelected={this.addNewPay}

                                                                    />

                                                            )})

                                                    }
                                                    {
                                                    receipts &&
                                                    receipts.map((receipt, i) => {
                                                        return(
                                                        <div className="invoice-table-footer">
                                                            <div className="invoice-total">
                                                                <p>Total</p>
                                                            </div>
                                                            <div className="invoice-total-amount">
                                                                <p>Amount Paid</p>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                    }

                                                </div>
                                            </div>
                                <div className="invoice-declaration">
                                    <p>Please pay cash directly to any UCBL branch and send us the invoice with bank &
                                        signature</p>
                                </div>
                                <div className="invoice-greeting">
                                    <p>Thank You</p>
                                </div>
                            </div>

                            {
                                this.state.isMultiple &&
                                <button className="btn "
                                        onClick={this.payNow.bind(this)}
                                        disabled={this.state.isDisabled}>Pay {this.state.localStore.length} bills
                                    now</button>
                            }
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
}))(withStyles(useStyles)(ListAllReceipts))
