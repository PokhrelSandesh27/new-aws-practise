import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {withStyles} from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import MyTextField from "../../../components/TextField";
import {addPaymentCategory, createPaymentConfig, createScholarConfig, getAllPaymentCategory} from "../../actions";

import Grid from "@material-ui/core/Grid";
import moment from 'moment'
import {getDate} from '../../../utils'
import {getAllUsers} from "../../../User/actions";
import {getAllClassroom} from "../../../Classroom/actions";
import {searchStudent} from "../../../Student/actions";
import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core'


toast.configure()


// TODO Extract this functional component so that we can use it on other date picker as well
const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  variant="outlined"/>

const StartDate = e => DatePickerInput('Start Date', e)
const EndDate = e => DatePickerInput('End Date', e)
class CreatePaymentConfig extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false,
        date: new Date(),
        formatDate: '',
        showTextFiled:false,
        localStore: {
            startDate: new Date(),
            endDate: new Date(),
        },



        classroom: '',
        students: []
    }

    onDateChanged = (date, type) => {
        const localStore = {...this.state.localStore}
        localStore[type] = date
        this.setState({localStore})
    }


    classroomChanged = e => {
        const currentValue = e.target.value

        this.updateStudent(currentValue)
        this.setState({classroom: currentValue});
    }


    componentDidMount() {
        this.props.dispatch(getAllPaymentCategory())
        this.props.dispatch(getAllUsers())
        this.props.dispatch(getAllClassroom())

    }

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
        // this.changed({ [key]: value })
    }

    updateStudent = (currentClass = "") => {
        if (this.state.classroom !== "" || currentClass !== "") {
            this.props.dispatch(searchStudent({classroom: currentClass}));
        }

    }

    createPaymentConfig = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const endDate = moment(localStore.endDate).endOf('M').valueOf()
        const startDate = moment(localStore.startDate).startOf('M').valueOf()
        const req = {...localStore, startDate, endDate}
        this.props.dispatch(createScholarConfig(req))
            .then((resp) => {
                toast.success('succesfully Added')
            })
            .catch(err => {
                toast.error('failed to Add');
            })

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
        localStore.repetition = event.target.value
        this.setState({localStore})
    }
    textChanged= event =>{
        this.setState({showTextFiled:true})
    }


    render() {

        const {createState, payments} = this.props.paymentReducer
        const {classrooms} = this.props.classroomReducer
        const {users} = this.props.userReducer
        const {classes} = this.props;
        const {students} = this.props.studentReducer
        const {value} = this.state;
        // const {students} = this.state
        console.log(students, "students array list ")
        const {row} = this.props;
        const {open} = this.state;


        return (

            <div>
                {
                    createState === 3
                }
                {
                    createState === 2
                }
                <form className={classes.root} onSubmit={this.createPaymentConfig.bind(this)}>

                    <div className="col-md-8 order-md-2" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '70%',
                        marginLeft: '11%',
                        marginTop: "3%"
                    }}>
                        <div className="mb-3">
                            <h2>Info for creating Payment Config</h2>
                        </div>
                        <MyTextField id="outlined"
                                     variant="outlined"
                                     me='name'
                                     required
                                     handler={this.handler}
                                     label="Name"/>
                        <MyTextField
                            select
                            name="repetition"
                            required
                            id="outlined-select-native"
                            handler={this.groupsChanged}
                            SelectProps={{
                                native: true,
                            }}
                            label="Repetition"
                            helperText="Please select repetition"
                            variant="outlined">
                            <option value="ANNUALLY">Annually</option>
                            <option value="MONTHLY">Monthly</option>
                        </MyTextField>

                        <MyTextField
                            select
                            name="paymentCategory"
                            required
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="Payment category"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select category"
                            variant="outlined">
                            {
                                payments.map((pay) => {
                                        return (
                                            <option
                                                value={pay._id}>Name: {pay.name}, Amount: {pay.amount}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>

                        <MyTextField
                            select
                            name="classroom"
                            id="outlined-select-native"
                            handler={this.classroomChanged}
                            required
                            label="classroom"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select category"
                            variant="outlined">
                            {
                                classrooms.map((classroom) => {
                                        return (
                                            <option
                                                value={classroom._id}>grade: {classroom.grade}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>


                        <MyTextField
                            select
                            name="student"
                            required
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="student"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select category"
                            variant="outlined">
                            {
                                students.map((user) => {

                                        return (
                                            <option
                                                value={user._id}>Name: {user.student.fullName}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>


                        <Grid container justify="flex-start" spacing={3} style={{gap: "2%", marginLeft: "3%", marginTop:"1%"}}>
                            <DatePicker
                                style={{ flexGrow: 1 }}
                                selected={this.state.localStore.startDate}
                                onChange={date => this.updateLocalStore('startDate', date)}
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                customInput={<StartDate/>}
                            />

                            <DatePicker
                                style={{ flexGrow: 1 }}
                                selected={this.state.localStore.endDate}
                                onChange={date => this.updateLocalStore('endDate', date)}
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                // maxDate={new Date()}
                                customInput={<EndDate/>}
                            />


                        </Grid>
                        <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>
                            <MyTextField
                                select
                                name="repetition"
                                required
                                id="outlined-select-native"
                                handler={this.textChanged}

                                SelectProps={{
                                    native: true,
                                }}
                                label="Schema"
                                helperText="Please select repetition"
                                variant="outlined">
                                <option value="PARTIAL">PartialScholar</option>
                                <option value="FULL">FullScholar</option>
                            </MyTextField>
                            { this.state.showTextFiled ? <MyTextField id="outlined"
                                                                    variant="outlined"
                                                                      required
                                                                    me='discount'
                                                                    handler={this.handler}
                                                                    label="Discount %"
                            />:"" }

                        </Grid>

                        <Grid container justify="flex-end" spacing={3} style={{gap: "5%", marginLeft: "3%"}}>
                            <Button
                                variant="contained"
                                style={{backgroundColor: "lightgreen", marginTop: "3%", marginBottom: "3%"}}
                                type="submit"
                            >Save
                            </Button>

                        </Grid>


                    </div>
                </form>
            </div>


        )
    }
}

export default connect(state => ({
    userReducer: state.userReducer,
    studentReducer: state.studentReducer,
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(CreatePaymentConfig))


