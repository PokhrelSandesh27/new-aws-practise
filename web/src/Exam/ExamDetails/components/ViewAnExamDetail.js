import React, { Component } from 'react'
import { getExamDetailAwait } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getExam } from '../../Exam/actions'
import { getUserById } from '../../../User/actions'
import { getClassroomById } from '../../../Home/actions'
import { getSubject } from '../../../Subject/actions'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'

class ViewAnExamDetail extends Component {

    async componentDidMount () {
        const examReducer = await this.props.dispatch(getExamDetailAwait(this.props.match.params.id))
        if ((examReducer.value || undefined) && examReducer.value.request.status === 200) {
            const exam = examReducer.value.data
            this.props.dispatch(getExam(exam.exam))
            this.props.dispatch(getClassroomById(exam.classroom))
            this.props.dispatch(getSubject(exam.subject))
            // this.props.dispatch(getUserById(exam.invigilator))
            // this.props.dispatch(getUserById(exam.grader))
            // this.props.dispatch(getUserById(exam.examiner))
        }
    }

    render () {
        const { classes } = this.props;
        const { examDetail, readState } = this.props.examDetailsReducer
        const { exam } = this.props.examReducer
        const { classroom } = this.props.classroomReducer
        const { subject } = this.props.subjectReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <h2>Report Detail</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</button>

                            <table className="ReportTable">
                                <thead>
                                <tr>
                                    <td colSpan="3">Course</td>
                                    <td rowSpan="2"> Pr.FullMark</td>
                                    <td rowSpan="2"> Th. FullMark</td>
                                    <td colSpan="2"> Pass Marks</td>
                                </tr>
                                <tr>
                                    <td>Examination Type</td>
                                    <td colSpan="2"> Subject</td>

                                    <td>Th. Passmark</td>
                                    <td> Pr. PassMark</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{exam.name}</td>
                                    <td colSpan="2">{subject.name}</td>
                                    <td> {examDetail.theoryFullMarks}</td>
                                    <td> {examDetail.pracFullMarks}</td>
                                    <td>{examDetail.theoryPassMarks}</td>
                                    <td>{examDetail.pracPassMarks}</td>


                                </tr>

                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="4" className="footer">Date</td>
                                    <td> {examDetail.date}</td>
                                    <td colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="footer">Time Given</td>
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
    examDetailsReducer: state.examDetailsReducer,
    examReducer: state.examReducer,
    classroomReducer: state.classroomReducer,
    subjectReducer: state.subjectReducer,
}))(withStyles(useStyles)(ViewAnExamDetail))
