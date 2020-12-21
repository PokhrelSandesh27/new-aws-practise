import React, { Component } from 'react'
import MyInput from 'my-input-react'
import { createPayment, createPaymentAwait } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getClassroomById } from '../../Home/actions'
import { getPaymentCategories } from '../../utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

toast.configure()

class CreatePayment extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        localStore: {
            classroom: this.props.match.params.classroom
        },
    }

    componentDidMount () {
        const { classroom } = { ...this.state.localStore }
        this.props.dispatch(getClassroomById(classroom))
    }

    createPayment () {
        const { localStore: req } = this.state
        this.props.dispatch(createPaymentAwait(req)).then(res => {
            // this.props.dispatch({ type: 'GENERATE_RECEIPTS' })
            if ((res.value || undefined) && res.value.request.status === 200) {
                this.setState({
                    redirect: true
                })
                toast.success(`Payment '${res.value.data.category}' created`)
            } else {
                this.setState({
                    isDisabled: false
                })
                toast.error('An error has occurred')
            }

        })
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value
        this.setState({ localStore })
    }

    selectChanged = event => {
        const value = event.target.value
        const name = event.target.id
        this.handler(name, value)
    }

    render () {

        const { createState } = this.props.paymentReducer
        const { classroom } = this.props.classroomReducer
        const { classes } = this.props;

        let msg

        if (createState === 1)
            msg = 'Creating Payment'
        else
            msg = 'Create Payment'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/payment/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
           
                <div className="page-content">
                    <h2>Creating Payment
                        for {classroom && ` Classroom : Grade ${classroom.grade} Section ${classroom.section}`}</h2>
                    <button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</button>
                    <div className="urpForm">
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%',
                            marginLeft:"7%"
                        }}>

                            <h4 className="mb-3">
                                <label className="urpLabel">Info for creating Payment</label>
                            </h4>
                            <br/>

                            <label htmlFor="category" style={{fontSize:"18px", color:"dimgrey"}}>Category</label>
                            <select name="category" id="category" className="urpSelect"
                                    onChange={this.selectChanged}>
                                <option value={null} disabled selected>Please select a category</option>
                                {
                                    getPaymentCategories().map((category) => {
                                        return (
                                            <option value={category}> {category}</option>
                                        )
                                    })
                                }
                            </select>

                            <label htmlFor="amount" style={{fontSize:"18px", color:"dimgrey"}} >Enter Amount</label>
                            <MyInput
                                me='amount'
                                handler={this.handler.bind(this)}
                                placeHolder='Enter Amount'
                                className="urpInput"/>


                            <Button
                                variant="contained"
                                color="primary"
                                style={{marginTop:'1%'}}
                                type="submit"
                                disabled={this.state.isDisabled}
                                onClick={this.createPayment.bind(this)}>
                                {msg}
                            </Button>


                         
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
}))(withStyles(useStyles)(CreatePayment))
