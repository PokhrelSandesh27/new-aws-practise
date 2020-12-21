import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'


import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'
import ListIssuedBook from './ListIssuedBook'
import IssueBook from './IssueBook'
import StudentGroupTest from '../../../Attendance/components/teacher/StudentGroupTest'
import Test from './Test'

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
                            orientation={'' +
                            'horizontal: "top"|"bottom"'}
                            textColor={'primary'}

                            classes={{indicator: classes.bigIndicator}}
                            value={value}
                            onChange={this.handleChange}
                        >

                            <Tab
                                style=
                                    {{
                                        fontFamily:"Shadows Into Light, cursive",
                                        fontWeight:"bold"}} label="List Issued Book"/>
                            <Tab style={{
                                fontFamily:"Shadows Into Light, cursive",
                                fontWeight:"bold"}} label="Issue Book"/>



                        </Tabs>


                        <div key="tab-content">
                            {value === 0 && <Typography>
                                <ListIssuedBook/>

                            </Typography>}


                            {value === 1 && <Typography>
                                <IssueBook/>
                            </Typography>}



                        </div>
                    </div>

                </div>
            </Paper>
                </Container>
            </main>


        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(PaymentCategory))


