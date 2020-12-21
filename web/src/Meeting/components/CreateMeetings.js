// import React, { Component } from 'react'
// import MyInput from 'my-input-react'
// import { addMeeting } from '../actions'
// import DateTime from 'react-datetime'
// import { getUser } from '../../utils'
// import { getAllClassroom } from '../../Classroom/actions'
// import { getAllSubjects } from '../../Subject/actions'
// import { connect } from 'react-redux'
// import moment from 'moment'
// import "../static/css/style.css"

// class CreateMeetings extends Component {

//     state = {
//         localStore: {},
//         date : moment(),
//         classroomId: null,
//         subjectId: null

//     } // ome min chilli ok anna

//     handler (me, value) {
//         const localStore = { ...this.state.localStore }
//         localStore[me] = value
//         this.setState({ localStore })
//     }
//     // handleChange(date) {
//     //     this.setState({
//     //         startDate: date
//     //     })
//     // }

//     componentDidMount () {
//         this.props.dispatch(getAllClassroom())
//         this.props.dispatch(getAllSubjects())
//     }
//     date = event =>{
//         const localStore = {...this.state.localStore}
//         localStore.date = event.target.value
//         this.setState({localStore})
//     }

//     classroomChanged = event => {
//         const localStore = { ...this.state.localStore }
//         localStore.classroom = event.target.value

//         this.setState({ localStore })
//     }

//     subjectChanged = event => {
//         const localStore = { ...this.state.localStore }
//         localStore.subject = event.target.value

//         this.setState({ localStore })
//     }

//     createMeeting () {
//         const { localStore } = this.state// reading from the state ( by ref )
//         localStore.teacher = getUser()._id
//         this.props.dispatch(addMeeting(localStore))
//     }

//     render () {
//         const { classrooms, fetchState: classroomFetchState } = this.props.classroomReducer
//         const { subjects, fetchState: subjectFetchState } = this.props.subjectReducer

//         return (
//             <div className="mainContent">
//                 <div className="py-5 text-center">
//                     <img
//                         className="d-block mx-auto mb-4"
//                         src="http://www.resetyourbody.com/wp-content/uploads/COMPANY_LOGO/logo-default.png"
//                         alt=""
//                         width="72"
//                         height="72"
//                     />
//                     <h2>Creating Meeting</h2>
//                     <p className="lead">Please enter all the details to create meeting.</p>
//                 </div>


//                 {
//                     classroomFetchState === 2 &&
//                     subjectFetchState === 2 &&
//                     <div className="form">

//                         <div className="col-md-8 order-md-2"  style={{display:"flex" ,justifyContent: "center" ,flexDirection:"column",width: "70%"}}>
//                             <h4 className="mb-3">
//                                 <u>Details for creating Meeting</u>
//                             </h4>
//                             <br/>
//                             <label htmlFor="classroom">classroom</label>
//                             <div>

//                                     <div className="col-6">
//                                         <select name="classroom" id="classroom" className="form-control custom-select"
//                                                 onChange={this.classroomChanged}>
//                                             <option value={null} disabled selected>Please select a classroom</option>
//                                             {
//                                                 classrooms.map((classroom) => {
//                                                     return (
//                                                         <option value={classroom._id}>
//                                                             Class: {classroom.grade},
//                                                             Section: {classroom.section}
//                                                         </option>
//                                                     )
//                                                 })
//                                             }
//                                         </select>
//                                     </div>


//                             </div>
//                             <label htmlFor="subject">Subject</label>
//                             <div>
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <select name="subject" id="subject" className="form-control custom-select"
//                                                 onChange={this.subjectChanged}>
//                                             <option value={null} disabled selected>Please select a subject</option>
//                                             {
//                                                 subjects.map((subject) => {
//                                                     return (
//                                                         <option value={subject._id}>
//                                                            {subject.subject}
//                                                         </option>
//                                                     )
//                                                 })
//                                             }
//                                         </select>
//                                     </div>
//                                 </div>

//                             </div>
//                             <label htmlFor="scheduleinfo">Schedule</label>
//                             <DateTime

//                                 me='scheduleinfo'
//                                 handler={this.handler.bind(this)}
//                                 placeholder="DD/MM/YYYY"
//                                 format="DD/MM/YYYY"
//                                 className="form-control mb-3"/>

//                             <label htmlFor="meetinglink">Meeting Link</label>
//                             <MyInput
//                                 me='meetinglink'
//                                 handler={this.handler.bind(this)}
//                                 placeHolder='Meeting link'
//                                 className="form-control mb-3"/>

//                             <button
//                                 className="btn btn-primary btn-lg btn-block mb-4"
//                                 type="submit"
//                                 onClick={this.createMeeting.bind(this)}>
//                                 Create
//                             </button>

//                             <hr className="mb-4"/>
//                         </div>
//                     </div>
//                 }

//                 {
//                     (classroomFetchState === 1 || subjectFetchState === 1) &&
//                     <div>Please wait, Preparing create page ...</div>
//                 }

//             </div>
//         )
//     }
// }

// export default connect(state => ({
//     classroomReducer: state.classroomReducer,
//     subjectReducer: state.subjectReducer,
//     MeetingReducer: state.MeetingReducer
// }))
// (CreateMeetings)
