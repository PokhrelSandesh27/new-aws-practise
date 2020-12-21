import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import MyTextField from "../../../components/TextField";
import {getAllClassroom} from "../../../Classroom/actions";
import {addTimeTable} from "../../../TimeTable/action";
import {addPaymentCategory} from "../../actions";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipTab from '../../../Classroom/components/Tab'
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CreatePaymentConfig from "./CreatePaymentConfig";
import ScholarShipConfig from "./ScholarShipConfig";
import CreatePaymentCategory from "./CreatePaymentCategory";
import ListPaymentCategory from "./ListPaymentCategory";
import ListPaymentConfig from "./ListPaymentConfig";


toast.configure()

class PaymentCategory extends Component {

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
            <Paper>


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
                                    {{marginLeft:"15%",
                                        fontFamily:"Shadows Into Light, cursive",
                                        fontWeight:"bold"}} label="Payment Reoccurrence  "/>
                            <Tab style={{marginLeft:"15%",
                                fontFamily:"Shadows Into Light, cursive",
                                fontWeight:"bold"}} label="List Payment Reoccurrence"/>


                        </Tabs>


                        <div key="tab-content">
                            {value === 0 && <Typography>
                                <CreatePaymentConfig/>

                                </Typography>}


                            {value === 1 && <Typography>
                                <ListPaymentConfig/>
                            </Typography>}

                        </div>
                    </div>

                </div>
            </Paper>


        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(PaymentCategory))


