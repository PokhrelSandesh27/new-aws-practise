import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import {getAllClassroom} from "../../../Classroom/actions";
import {addPaymentCategory} from "../../../Payment2/actions";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import staffsAttendance from "./StaffsAttendance";
import AttendancePiChart from "../students/AttendanceTable";
import StaffsAttendance from "./StaffsAttendance";
import StudentsAttendance from "./StudentsAttendance";





toast.configure()

class AttendanceTab extends Component {

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
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '98%',
                            marginLeft: "1%",
                            marginRight: "1%",
                            marginTop:"1%",
                            marginBottom:"3%"
                        }}>
                            <div className="mb-3">


                                <Tabs
                                    classes={{indicator: classes.bigIndicator}}
                                    value={value}
                                    onChange={this.handleChange}
                                >

                                    <Tab
                                        style=
                                            {{marginLeft:"3%",
                                                fontFamily:"Shadows Into Light, cursive",
                                                fontWeight:"bold"}} label="Student's Attendance"/>
                                    <Tab style={{marginLeft:"3%",
                                        fontFamily:"Shadows Into Light, cursive",
                                        fontWeight:"bold"}} label="Staff's Attendance"/>


                                </Tabs>


                                <div key="tab-content">
                                    {value === 0 && <Typography>
                                        <StaffsAttendance/>

                                    </Typography>}


                                    {value === 1 && <Typography>

                                        <StudentsAttendance/>
                                    </Typography>}

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
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(AttendanceTab))


