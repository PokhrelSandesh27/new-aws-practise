import React, { Component } from 'react'
import { getAllClassroom, getClassroomById } from '../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { searchStudent } from '../../Student/actions'
import { makeAPaymentAwait} from '../actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YearMonthPicker from 'react-year-month-picker'
import PaymentModal from './PaymentModal'
import { searchReceipts, generateReceipts, generateReceiptsAwait } from '../actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from "../../TablePagination";
import TableSearch from "../../TableSearch";

class ListAllStudents extends Component {

    date = new Date()

    state = {
        showPaymentModal: false,
        buttonDisabled: false,
        localStore: {
            'year': new Date().getFullYear(),
            'month': new Date().getMonth() +1,
        },

    }

    componentDidMount () {
        const classroom = this.props.match.params.classroom

        const req = { ...this.state.localStore, classroom: classroom}
        console.log("REQUEST PARAM", req)
        this.props.dispatch((getClassroomById(classroom)))
        // this.props.dispatch((searchStudent({ classroom})))
        this.props.dispatch((searchReceipts(req)))
    }
    refreshReceipt (data = { }) {
        const classroom = this.props.match.params.classroom

        const req = { ...this.state.localStore, classroom: classroom, ...data}
        console.log(req)
        this.props.dispatch((searchReceipts(req)))

        // const { currentPayFilter } = this.state
    }

    generateReceipt () {
        const classroom = this.props.match.params.classroom
        const req = { ...this.state.localStore, classroom: classroom}
        console.log("generateReceipt", req)
        // this.props.dispatch((generateReceipts(req)));
        this.props.dispatch(generateReceipts(req)).then((res => {
                if ((res.value || undefined) && res.value.request.status === 200) {
                    toast.success('Generated')
                    this.props.dispatch((searchReceipts(this.state.localStore)))
                } else {
                    toast.error('An error has occurred')
                }

            }
        ))
    }


    dateChanged (date) {
        const classroom = this.props.match.params.classroom
        const dateObj = date._d
        const localStore = { ...this.state.localStore }
        localStore['year'] = dateObj.getFullYear()
        localStore['month'] = dateObj.getMonth() + 1
        this.refreshReceipt(localStore)
        this.setState({ localStore })

        // const req1 = {...this.state.localStore, classroom: classroom }
        console.log("changed date", this.state.localStore)
        // this.props.dispatch((searchReceipts(req)))
    }
    receiptGenerated = status => {
        if (status)
            this.refreshReceipt()

        this.setState({
            showPaymentModal: false
        })
    }
    sayHello() {
        alert('Hello!');
    }

    render () {
        const { classroom } = this.props.classroomReducer
        const { students } = this.props.studentReducer
        const { payments } = this.props.paymentReducer
        const { receipts } = this.props.receiptReducer
        const { classes } = this.props;

        console.log("PAYMENT REDUCER", this.props.receiptReducer)

        const showTable = receipts.length > 0

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">

                        <h2>List of students of {classroom && ` Classroom : Grade ${classroom.grade} Section ${classroom.section}`} for paying receipts</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <Button onClick={this.props.history.goBack}
                                        style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                                >⬅ Go back</Button>
                                <div className="panel panel-primary">

                                    <label htmlFor="dateSelector" style={{fontSize:"18px", color: "dimgrey"}}>Select Month and Year</label>
                                    <YearMonthPicker
                                        className="urpInput"
                                        id="dateSelector"
                                        defaultYear={this.date.getFullYear()}
                                        defaultMonth={this.date.getMonth() + 1}
                                        minYear={this.date.getFullYear()}
                                        maxYear={this.date.getFullYear() + 100}
                                        closeOnSelect
                                        onChange={this.dateChanged.bind(this)}
                                    />

                                    {
                                        showTable &&
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                        <TableCell align="center"><b>&nbsp; Name</b></TableCell>
                                                        <TableCell align="center"><b>Older payment</b></TableCell>
                                                        <TableCell align="center"><b>PaymentStatus</b></TableCell>
                                                        <TableCell align="center"><b>Make Payment</b></TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        receipts &&
                                                        receipts.map((receipt, i) => {

                                                            return (
                                                                <TableRow >
                                                                    <TableCell align="center">
                                                                        {i+1}
                                                                    </TableCell>
                                                                    <TableCell align="center">{receipt.user.fullName}</TableCell>

                                                                    <TableCell align="center">
                                                                        <NavLink className="navlink"
                                                                                 to={{
                                                                                     pathname: `../../../payments/Library`,
                                                                                 }}>
                                                                            History
                                                                        </NavLink>

                                                                    </TableCell >
                                                                    <TableCell align="center">
                                                                        {receipt.isPaid ? "Paid" : 'Not Paid'}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Button variant="contained" color="default"

                                                                                disabled={receipt.isPaid}
                                                                                onClick={() => {
                                                                                    this.setState({
                                                                                        showPaymentModal: !this.state.showPaymentModal,
                                                                                        currentReceipt: receipt
                                                                                    })

                                                                                }}>Pay
                                                                        </Button>
                                                                    </TableCell>




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


                                            <h2 align="center">The receipt for the selected month and year has not been generated yet!!</h2>
                                            <br/>
                                            <br/>
                                            Please click the button below, if you want to generate the receipts.
                                            <br/>
                                            <br/>
                                            {/*<Button variant="outlined"  onClick={this.createClassRoom.bind(this)} style={{margin:'3%', backgroundColor: "lightgreen"}}>*/}
                                            {/*    Add ClassRoom*/}
                                            {/*</Button>*/}
                                            <button onClick={this.generateReceipt.bind(this)}
                                                style={{
                                                    marginLeft: '7%',
                                                    margin: '1%',
                                                    backgroundColor: 'lightgreen'
                                                }}
                                            >Generate
                                            </button>
                                        </div>
                                    }



                                </div>
                            </div>
                        </div>
                        <PaymentModal
                            classroom={classroom}
                            date={this.state.localStore}
                            receipt={this.state.currentReceipt}
                            isHidden={this.state.showPaymentModal}
                            onCompletion={this.receiptGenerated.bind(this)}
                        />

                    </div>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
    paymentReducer: state.paymentReducer,
    receiptReducer: state.receiptReducer,
}))(withStyles(useStyles)(ListAllStudents))
