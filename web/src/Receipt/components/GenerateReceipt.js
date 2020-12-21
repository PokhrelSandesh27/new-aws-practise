import React, { Component } from 'react'
import { generateReceipts, generateReceiptsAwait } from '../actions'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Redirect } from 'react-router-dom'
import { getClassroomById } from '../../Home/actions'
import { getPaymentCategories } from '../../utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YearMonthPicker from 'react-year-month-picker'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'

toast.configure()
class GenerateReceipt extends Component {

    date = new Date()

    state = {
        redirect: false,
        isDisabled: false,
        localStore: {
            'year': new Date().getFullYear(),
            'month': new Date().getMonth() + 1
        },
    }

    generateReceipt () {
        const { localStore: req } = this.state
        this.setState({ isDisabled: true })
        this.props.dispatch(generateReceiptsAwait(req)).then((res => {
                // this.props.dispatch({ type: 'GENERATE_RECEIPTS' })
                if ((res.value || undefined) && res.value.request.status === 200) {
                    this.setState({
                        redirect: true
                    })
                    toast.success(res.value.data)
                } else {
                    this.setState({
                        isDisabled: false
                    })
                    toast.error('An error has occurred')
                }
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
        const { classes } = this.props;
        const { generateMsg, generateState } = this.props.receiptReducer
        let msg
        if (generateState === 2 && this.state.isDisabled)
            msg = 'Generating Receipt'
        else {
            msg = 'Generate Receipt'
        }

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/receipts/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                <div className="page-content">
                    <h2>Generate receipts</h2>
                    <div className="urpForm">
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%', marginLeft:"7%"
                        }}>
                            <button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</button>
                            <label className="urpLabel">
                                <u>Info for generating receipt</u>
                            </label>
                            <br/>

                            <label htmlFor="category" style={{fontSize:"18px", color: "dimgrey"}}>Category</label>
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

                            <label htmlFor="dateSelector" style={{fontSize:"18px", color: "dimgrey"}}>Select Month and Year</label>
                            <YearMonthPicker
                                className="urpInput"
                                id="dateSelector"
                                defaultYear={this.date.getFullYear()}
                                defaultMonth={this.date.getMonth() + 1}
                                minYear={this.date.getFullYear()}
                                maxYear={this.date.getFullYear() + 100}
                                closeOnSelect
                                onChange={this.dateChanged.bind(this)}
                            />

                            <button
                                className=""
                                style={{marginLeft:"1%",backgroundColor:"dimgrey" , width:"20%"}}
                                type="submit"
                                disabled={this.state.isDisabled}
                                onClick={this.generateReceipt.bind(this)}>
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
    receiptReducer: state.receiptReducer,
    // classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(GenerateReceipt))
