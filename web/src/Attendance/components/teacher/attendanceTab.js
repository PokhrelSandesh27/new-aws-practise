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
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipTab from '../../../Classroom/components/Tab'
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Grid from "@material-ui/core/Grid";
import ViewAttendance from './ViewAttendance'
import CreateAttendance from './CreateAttendance'
import {emphasize} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


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

class attendanceTab extends Component {

    state = {
        value:0

    }
    handleChange = (event, value) => {
        this.setState({value});
    };

     handleClick() {

        console.info('You clicked a breadcrumb.');
    }

    render() {

        const {createState} = this.props.paymentReducer

        const {classes} = this.props;
        const {value} = this.state;

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
                            <NavLink to={'/home/homepage'}>
                            <StyledBreadcrumb
                                component="a"
                                label="Home"
                                icon={<HomeIcon fontSize="small" />}
                                onClick={this.handleClick()}
                            />
                            </NavLink>
                            <NavLink to={'/attendance/list'}>
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Attendance"
                                onClick={this.handleClick()}
                            />
                            </NavLink>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>


                        <div>
                            <AppBar position="static" key="appbar">
                                <Tabs
                                    variant={'scrollable'}
                                    classes={{indicator: classes.bigIndicator}}
                                    value={value}
                                    onChange={this.handleChange}
                                >
                                    <Tab style={{marginLeft:"15%"}} label="Attendance"/>
                                    <Tab style={{marginLeft:"15%"}} label="Check Attendance"/>

                                </Tabs>
                            </AppBar>

                            <div key="tab-content">
                                {value === 0 && <Typography>
                                    <CreateAttendance/>


                                </Typography>}


                                {value === 1 && <Typography>
                                    <ViewAttendance/>
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

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(attendanceTab))


