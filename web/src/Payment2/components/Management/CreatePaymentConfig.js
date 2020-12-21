import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import MyTextField from "../../../components/TextField";
import {getAllClassroom} from "../../../Classroom/actions";
import {addTimeTable} from "../../../TimeTable/action";
import {addPaymentCategory, createPaymentConfig, getAllPaymentCategory} from "../../actions";
import DatePicker from 'react-datepicker'

import Grid from "@material-ui/core/Grid";

import DateTimePicker from '../../../Event/Components/DateTimePicker'
import moment from 'moment'
import {getDate} from '../../../utils'
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
        localStore: {
            startDate: new Date(),
            endDate: new Date(),
        },
    }
    handleChange = (event, value) => {
        this.setState({value});

    };
    onDateChanged = (date, type) => {
        const localStore = {...this.state.localStore}
        localStore[type] = date
        this.setState({localStore})
    }

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
        // this.changed({ [key]: value })
    }


    componentDidMount() {
        this.props.dispatch(getAllPaymentCategory())
    }

    createPaymentConfig = (e) => {
        e.preventDefault()
        const {localStore} = this.state // reading from the state ( by ref )
        const endDate = moment(localStore.endDate).endOf('M').valueOf()
        const startDate = moment(localStore.startDate).startOf('M').valueOf()
        const req = {...localStore, startDate, endDate}
        this.props.dispatch(createPaymentConfig(req))
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

    render() {

        const {createState, payments} = this.props.paymentReducer
        const {classrooms} = this.props.classroomReducer
        const {classes} = this.props;
        const {value} = this.state;
        const {row} = this.props;
        const {open} = this.state;



        return (

            <div>

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
                            label="Payment Type"
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
                        <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>
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
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(CreatePaymentConfig))


