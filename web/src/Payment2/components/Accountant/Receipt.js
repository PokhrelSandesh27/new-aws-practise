import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Container from '@material-ui/core/Container'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import logo from '../../../img/logo.svg'
import { toast } from 'react-toastify'
import ReceiptRow from './ReceiptRow'
import Modal from 'react-modal'
import { makeAPaymentAwait } from '../../actions'
import { get } from 'lodash'
import Button from '@material-ui/core/Button'
import moment from 'moment'

toast.configure()
Modal.setAppElement('#root')

export const customStyles = {
    overlay: {
        zIndex: 1203,
        backgroundColor: '#121212a1',
    },
    content: {
        top: '5%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        backgroundColor: '#E0FFFF',
        boxShadow: '0 4px 8px 0',
        color: 'ghostwhite',
        width: '90%',
    }
}

class Receipt extends React.Component {

    state = {
        isPaying: false,
        paid: false,
        reload: false
    }

    onPay = async () => {
        this.setState({ isPaying: true, paid: true })
        const { payments } = this.props
        for (const payment of payments) {
            const paymentReducer = await this.props.dispatch(makeAPaymentAwait(payment._id))
            const statusInfo = get(paymentReducer, 'value.request.status', get(paymentReducer, 'response.status'))
            if (statusInfo === 200) {
                const paymentData = paymentReducer.value.data
                if (paymentData.isPaid) {
                    toast.success('Paid')
                } else {
                    toast.error('An error occurred while paying.')
                }
            } else if (statusInfo === 400) {
                toast.warning(get(paymentReducer, 'response.data'))
            } else {
                toast.error(get(paymentReducer, 'response.data', 'An error occurred.'))
            }
        }

        this.setState({ isPaying: false, reload: true })

    }
    close = () => this.props.closeModal(this.state.reload)

    render () {
        const { classes } = this.props
        const { payments, user } = this.props
        const date = new Date()
        let total = 0
        return (
            <div style={{ zIndex: 1203 }}>
                <Modal
                    isOpen={true}
                    onRequestClose={this.close}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="Example Modal">
                    {/*<main className={classes.content}>*/}
                    {/*    <div className={classes.appBarSpacer}/>*/}
                    <Container maxWidth="lg" className={classes.container}>
                        <div className="page-content">
                            <div>
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
                                                <div className="title">
                                                    <h1>Invoice #<span
                                                        className="invoiceVal invoice_num">tst-inv-23</span></h1>
                                                    <p>Invoice Date: <span
                                                        id="invoice_date">{moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span><br/>
                                                        GL Date: <span id="gl_date">20 Sept 2020</span>
                                                    </p>
                                                </div>

                                            </div>


                                            <div id="invoice-mid">
                                                <div id="message">
                                                    <h2>Payment Receipt
                                                        for {`${user.student.fullName} of classroom ${user.classroom.grade} ${user.classroom.section}`}</h2>
                                                    <p>An invoice with invoice number #<span
                                                        id="invoice_num">tst-inv-23</span> is created for <span
                                                        id="supplier_name">EverestWalk Pvt.Ltd</span> which is 100%
                                                        matched
                                                        with PO .</p>
                                                </div>
                                                <div className="cta-group mobile-btn-group">
                                                    <a href="javascript:void(0);"
                                                       className="btn-primary">Print</a>

                                                </div>
                                                <div className="clearfix">
                                                    <div className="col-left">
                                                        <div className="clientlogo"><img
                                                            src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png"
                                                            alt="Sup"/></div>
                                                        <div className="clientinfo">
                                                            <h2 id="supplier">EverestWalk Pvt.Ltd</h2>
                                                            <p><span
                                                                id="address">Koteshower, 64</span><br></br><span
                                                                id="city">KATHAMNDU, NEPAL</span><br></br><span
                                                                id="country">IT</span> - <span
                                                                id="zip">44066</span><br></br><span
                                                                id="tax_num">555-555-5555</span><br></br></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-right">
                                                        <table className="table">
                                                            <tbody>

                                                            <tr>
                                                                <td colSpan="2"><span>Note</span>#<label
                                                                    id="note">None</label></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                            <div id="invoice-bot">

                                                <div id="table">
                                                    <table className="table-main">
                                                        <thead>
                                                        <tr className="tabletitle">
                                                            <th style={{ textAlign: 'center' }}>S.N.</th>

                                                            <th style={{ textAlign: 'center' }}> Date</th>

                                                            <th style={{ textAlign: 'center' }}> Description</th>

                                                            <th style={{ textAlign: 'right' }}>Amount</th>

                                                        </tr>
                                                        </thead>

                                                        {
                                                            payments &&
                                                            payments.map((payment, i) => {
                                                                total += payment.amount
                                                                return (
                                                                    <ReceiptRow key={payment._id}
                                                                                payment={payment}
                                                                                id={i += 1}/>
                                                                )
                                                            })}

                                                        <tr className="list-item total-row">
                                                            <th colSpan="9" className="tableitem">Grand Total</th>
                                                            <td data-label="Grand Total"
                                                                className="tableitem">{total}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <div className="cta-group" style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <Button variant="contained" color="primary"
                                                            disabled={this.state.isPaying}
                                                            onClick={this.print}>Print</Button>
                                                    <Button variant="contained" color="primary"
                                                            disabled={this.state.isPaying || this.state.paid}
                                                            onClick={this.onPay}>{this.state.isPaying ? 'Paying' : 'Pay'}</Button>
                                                    <Button variant="contained" color="primary"
                                                            disabled={this.state.isPaying}
                                                            onClick={this.close}>{this.state.isPaying || this.state.paid ? 'Close' : 'Cancel'}</Button>
                                                </div>
                                            </div>
                                            <footer>
                                                <div id="legalcopy" className="clearfix">
                                                    <p className="col-right">Our mailing address is:
                                                        <span className="email"><a
                                                            href="everestwalk123@gmail.com">everestwalk123@gmail.com</a></span>
                                                    </p>
                                                </div>
                                            </footer>
                                        </div>
                                    </div>
                                </TableContainer>
                            </div>
                        </div>
                    </Container>
                    {/*</main>*/}
                </Modal>
            </div>
        )
    }

}

export default connect(state => ({
    // paymentReducer: state.paymentReducer,
    // // paymentConfigurationReducer: state.paymentConfigurationReducer,
    // // scholarshipConfigurationReducer: state.scholarshipConfigurationReducer,
    // classroomReducer: state.classroomReducer,
    // studentReducer: state.studentReducer,
}))(withStyles(useStyles)(Receipt))
