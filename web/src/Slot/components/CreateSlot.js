import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import { addSlot } from '../action'
import MyInput from 'my-input-react'
import '../static/css/style.css'


class CreateSlot extends Component {

    state = {
        localStore: {},
        time: '10:00',
        date: new Date(),
        formatDate: '',
        formatTime: ''
    }

    onTimeChange (time) {
        console.log('log time changed', time)
        const formatTime = time.format('hh:mm a')

        this.setState({ formatTime, time })
    }

    onDateChange (date) {
        console.log('log date changed', date)
        const formatDate = moment(date).format('DD/MM/YYYY')

        this.setState({ formatDate, date })
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value
        this.setState({ localStore })
    }

    date = event => {
        const localStore = { ...this.state.localStore }
        localStore.date = event.target.value
        this.setState({ localStore })

    }


    createSlot () {
        const { localStore, formatDate, formatTime } = this.state // reading from the state ( by ref )
        const dateTime = `${formatDate} ${formatTime}`
        const timeInMilliSec = moment(dateTime, 'DD/MM/YYYY hh:mm a').valueOf()
        localStore.startTime = timeInMilliSec
        localStore.endTime = timeInMilliSec
        this.props.dispatch(addSlot(localStore))
        this.props.history.push('/slot/list')
    }

    render () {
        const {  addState } = this.props.slotReducer


        return (
            <div className="mainContent">
                <div className="py-5 text-center">
                    <h2>Creating Schedule</h2>
                    <p className="lead">Please enter all the details to create slots.</p>
                </div>


                {
                    <div className="form">

                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%'
                        }}>
                            <h4 className="mb-3">
                                <u>Details for creating Slot</u>
                            </h4>
                            <br/>
                            <label htmlFor="name">Name</label>
                            <div>
                                <div className="col-3" style={{display:"flex" , marginLeft:"2%"}}>
                                    <MyInput
                                        me='name'
                                        handler={this.handler.bind(this)}
                                        placeHolder='Enter Name'
                                        className="form-control mb-3"/>
                                </div>

                            </div>
                            <label htmlFor="startTime">StartTime</label>

                            <div className="row" style={{
                                display: 'flex'}}>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onDateChange.bind(this)}
                                />
                                <TimePicker showSecond={false} use12Hours={true}
                                            onChange={this.onTimeChange.bind(this)}/>
                            </div>
                            <label htmlFor="endTime">EndTime</label>
                            <div className="row" style={{
                                display: 'flex'}}>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onDateChange.bind(this)}
                                />
                                <TimePicker showSecond={false} use12Hours={true}
                                            onChange={this.onTimeChange.bind(this)}/>
                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-block mb-4"
                                type="submit"
                                onClick={this.createSlot.bind(this)}>
                                Create
                            </button>
                            <button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</button>
                            <hr className="mb-4"/>
                        </div>
                    </div>
                }

                {
                    addState === 2 &&
                    <div>
                        <div>Scheduled Fixed successfully</div>

                    </div>
                }

            </div>
        )
    }
}

export default connect(state => ({
    slotReducer:state.slotReducer
}))
(CreateSlot)
