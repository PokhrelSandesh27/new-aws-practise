import React, { Component } from 'react'
// import { getExams } from '../actions'
import { connect } from 'react-redux'
// import '../static/css/style.css'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { getClassroomById } from '../../Home/actions'
import { getPayments, searchPayments } from '../actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from "../../TablePagination";
import TableSearch from "../../TableSearch";
import logo from '../../img/logo.svg'
import Fab from '@material-ui/core/Fab'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import NavigationIcon from '@material-ui/icons/Navigation';
class MCQFirstPage extends Component {

    state = {
        type: null,
        classroom: this.props.match.params.classroom
    }

    componentDidMount () {
        const { classroom } = this.state
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(searchPayments({ classroom }))
    }

    render () {
        const { classroom } = this.props.classroomReducer
        const { payments, searchState } = this.props.paymentReducer
        const { classes } = this.props;

        let total = 0;

        return (

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="py-5 text-center">
                            {/*<h2>List of payments for {classroom && ` Classroom : Grade ${classroom.grade} Section ${classroom.section}`}</h2>*/}

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">

                                    <button onClick={this.props.history.goBack}
                                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                                    >⬅ Go back</button>








                                    <TableContainer component={Paper}>
                                        <div id="invoiceholder">
                                            <div id="invoice" className="effect2">

                                                <div id="invoice-top">
                                                    <div className="logo">
                                                        <img
                                                            src={logo}
                                                            alt="Logo">
                                                        </img>
                                                    </div>
                                                    {/*<div className="title">*/}
                                                    {/*    <h1>Invoice #<span*/}
                                                    {/*        className="invoiceVal invoice_num">tst-inv-23</span></h1>*/}
                                                    {/*    <p>Invoice Date: <span id="invoice_date">18 Sept 2020</span><br/>*/}
                                                    {/*        GL Date: <span id="gl_date">20 Sept 2020</span>*/}
                                                    {/*    </p>*/}
                                                    {/*</div>*/}

                                                </div>



                                                <div id="invoice-mid">
                                                    <div id="message">
                                                        <h2>Terminal Exam</h2>

                                                    </div>

                                                    <div className="clearfix">
                                                        <div className="col-left">
                                                            <div className="clientlogo"><img
                                                                src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png"
                                                                alt="Sup"/></div>
                                                            <div className="clientinfo">
                                                                <h2 id="supplier">You have to atten all the question</h2>
                                                                <p>The Timer will start since you click the start Button down</p>
                                                                <NavLink className = "navlink"
                                                                         to={{

                                                                             pathname: `/test/mcq`,
                                                                             data: {
                                                                             }
                                                                         }}>
                                                                    <Fab variant="extended" size="medium" color={'primary'} className={classes.testStart} >
                                                                        <HourglassEmptyIcon   className={classes.extendedIcon} />
                                                                        Start
                                                                    </Fab>
                                                                </NavLink>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>





                                            </div>

                                        </div>



                                    </TableContainer>







                                </div>
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
    classroomReducer: state.classroomReducer,
    paymentReducer: state.paymentReducer,
}))(withStyles(useStyles)(MCQFirstPage))
