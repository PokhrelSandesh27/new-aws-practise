import React, { Component } from 'react'
import { createReceiptAwait } from '../actions'
import { makeAPaymentAwait} from '../actions'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Redirect } from 'react-router-dom'
import { getPaymentCategories } from '../../utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YearMonthPicker from 'react-year-month-picker'
import Modal from 'react-modal'
import { searchPayments } from '../../Payment/actions'

toast.configure()
Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: '25%',
        backgroundImage: 'linear-gradient(-180deg, #808080,#778899, #F0F8FF)',
        color: 'ghostwhite'
    }
}

class PaymentModal extends Component {

    paidStatus = ['UnPaid', 'Paid']

    date = new Date()

    onCompletion = this.props.onCompletion

    state = {
        isDisabled: false,
        localStore: {
            'year': new Date().getFullYear(),
            'month': new Date().getMonth() + 1,
        },
    }

    componentDidMount () {
        // const stud = get(this.props.student, 'student._id')
        // const req = {...this.state.localStore, student:stud}
        const req2 = { ...this.state.localStore, student:get(this.props.student,'student._id')}
        console.log(req2)
    }

    payBill () {

        //const req = {user:this.props.receipt._id }
        console.log("reqForPayment", this.props.receipt._id)
        // this.props.dispatch(makeAPaymentAwait(req))
        //     .then((res => {
        //
        //     }
        // ))
//=====================================================================

        this.props.dispatch(makeAPaymentAwait(this.props.receipt._id)).then((res => {
                if ((res.value || undefined) && res.value.request.status === 200) {
                    toast.success('Created')
                    this.onCompletion(true)
                } else {
                    toast.error('An error has occurred')
                }
                this.setState({ isDisabled: false })

            }
        ))
    }

    render () {
        const { payments } = this.props.paymentReducer
        // const student = get(this.props.student, 'student._id')
        // const studentName = get(this.props.student, 'student.fullName')
        const month = get(this.props.date, 'month')
        const year = get(this.props.date, 'year')
        const receipt =get(this.props.receipt,'_id')
        console.log("receipt", receipt)


        return (
            <Modal
                isOpen={this.props.isHidden}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => this.onCompletion(false)}
                style={customStyles}
                contentLabel="Receipt Generate"
            >

                <h2 style={{ textAlign: 'center' }}>Making Payments for {year}/{month}</h2>
                <div className="">
                    <div className="col-md-8 order-md-2" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginLeft: '10%'
                        // width: '70%'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: '15%'
                        }}>
                            <button
                                className="btn btn-primary btn-lg btn-block mb-4"
                                type="submit"
                                style={{ marginLeft: '2%' }}
                                disabled={this.state.isDisabled}
                                onClick={this.payBill.bind(this)}>
                                Pay
                            </button>
                            <button
                                className=""
                                style={{ marginLeft: '20%', backgroundColor: 'dimgrey' }}
                                type="submit"
                                disabled={this.state.isDisabled}
                                onClick={() => this.onCompletion(false)
                                }>
                                Cancel
                            </button>

                        </div>
                        <br/> <br/>

                        <hr className="mb-4"/>
                    </div>
                </div>

            </Modal>
        )
    }
}

export default connect(state => ({
    receiptReducer: state.receiptReducer,
    paymentReducer: state.paymentReducer,
}))(PaymentModal)
