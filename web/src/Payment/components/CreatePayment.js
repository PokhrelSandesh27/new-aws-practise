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
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'

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
const {classes}= this.props
        const { createState } = this.props.paymentReducer
        const { classroom } = this.props.classroomReducer

        let msg

        if (createState === 1)
            msg = 'Creating Payment'
        else
            msg = 'Create Payment'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/payments/list',
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
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>
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


                            <button
                                className=""
                                style={{marginTop:"1%",marginLeft: "1%", backgroundColor:"dimgrey"}}
                                type="submit"
                                disabled={this.state.isDisabled}
                                onClick={this.createPayment.bind(this)}>
                                {msg}
                            </button>


                            <hr className="mb-4"/>
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
}))(withStyles(useStyles)(CreatePayment))
