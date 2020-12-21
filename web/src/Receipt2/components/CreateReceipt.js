import React, { Component } from 'react'
import { createReceiptAwait } from '../actions'
import { connect } from 'react-redux'
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
        color:'ghostwhite'
    }
}

class CreateReceipt extends Component {

    paidStatus = ['UnPaid', 'Paid']

    date = new Date()

    onCompletion = this.props.onCompletion

    state = {
        isDisabled: false,
        localStore: {
            'year': new Date().getFullYear(),
            'month': new Date().getMonth() + 1,
            'isPaid': false,
        },
    }

    componentDidMount () {
        this.props.dispatch(searchPayments({
            classroom: this.props.classroom
        }))
    }

    createReceipt () {

        const req = { ...this.state.localStore, user: this.props.student }

        this.setState({ isDisabled: true })
        this.props.dispatch(createReceiptAwait(req)).then((res => {
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

    dateChanged (date) {
        const dateObj = date._d
        const localStore = { ...this.state.localStore }
        localStore['year'] = dateObj.getFullYear()
        localStore['month'] = dateObj.getMonth() + 1
        this.setState({ localStore })
    }

    render () {
        const { createState } = this.props.receiptReducer
        const { payments } = this.props.paymentReducer
        let msg
        if (createState === 2 && this.state.isDisabled)
            msg = 'Creating Receipt'
        else {
            msg = 'Create Receipt'
        }
        return (
            <Modal
                isOpen={this.props.isHidden}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => this.onCompletion(false)}
                style={customStyles}
                contentLabel="Receipt Generate"
            >

                <h2 style={{textAlign:'center'}}>Create Receipt</h2>
                <div className="">
                    <div className="col-md-8 order-md-2" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginLeft:"10%"
                        // width: '70%'
                    }}>
                        <label htmlFor="payment">Payment Type</label>
                        <select name="payment" id="payment" className="urpSelect"
                                onChange={this.selectChanged}>
                            <option value={null} disabled selected>Please select a payment type</option>
                            {
                                payments.map((payment) => {
                                    return (
                                        <option value={payment._id}> {payment.category}&nbsp;({payment.amount})</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="isPaid">Is it already paid</label>
                        <select name="isPaid" id="isPaid" className="urpSelect"
                                value={this.state.localStore.isPaid}
                                onChange={this.selectChanged}>
                            {
                                this.paidStatus.map((paid, i) => {
                                    return (
                                        <option value={!!i}> {paid}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="dateSelector">Select Month and Year</label>
                        <YearMonthPicker
                            id="dateSelector"
                            className="urpInput"
                            defaultYear={this.date.getFullYear()}
                            defaultMonth={this.date.getMonth() + 1}
                            minYear={this.date.getFullYear()}
                            maxYear={this.date.getFullYear() + 100}
                            closeOnSelect
                            onChange={this.dateChanged.bind(this)}
                        />

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center'
                        }}>
                            <button
                                className="btn btn-primary btn-lg btn-block mb-4"
                                type="submit"
                                style={{marginLeft:"2%"}}
                                disabled={this.state.isDisabled}
                                onClick={this.createReceipt.bind(this)}>
                                {msg}
                            </button>
                            <button
                                className=""
                                style={{marginLeft:"20%", backgroundColor: "dimgrey"}}
                                type="submit"
                                disabled={this.state.isDisabled}
                                onClick={() => this.onCompletion(false)
                                }>
                                Cancel
                            </button>
                        </div>
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
}))(CreateReceipt)
