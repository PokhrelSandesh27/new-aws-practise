import React, { Component } from 'react'
import { getExam, getExams } from '../../Exam/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { getClassroomById } from '../../../Home/actions'
import { searchStudent, searchStudentById } from '../../../Student/actions'
import { getExamDetailAwait, getExamDetails, getExamDetailsAwait } from '../../ExamDetails/actions'
import { getSubject } from '../../../Subject/actions'
import { searchMarkSheets } from '../actions'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Button from "@material-ui/core/Button";

class ListAllMarksheet extends Component {

    state = {
        localStore: [],
        type: null,
        addBy: this.props.match.params.type,
        addByType: this.props.match.params.typeId,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
    }

    async componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))

        const req = {}

        if (this.state.addBy === 'student') {
            // TODO Add Search for exam details when available
            await this.props.dispatch(getExamDetailsAwait())
            this.props.dispatch(searchStudentById(this.state.addByType))
            req.student = this.state.addByType

        } else if (this.state.addBy === 'subject') {
            this.props.dispatch(getExamDetailAwait(this.state.addByType)).then(
                examDetailReducer => {
                    if ((examDetailReducer.value || undefined) && examDetailReducer.value.request.status === 200) {
                        const examDetail = examDetailReducer.value.data
                        this.props.dispatch(getSubject(examDetail.subject))
                    }
                }
            )
            req.examDetail = this.state.addByType
        }
        // TODO Add filter for marksheet on the basis of current selected exam
        this.props.dispatch(searchMarkSheets(req))
    }
    print(){
        window.print();
    }

    render () {
        const { classes } = this.props;
        const { exam } = this.props.examReducer
        const { examDetails, examDetail, readAllState, createState } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer
        const { subject, getState: getSubjectState } = this.props.subjectReducer
        const { students, student, searchSingleState } = this.props.studentReducer
        const { markSheets } = this.props.markSheetReducer


        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <h2>Report Card</h2>
                <div className="py-5 text-center">


                <div className="row">
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div>
                                <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {
                                        `Classroom :${classroom.grade} ${classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Examination : ${exam.name}`
                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {
                                        this.state.addBy === 'student' && searchSingleState === 2 &&
                                        `Student : ${student.student.fullName}`
                                    }

                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {
                                        this.state.addBy === 'subject' && getSubjectState === 2 &&
                                        `subject : ${subject.name}`
                                    }

                                </Button>
                            </div>
                        </div>
                        <br></br>
                        <div>
                        <Button variant="outlined" style={{backgroundColor:"Lightgreen"}}
                        onClick={this.print}>
                            Print
                        </Button>
                        </div>
                        <br></br>

                            <table className="ReportTable">
                                <thead>
                                <tr>
                                    <td colSpan="3">Course</td>
                                    <td rowSpan="2"> Pr.FullMark/ Passmark</td>
                                    <td rowSpan="2"> Th. FullMark/passmark</td>
                                    <td colSpan="2">  Obtained Marks</td>
                                </tr>
                                <tr>

                                    <td colSpan="2">S.N</td>
                                    <td>Name</td>
                                    <td>Th.mark</td>
                                    <td> Pr. Mark</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    markSheets &&
                                    markSheets
                                        .map((mark, i) => {
                                            return (
                                                <tr>
                                                    <td>{i+1}</td>
                                                    <td colSpan="2">{(this.state.addBy === 'student') ? (examDetails.find(examDetail => examDetail._id === mark.examDetail._id).subject.name) : mark.student.fullName}</td>

                                                    <td> {mark.examDetail.theoryFullMarks}/{mark.examDetail.theoryPassMarks}</td>
                                                    <td> {mark.examDetail.pracFullMarks}/{mark.examDetail.pracPassMarks}</td>
                                                    <td>{mark.theoryMarks}</td>
                                                    <td>{mark.pracMarks}</td>
                                                </tr>

                                            )
                                        })
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="4" className="footer">Date</td>
                                    <td> {examDetail.date}</td>
                                    <td colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="footer">Duration</td>
                                    <td colSpan="3">
                                        {moment(examDetail.startTime, 'hmm').format('HH:mm')} - {moment(examDetail.endTime, 'hmm').format('HH:mm')}
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
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
}))(withStyles(useStyles)(ListAllMarksheet))
