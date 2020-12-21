import React, { Component } from 'react'
import { getExam, getExams } from '../../Exam/actions'
import { createExamReport } from '../actions'
import { getClassroomById } from '../../../Home/actions'
import { getAllSubjects, getSubject } from '../../../Subject/actions'
import { getAllUsers } from '../../../User/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getUser } from '../../../utils'
import { NavLink, Redirect } from 'react-router-dom'
import MyInput from 'my-input-react'
import DatePicker from 'react-datepicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { getStudentById, searchStudent, searchStudentById } from '../../../Student/actions'
import { getExamDetail, getExamDetailAwait, getExamDetails } from '../../ExamDetails/actions'
import { findIndex } from 'lodash'
import { searchMarkSheets } from '../../MarkSheet/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'

toast.configure()

class CreateExamReport extends Component {

    state = {
        localStore: {
            totalMarks: 0
        },
        type: null,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
        student: this.props.match.params.student,
        isDisabled: false,
        toRedirect: false,
    }

    totalMarks = 0

    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(searchStudentById(this.state.student))
        // TODO Replace this when search is available
        this.props.dispatch(getExamDetails())
        this.props.dispatch(searchMarkSheets({/*exam: this.state.exam, */ student: this.state.student }))

    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        // console.log(prevProps)
    }

    async createExamReport () {
        this.setState({ isDisabled: true })
        // "exam": "5f267e1e24b5ab26cc63ff97",
        //     "student": "5f16e39ce90c0a3ce036206a",
        //     "totalMarks": 430,
        //     "result": "PASS",
        //     "remarks": "Outstanding",
        //     "gpa": 3.45
        const req = { ...this.state.localStore, exam: this.state.exam, student: this.state.student, totalMarks: this.totalMarks }
        const createExamReportReducer = await this.props.dispatch(createExamReport(req))
        if ((createExamReportReducer.value || undefined) && createExamReportReducer.value.request.status === 200) {
            const examReport = createExamReportReducer.value.data
            toast.success(`Exam Report Created.`)
            this.setState({ toRedirect: true })
        }

    }

    updateMarks () {
        if (this.totalMarks > 0) {
            const { localStore } = this.state
            localStore.totalMarks = this.totalMarks
            this.totalMarks = -1
            this.setState({ localStore })
        }
        return  true;
    }

    render () {
        const { classes } = this.props;
        const { exam } = this.props.examReducer
        const { examDetails, examDetail, readAllState: examDetailsState, createState } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer
        const { subject, getState: getSubjectState } = this.props.subjectReducer
        const { students, student, searchSingleState } = this.props.studentReducer
        const { markSheets } = this.props.markSheetReducer

        if (this.state.isDisabled && this.state.toRedirect) {
            return (<Redirect to={{
                    pathname: `/examreport/${this.state.type}/exam/${this.state.exam}/classroom/${this.state.classroom}`,
                    msg: 'Report created'
                }}/>
            )
        }
        this.totalMarks = 0

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <div className="py-5 text-center">
                    <h2>Create Exam Report</h2>
                    <div>Classroom: {`${classroom.grade} ${classroom.section} `}</div>
                    <div>Examination: {`${exam.name}`}</div>
                    <div>Student: {searchSingleState === 2 && `${student.student.fullName}`}</div>
                    {/*<p className="lead">*/}
                    {/*    Type the keyword to search for specific exam details below.*/}
                    {/*</p>*/}
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</button>



                            <table className="assingmentTable" id="dev-table">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Subject</th>
                                    <th>(Practical) FM/PM</th>
                                    <th>(Theory) FM/PM</th>
                                    <th>OM (Pra)</th>
                                    <th>OM (The)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    markSheets && examDetailsState === 2 &&
                                    markSheets
                                        .map((mark, i) => {
                                            this.totalMarks += mark.theoryMarks + mark.pracMarks
                                            return (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{(examDetails.find(examDetail => examDetail._id === mark.examDetail._id).subject.name)}</td>
                                                    <td>{mark.examDetail.theoryFullMarks}/{mark.examDetail.theoryPassMarks}</td>
                                                    <td>{mark.examDetail.pracFullMarks}/{mark.examDetail.pracPassMarks}</td>
                                                    <td>{mark.theoryMarks}</td>
                                                    <td>{mark.pracMarks}</td>
                                                </tr>
                                            )
                                        })
                                }
                                </tbody>
                            </table>

                            <div className="form">
                                <div className="col-md-8 order-md-2" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '70%'
                                }}>
                                    <label htmlFor="totalMarks">Total Marks</label>
                                    <input
                                        id='totalMarks'
                                        placeholder='Total Marks'
                                        className="form-control mb-3"
                                        value={this.totalMarks}
                                        disabled
                                    />

                                    <label htmlFor="result">Result</label>
                                    <MyInput
                                        me='result'
                                        handler={this.handler.bind(this)}
                                        placeHolder='Result'
                                        className="form-control mb-3"/>

                                    <label htmlFor="remarks">Remarks</label>
                                    <MyInput
                                        me='remarks'
                                        handler={this.handler.bind(this)}
                                        placeHolder='Remarks'
                                        className="form-control mb-3"/>

                                    <label htmlFor="gpa">GPA</label>
                                    <MyInput
                                        me='gpa'
                                        handler={this.handler.bind(this)}
                                        placeHolder='GPA'
                                        className="form-control mb-3"/>


                                    <button
                                        className="btn btn-primary btn-lg btn-block mb-4 form-control"
                                        type="submit"
                                        disabled={this.state.isDisabled}
                                        onClick={this.createExamReport.bind(this)}>
                                        {this.state.isDisabled ? 'Adding' : 'Add'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    examReducer: state.examReducer,
    examDetailsReducer: state.examDetailsReducer,
    classroomReducer: state.classroomReducer,
    subjectReducer: state.subjectReducer,
    userReducer: state.userReducer,
    studentReducer: state.studentReducer,
    markSheetReducer: state.markSheetReducer,
}))(withStyles(useStyles)(CreateExamReport))
