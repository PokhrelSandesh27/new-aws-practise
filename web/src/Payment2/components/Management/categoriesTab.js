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
import CreatePaymentConfig from "./CreatePaymentConfig";
import Grid from "@material-ui/core/Grid";
import ScholarShipConfig from "./ScholarShipConfig";
import PaymentCategory from "./PaymentCategory";
import paymentConfigTab from "./PaymentConfigTab"
import PaymentConfigTab from "./PaymentConfigTab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";


const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)
toast.configure()

class CreateDiscount extends Component {

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
                            <Breadcrumbs aria-label="breadcrumb"
                                         style={{float: 'right'}}>
                                <StyledBreadcrumb onClick={this.props.history.goBack}
                                                  component="a"
                                                  label="Back"
                                                  icon={<ArrowBackIosIcon fontSize="small" />}>

                                </StyledBreadcrumb>
                                <NavLink to={'/home/homePage'}>
                                    <StyledBreadcrumb
                                        component="a"
                                        label="Home"/>
                                </NavLink>

                                <Typography variant={'inherit'} color={'secondary'}>
                                    Payments
                                </Typography>
                            </Breadcrumbs>
                            <br/> <br/>

                            <div>
                                <AppBar position="static" key="appbar">
                                    <Tabs
                                        variant={'scrollable'}
                                        classes={{indicator: classes.bigIndicator}}
                                        value={value}
                                        onChange={this.handleChange}
                                    >
                                        <Tab style={{marginLeft:"10%"}} label="Payment Type"/>
                                        <Tab style={{marginLeft:"10%"}} label="Payment Reoccurrence"/>
                                        <Tab style={{marginLeft:"10%"}} label="Scholarship Type"/>
                                    </Tabs>
                                </AppBar>

                                <div key="tab-content">
                                    {value === 0 && <Typography>
                                    <PaymentCategory></PaymentCategory>

                                    </Typography>}


                                    {value === 1 && <Typography>
                                <PaymentConfigTab/>
                                    </Typography>}
                                    {value === 2 && <Typography>
                                        <ScholarShipConfig></ScholarShipConfig>
                                    </Typography>}
                                </div>
                            </div>


                        </div>


                        <Box pt={4}>
                            <Footer/>
                        </Box>
                    </Container>
                </main>

            )
        }
    }

    CreateDiscount.propTypes = {
        classes: PropTypes.object.isRequired
    };

    export default connect(state => ({
        paymentReducer: state.paymentReducer,
        classroomReducer: state.classroomReducer,
    }))(withStyles(useStyles)(CreateDiscount))


