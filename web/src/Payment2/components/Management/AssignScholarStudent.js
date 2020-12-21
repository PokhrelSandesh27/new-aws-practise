import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import {getAllClassroom} from "../../../Classroom/actions";
import {addPaymentCategory} from "../../actions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "../../../TablePagination";
import MyTextField from "../../../components/TextField";
import Button from "@material-ui/core/Button";



toast.configure()

class AssignScholarStudent extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false ,
        localStore: {},
    }
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        this.props.dispatch(getAllClassroom())

    }

    createDiscount = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const req = {...localStore}
        this.props.dispatch(addPaymentCategory(req))

    }

    handler = (me, value) => {
        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    selectChanged = event => {
        const value = event.target.value
        const id = event.target.name
        this.handler(id, value)
    }
    groupsChanged = event => {
        const localStore = {...this.state.localStore}

        localStore.groups = [event.target.value]
        this.setState({localStore})
    }


    render() {

        const {createState} = this.props.paymentReducer
        const {classrooms} = this.props.classroomReducer
        const {classes} = this.props;
        const {value} = this.state;
        const { row } = this.props;
        const { open } = this.state;

        let msg

        if (createState === 1)
            msg = 'Creating Discount'
        else
            msg = 'Create Discount'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/discount/list',
                    msg: msg
                }}/>
            )
        }

        return (



            <div className="panel panel-primary">

                <form className={classes.root}
                      onSubmit={this.createDiscount.bind(this)}>
                    <div className="col-md-8 order-md-2" style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        width: '100%',
                        gap:"3%"
                    }}>

                        <MyTextField
                            select
                            name="classroom"
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="ScholarShip Type"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select Scholarship Type"
                            variant="outlined">
                            {
                                classrooms.map((classroom) => {
                                        return (
                                            <option
                                                value={classroom._id}>Class: {classroom.grade},
                                                Section: {classroom.section}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>


                        <MyTextField
                            select
                            name="classroom"
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="ClassRoom"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select ClassRoom"
                            variant="outlined">
                            {
                                classrooms.map((classroom) => {
                                        return (
                                            <option
                                                value={classroom._id}>Class: {classroom.grade},
                                                Section: {classroom.section}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>


                        <MyTextField
                            select
                            name="classroom"
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="Student"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select ClassRoom"
                            variant="outlined">
                            {
                                classrooms.map((classroom) => {
                                        return (
                                            <option
                                                value={classroom._id}>Class: {classroom.grade},
                                                Section: {classroom.section}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>


                        <Button
                            variant="contained"
                            color="primary"
                            style={{width:"20%", height:"10%", marginTop:"3%"}}

                        >Approve
                        </Button>

                    </div>

                </form>


                <TableContainer component={Paper} style={{marginTop:"3%", width:"100%"}}>
                    <hr></hr>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                <TableCell align="center"><b>&nbsp; Student</b></TableCell>
                                <TableCell align="center"><b> ClassRoom</b></TableCell>
                                <TableCell align="center"><b>ScholarShip</b></TableCell>
                                <TableCell align="center"><b>Valid Date</b></TableCell>
                                <TableCell align="center"><b>Amount</b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {


                                        <TableRow >
                                            <TableCell align="center">
                                               1
                                            </TableCell>
                                            <TableCell align="center">Ram Sharma</TableCell>

                                            <TableCell align="center">
                                                2 A
                                            </TableCell >
                                            <TableCell align="center">
                                                Annual_Scholarship
                                            </TableCell >
                                            <TableCell align="center">
                                               2020-2021
                                            </TableCell >
                                            <TableCell align="center">
                                               2000
                                            </TableCell >
                                        </TableRow>

                            }
                        </TableBody>
                    </Table>

                </TableContainer>


            </div>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(AssignScholarStudent))


