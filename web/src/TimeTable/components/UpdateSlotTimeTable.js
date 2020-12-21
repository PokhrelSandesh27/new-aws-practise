import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../static/css/style.css'
import MyInput from 'my-input-react'
import { getAllClassroom } from '../../Home/actions'
import { getAllUsers } from '../../User/actions'
import { getAllSlot } from '../../Slot/action'
import { connect } from 'react-redux'
import { getArr, getGroups, getUser } from '../../utils'
import { addTimeTable, getTimeTableById, searchTimeTable } from '../action'
import { getAllSubjects } from '../../Subject/actions'
import { getMeetingById } from '../../Meeting/actions'

class UpdateSlotTimeTable extends Component {

    state = {
        localStore: {},
        classroomId: null,
        slotId: null,
        subjectId:null,
        teacherId: null

    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value
        this.setState({ localStore })
    }

    componentDidMount () {
        this.props.dispatch(getAllClassroom())
        this.props.dispatch(getAllSlot())
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(getAllUsers())
        const id = this.props.match.params.id
        console.log("key", id)
        this.props.dispatch(getTimeTableById(id))
    }

    classroomChanged = event => {
        const localStore = { ...this.state.localStore }
        localStore.classroom = event.target.value

        this.setState({ localStore })
    }
    subjectChanged = event => {
        const localStore = { ...this.state.localStore }
        localStore.subject = event.target.value

        this.setState({ localStore })
    }

    slotChanged = event => {
        const localStore = { ...this.state.localStore }
        localStore.slot = event.target.value

        this.setState({ localStore })
    }
    teacherChanged = event => {
        const localStore = { ...this.state.localStore }
        localStore.teacher = event.target.value
        this.setState({ localStore })
    }
    dayChanged = event => {
        const localStore = { ...this.state.localStore }
        localStore.day = event.target.value

        this.setState({ localStore })
    }

    createTimeTable () {
        // const body = {
        //     classroom: this.props.match.params.id
        // }
        const { localStore } = this.state
        this.props.dispatch(addTimeTable(localStore))
    }

    render () {
        const { timetable, fetchState } = this.props.timetableReducer
        const { classrooms, fetchState: classroomFetchState } = this.props.classroomReducer
        const { slots, fetchState: slotFetchState } = this.props.slotReducer
        const {subjects, fetchState:subjectFetchState}= this.props.subjectReducer
        const { addState } = this.props.timetableReducer
        const { users } = this.props.userReducer

        const teachers = users.filter(user => user.groups.includes('TEACHER'))

        return (
            <div className="page-content">
                <div className="py-5 text-center">

                    <h2>Creating TimeTable</h2>
                    <p className="lead">Please enter all the details to create TimeTable.</p>
                </div>


                {
                    classroomFetchState === 2 &&
                    slotFetchState === 2 &&
                    <div className="form">

                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%'
                        }}>
                            <h4 className="mb-3">
                                <u>Details for creating Timetable</u>
                            </h4>
                            <br/>

                            <label htmlFor="teacher">Teacher</label>
                            <div>
                                <div className="row">
                                    <div className="col-6">
                                        <select name="teacher" id="teacher" className="form-control custom-select"
                                                onChange={this.teacherChanged}>
                                            <option value={null} disabled selected>Please select a Teacher</option>
                                            {
                                                teachers.map((user) => {
                                                    return (
                                                        <option value={user._id}>
                                                            {user.fullName}

                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <label htmlFor="slot">Slots</label>
                            <div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="description">slots</label>
                                            {timetable.slot.name}

                                    </div>
                                </div>

                            </div>
                            <label htmlFor="day">day</label>
                            <div>
                                <div className="row">
                                    <div className="col-6">
                                        <select name="day" id="day" className="form-control custom-select"
                                                onChange={this.dayChanged}>
                                            <option value="null" disabled selected>Please select a slot</option>
                                            <option value="Sunday">Sunday</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <label htmlFor="subject">Subject</label>
                            <div>

                                <div className="col-6">
                                    <select name="subject" id="subject" className="form-control custom-select"
                                            onChange={this.subjectChanged}>
                                        <option value={null} disabled selected>Please select a subject</option>
                                        {
                                            subjects.map((subject) => {
                                                return (
                                                    <option value={subject._id}>
                                                        {subject.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-block mb-4"
                                type="submit"
                                onClick={this.createTimeTable.bind(this)}>
                                Create
                            </button>

                            <hr className="mb-4"/>
                        </div>
                    </div>
                }
                <button onClick={this.props.history.goBack}
                        style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                >⬅ Go back</button>

                {
                    (classroomFetchState === 1 || slotFetchState === 1) &&
                    <div>Please wait, Preparing create page ...</div>
                }
                {
                    addState === 2 &&
                    <div>
                        <div>Meeting Scheduled Fixed successfully</div>
                        {/*<NavLink to='/Timetable/list'>Go to view </NavLink>*/}
                    </div>
                }

            </div>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    slotReducer: state.slotReducer,
    subjectReducer: state.subjectReducer,
    userReducer: state.userReducer,
    timetableReducer: state.timetableReducer

}))
(UpdateSlotTimeTable)
