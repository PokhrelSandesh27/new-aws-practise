import React, { Component  } from 'react'
import Jitsi from 'react-jitsi'
import { connect } from 'react-redux'
import { getMeetingById } from '../actions'
import '../static/css/style.css'
import { getUser } from '../../utils'




class test extends Component {
    state = {
        roomName: '',
        userName: ''
    }
    componentDidMount () {
        console.log('this.props', this.props.match.params.id)
        const id = this.props.match.params.id

        this.props.dispatch(getMeetingById(id))
    }

    // date = event => {
    //     const [roomName, setRoom] = State('')
    //     const [userFullName, setName] = State('')
    //     const [call, setCall] = State(false)
    //     const handleClick = event => {
    //         event.preventDefault()
    //         if (roomName && userFullName) setCall(true)
    //     }
    // }
    render () {

        const { meeting, fetchState } = this.props.meetingReducer
        const  { roomName}= this.state

        console.log('log meeting', {meeting})
        console.log('link', meeting.link)

        return (
            <div className="mainContent">
                <div className="py-5 text-center">
                   
                    <h2>Details the meetings.</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dev-table-filter"
                                    data-action="filter"
                                    data-filters="#dev-table"
                                    placeholder="Search Meeting"
                                />
                            </div>
                            <br/> <br/>
                            <Jitsi
                                roomName={`roomName= ${meeting.link}`}  displayName={getUser().fullName}
                                frameStyle={{display:'block'}}
                            />
                            <div className="row">
                                {fetchState === 1 && <div> Details loading...</div>}
                                <div className="col-md-2 order-md-1 mb-2 " style={{ position: 'absolute' }}></div>




                                <div className="row">
                                    {
                                        fetchState === 2 &&
                                        <dl>

                                            <dd className="col-1 ">
                                                CLASSROOM
                                            </dd>
                                            <dt className="col-2 ">
                                                {meeting.classroom.grade}{meeting.classroom.section}
                                            </dt>
                                            <dd className="col-1 ">TEACHER</dd>
                                            <dt className="col-2 ">
                                                {meeting.teacher.fullName}
                                            </dt>
                                            <dd className="col-1 ">SUBJECT</dd>
                                            <dt className="col-2 ">
                                                {meeting.lecture.subject}
                                            </dt>
                                            <dd className="col-1 ">DATE</dd>
                                            <dt className="col-2 ">

                                                {new Date(meeting.startTime).toLocaleDateString()}
                                            </dt>

                                            <dd className="col-1 ">START TIME</dd>
                                            <dt className="col-2 ">

                                                {new Date(meeting.startTime).toLocaleTimeString()}

                                            </dt>


                                        </dl>
                                    }
                                    <div className="row">

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect(state => ({
    meetingReducer: state.meetingReducer
}))(test)

