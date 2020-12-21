import React, { Component } from 'react'
import { getExam, getExams } from '../../../Exam/actions'
import { connect } from 'react-redux'
import '../../static/css/style.css'
import { getUser } from '../../../../utils'
import { searchMarkSheets } from '../../actions'
import { getClassroomById } from '../../../../Home/actions'
import { getAllSubjects } from '../../../../Subject/actions'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {emphasize, Paper, withStyles} from "@material-ui/core";
import {useStyles} from "../../../../UseStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)

class ViewMarksheet extends Component {

    state = {
        exam: this.props.match.params.exam,

    }

    async componentDidMount () {
        const classroom = this.props.match.params.classroom
        // TODO Prevent student to view data before report is published
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(classroom))
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(searchMarkSheets({ exam: this.state.exam, student: getUser()._id }))
    }
    print(){
        window.print();
    }

    render () {
        const { exam } = this.props.examReducer
        const { examDetails, examDetail, readAllState, createState } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer
        const { subjects, fetchState: getAllSubjectState } = this.props.subjectReducer
        const { markSheets } = this.props.markSheetReducer
        const student = getUser()
        const {classes} = this.props

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <Breadcrumbs aria-label="breadcrumb"
                                     style={{float: 'right'}}>
                            <StyledBreadcrumb onClick={this.props.history.goBack}
                                              component="a"
                                              label="Back"
                                              icon={<ArrowBackIosIcon fontSize="small" />}>

                            </StyledBreadcrumb>
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>
                            <StyledBreadcrumb
                                component="a"
                                label="Online class"
                                onClick={this.props.history.goBack}

                            />

                            <Typography variant={"inherit"} color="secondary">Results</Typography>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>
                        <br/>
                        <br/>

                        <div className="py-5 text-center">


                            <div className="row">

                                <div className="col-md-6">
                                    <div className="panel panel-primary">
                                        <div>

                                            <Button variant="contained" style={{width:"100%"}}  color="primary">
                                                {
                                                    `Examination :${exam.name}`

                                                }
                                                &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                {
                                                    `ClassRoom : ${classroom.grade} ${classroom.section}`
                                                }
                                            </Button>

                                        </div>
                                    </div>
                                    <br></br>
                                    <Button variant="contained" style={{backgroundColor:"lightgreen"}} onClick={this.print}>Print</Button>
                                    <TableContainer component={Paper}>
                                        <table className="ReportTable">
                                            <thead>
                                            <tr >
                                                <td colSpan="3">Course</td>
                                                <td rowSpan="2"> Pr.FullMark/ Passmark</td>
                                                <td rowSpan="2"> Th. FullMark/passmark</td>
                                                <td colSpan="2"> Obtained Marks</td>
                                            </tr>
                                            <tr>

                                                <td colSpan="2">Full Name</td>
                                                <td>Subject</td>
                                                <td>Th.mark</td>
                                                <td> Pr. Mark</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                markSheets && (getAllSubjectState === 2) &&
                                                markSheets
                                                    .map((mark, i) => {
                                                        console.log(mark)
                                                        return (
                                                            <tr>
                                                                <td colSpan="2">{mark.student.fullName}</td>
                                                                <td>{subjects.find((subject) => subject._id === mark.examDetail.subject).name}</td>
                                                                <td> {mark.examDetail.theoryFullMarks}/{mark.examDetail.theoryPassMarks}</td>
                                                                <td> {mark.examDetail.pracFullMarks}/{mark.examDetail.pracPassMarks}</td>
                                                                <td><b>{mark.theoryMarks}</b></td>
                                                                <td><b>{mark.pracMarks}</b></td>
                                                            </tr>

                                                        )
                                                    })
                                            }
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan="4" className="footer">Date</td>
                                                {/*<td> {examDetail.date}</td>*/}
                                                <td colSpan="2"></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="footer">Duration</td>
                                                <td colSpan="3">
                                                    {/*{moment(examDetail.startTime, 'hmm').format('HH:mm')} - {moment(examDetail.endTime, 'hmm').format('HH:mm')}*/}
                                                </td>

                                            </tr>
                                            </tfoot>
                                        </table>
                                    </TableContainer>
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
}))(withStyles(useStyles)(ViewMarksheet))
