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
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

toast.configure()

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
                                 label="Reports"
                                 onClick={this.props.history.goBack}

                             />


                             <Typography variant={'inherit'} color={'secondary'}>
                                All Subject
                             </Typography>
                         </Breadcrumbs>
                         <br/> <br/>
                         <div className="row">
                         <div className="col-md-6">


                        <div className="panel panel-primary">
                            <div>

                                <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {
                                        `Classroom :${classroom.grade}${classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Examination : ${exam.name}`
                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {searchSingleState === 2 && `${student.student.fullName}`}

                                </Button>
                            </div>
                            <br></br>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Subject</b></TableCell>
                                            <TableCell align="center"><b>Practical(FM/PM)</b></TableCell>
                                            <TableCell align="center"><b>Theory(FM/PM)</b></TableCell>
                                            <TableCell align="center"><b>OM(Prac)</b></TableCell>
                                            <TableCell align="center"><b>OM(Th)</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {markSheets && examDetailsState === 2 &&
                                        markSheets
                                            .map((mark, i) => {
                                                this.totalMarks += mark.theoryMarks + mark.pracMarks
                                                return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{(examDetails.find(examDetail => examDetail._id === mark.examDetail._id).subject.name)}</TableCell>
                                                    <TableCell align="center">{mark.examDetail.theoryFullMarks}/{mark.examDetail.theoryPassMarks}</TableCell>
                                                    <TableCell align="center">{mark.examDetail.pracFullMarks}/{mark.examDetail.pracPassMarks}</TableCell>
                                                    <TableCell align="center">{mark.pracMarks}</TableCell>
                                                    <TableCell align="center">{mark.theoryMarks}</TableCell>


                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br></br>
                            <form className={classes.root}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '25%',
                                    marginLeft: '5%'
                                }}>
                                    <label>Totalmarks</label>

                                    <MyInput id="outlined"
                                               variant="outlined"
                                               id='totalMarks'
                                               value={this.totalMarks}
                                               disabled
                                               handler={this.handler.bind(this)}
                                               label="Total Marks"
                                               style={{height:"100px"}}/>



                                    <label>Results</label>
                                    <MyInput id="outlined"
                                               variant="outlined"
                                               me='result'
                                               handler={this.handler.bind(this)}
                                               label="Results"
                                               style={{height:"100px"}}/>
                                               <label>Remarks</label>
                                    <MyInput id="outlined"
                                               variant="outlined"
                                               me='remarks'
                                               handler={this.handler.bind(this)}
                                               label="Remarks"
                                               style={{height:"100px"}}/>
                                               <label>GPA</label>
                                    <MyInput id="outlined"
                                               variant="outlined"
                                               me='gpa'
                                               handler={this.handler.bind(this)}
                                               label="GPA"
                                               style={{height:"100px"}}/>
                                    <Button
                                       variant="contained"
                                       color='primary'
                                        type="submit"
                                        disabled={this.state.isDisabled}
                                        onClick={this.createExamReport.bind(this)}>
                                        {this.state.isDisabled ? 'Adding' : 'Add'}
                                    </Button>


                                </div>
                            </form>
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
