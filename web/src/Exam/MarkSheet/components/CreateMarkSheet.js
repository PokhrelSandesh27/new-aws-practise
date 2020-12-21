import React, { Component } from 'react'
import { getExam, getExams } from '../../Exam/actions'
import { createMarkSheet, searchMarkSheets } from '../actions'
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
import { findIndex, get } from 'lodash'
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
class CreateExamDetails extends Component {

    state = {
        localStore: [],
        type: null,
        addBy: this.props.match.params.type,
        addByType: this.props.match.params.typeId,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
        isDisabled: false,
        totalAdded: 0
        // isCompleted: false,

    }

    inputHandler = (id, event) => {
        const value = event.target.value
        const name = event.target.id
        const localStore = this.state.localStore
        const index = localStore.findIndex(_item => _item._id === id)

        if (index > -1) {
            const item = localStore[index]
            item[name] = value
            localStore[index] = item
        } else {
            const item = { _id: id, [name]: value }
            localStore.push(item)
        }
        this.setState({ localStore })
    }

    async componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))

        if (this.state.addBy === 'student') {
            this.props.dispatch(searchStudentById(this.state.addByType))
            // TODO Add Search for exam details when available
            this.props.dispatch(getExamDetails())

        } else if (this.state.addBy === 'subject') {
            this.props.dispatch(getExamDetailAwait(this.state.addByType)).then(
                examDetailReducer => {
                    if ((examDetailReducer.value || undefined) && examDetailReducer.value.request.status === 200) {
                        const examDetail = examDetailReducer.value.data
                        this.props.dispatch(getSubject(examDetail.subject))
                    }
                }
            )
            this.props.dispatch(searchStudent({ 'classroom': this.state.classroom }))
        }
    }

    async createMarSheet () {
        this.setState({ isDisabled: true })

        let isError = false

        const data = this.state.localStore

        let examDetail = (this.state.addBy === 'subject') ? this.state.addByType : null
        let student = (this.state.addBy === 'student') ? this.state.addByType : null

        data.map((mark) => {
            const markReq = {
                'examDetail': (examDetail === null) ? mark._id : examDetail,
                'student': (student === null) ? mark._id : student,
                'theoryMarks': mark.th,
                'pracMarks': mark.pr
            }
            this.props.dispatch(createMarkSheet(markReq)).then(createMarksheetReducer => {
                    if ((createMarksheetReducer.value || undefined) && createMarksheetReducer.value.request.status === 200) {
                        const examDetail = createMarksheetReducer.value.data
                        toast.success(`Mark added.`)
                        const { totalAdded } = this.state
                        this.setState({ totalAdded: totalAdded + 1 })
                    } else {
                        isError = true
                        toast.error(`An error occurred.`)
                    }
                }
            )
        })

    }

    render () {
        const { classes } = this.props;
        const { exam } = this.props.examReducer
        const { examDetails, examDetail, readAllState, createState } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer
        const { subject, getState: getSubjectState } = this.props.subjectReducer
        const { students, student, searchSingleState } = this.props.studentReducer

        const items = (this.state.addBy === 'student') ? examDetails : students

        if(this.state.isDisabled && this.state.localStore.length === this.state.totalAdded){
            return (<Redirect to={{
                    pathname: `/marksheets/${this.state.type}/exam/${this.state.exam}/classroom/${this.state.classroom}/${this.state.addBy}`,
                    msg: 'Marks were added'
                }}/>
            )
        }

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
                    <NavLink to={'marksheets/Teache'}>
                        <StyledBreadcrumb
                            component="a"
                            label="Results"
                            icon={<HomeIcon fontSize="small" />}

                        />
                    </NavLink>
                    <StyledBreadcrumb
                        component="a"
                        label="Student"
                        onClick={this.props.history.goBack}/>

                    <Typography variant={'inherit'} color={'secondary'}>
                       Add Marks
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>
                <div className="row">

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
                                        `Student :${student.fullName}`
                                    }

                                </Button>
                            </div>
                            <br></br>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>{(this.state.addBy === 'subject') ? 'Student' : 'Subject'}</b></TableCell>
                                            <TableCell align="center"><b>(Practical) FM/PM</b></TableCell>
                                            <TableCell align="center"><b>(Theory) FM/PM</b></TableCell>
                                            <TableCell align="center"><b>OM (Pra)</b></TableCell>
                                            <TableCell align="center"><b>OM (Theroy)</b></TableCell>
                                            <TableCell align="center"><b>Action</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            items &&
                                            items.
                                                // TODO Remove this filter when search route is available for examDetails
                                                filter(item => {
                                                    return (this.state.addBy === 'student' ? ((this.state.classroom === item.classroom._id) && (this.state.exam === item.exam._id)) : true)
                                                })
                                                .map((item, i) => {
                                                    const examDet = (this.state.addBy === 'student') ? item : examDetail
                                                    const id = (this.state.addBy === 'student') ? item._id : item.student._id
                                                    return (
                                                        <TableRow >
                                                            <TableCell align="center">
                                                                {i+1}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {(this.state.addBy === 'student') ? item.subject.name : item.student.fullName}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDet.theoryFullMarks}/{examDet.theoryPassMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDet.pracFullMarks}/{examDet.pracPassMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <input
                                                                    placeholder='Enter marks for theory'
                                                                    id='th'
                                                                    name='th'
                                                                    onChange={this.inputHandler.bind(this, id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <input
                                                                    placeholder='Enter marks for practical'
                                                                    id='pr'
                                                                    name='pr'
                                                                    onChange={this.inputHandler.bind(this, id)}/>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button
                                                                    variant="contained"

                                                                    style={{width:"100%", marginLeft: "1%"}}
                                                                    type="submit"
                                                                    disabled={this.state.isDisabled}
                                                                    onClick={this.createMarSheet.bind(this)}>
                                                                    {this.state.isDisabled ? 'Adding' : 'Add'}
                                                                </Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </TableBody>
                                </Table>
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
}))(withStyles(useStyles)(CreateExamDetails))
