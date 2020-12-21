import React, { Component } from 'react'
import { getExam, getExams } from '../../Exam/actions'
import { createExamDetail, getExamDetails } from '../actions'
import { getClassroomById } from '../../../Home/actions'
import { getAllSubjects } from '../../../Subject/actions'
import { getAllUsers } from '../../../User/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getUser } from '../../../utils'
import { NavLink } from 'react-router-dom'
import MyInput from 'my-input-react'
import DatePicker from 'react-datepicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

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

toast.configure()

class CreateExamDetails extends Component {

    state = {
        localStore: {
            date: new Date(),
            startTime: new Date(new Date().setHours(11, 0)),
            endTime: new Date(new Date().setHours(14, 0)),
        },
        type: null,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
        allExamDetails: [],
        isUpdated: false,

    }

    initLocalStore () {
        const localStore = {
            date: new Date(),
            startTime: new Date(new Date().setHours(11, 0)),
            endTime: new Date(new Date().setHours(14, 0)),
        }
        const state = this.state
        state.localStore = localStore
        this.setState(state)
    }

    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(getExamDetails())
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(getAllUsers())
    }


    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    async createExamDetails () {
        const data = { ...this.state.localStore, classroom: this.state.classroom, exam: this.state.exam }
        data.startTime = data.startTime.getTime()
        data.endTime = data.endTime.getTime()
        data.date = moment(data.date).format('YYYY/MM/DD')
        const createExamDetailReducer = await this.props.dispatch(createExamDetail(data))
        if ((createExamDetailReducer.value || undefined) && createExamDetailReducer.value.request.status === 200) {
            const examDetail = createExamDetailReducer.value.data
            toast.success(`Exam detail was added.`)
            this.initLocalStore()
            this.props.dispatch(getExamDetails())
            this.switch()
        } else {
            toast.error(`An error occurred.`)
        }

    }

    selectChanged = event => {
        const value = event.target.value
        const id = event.target.id
        this.handler(id, value)
    }

    render () {
        const { classes } = this.props;
        const { exam } = this.props.examReducer
        const { examDetails, readAllState, createState } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer
        const { subjects } = this.props.subjectReducer
        const { users } = this.props.userReducer

        let isDisabled = (createState === 1)


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
                        label="Classroom"
                       onClick={this.props.history.goBack}

                    />

                    <Typography variant={'inherit'} color={'secondary'}>
                        Create
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>


                    <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {
                                        `Classroom :${classroom.grade} ${classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Examination : ${exam.name}`
                                    }

                                </Button>


                <div className="form">
                    <div className="col-md-8 order-md-2" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '70%'
                    }}>
                        <div>

                        </div>

                        <h4 className="urpForm">
                            <label className="urpLabel">Info for creating Exam Details</label>
                        </h4>
                        <br/>

                        <label htmlFor="subject" style={{fontSize:"16px", color: "dimgrey"}}>Subject</label>
                        <select name="subject" id="subject" className="urpSelect"
                                onChange={this.selectChanged}>
                            <option value={null} disabled selected>Please select a subject</option>
                            {
                                // TODO Filter subjects that were already added
                                subjects.map((subject) => {
                                    return (
                                        <option value={subject._id}> {subject.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="theoryFullMarks" style={{fontSize:"16px", color: "dimgrey"}}>Full Marks (Theory)</label>
                        <MyInput
                            me='theoryFullMarks'
                            handler={this.handler.bind(this)}
                            placeHolder='Enter full marks'
                            className="urpInput"/>

                        <label htmlFor="pracFullMarks" style={{fontSize:"16px", color: "dimgrey"}}>Full Marks (Practical)</label>
                        <MyInput
                            me='pracFullMarks'
                            handler={this.handler.bind(this)}
                            placeHolder='Enter full marks'
                            className="urpInput"/>

                        <label htmlFor="theoryPassMarks" style={{fontSize:"16px", color: "dimgrey"}}>Pass Marks (Theory)</label>
                        <MyInput
                            me='theoryPassMarks'
                            handler={this.handler.bind(this)}
                            placeHolder='Enter pass marks'
                            className="urpInput"/>

                        <label htmlFor="pracPassMarks" style={{fontSize:"16px", color: "dimgrey"}}>Pass Marks (Practical)</label>
                        <MyInput
                            me='pracPassMarks'
                            handler={this.handler.bind(this)}
                            placeHolder='Enter full marks'
                            className="urpInput"/>

                        <label htmlFor="startDate" style={{fontSize:"16px", color: "dimgrey"}}>Exam Date</label>
                        <DatePicker
                            id="startDate"
                            selected={this.state.localStore.date}
                            onChange={(date) => {
                                const start = this.state.localStore.startTime
                                const end = this.state.localStore.endTime
                                start.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
                                end.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
                                this.setState({
                                    localStore: {
                                        startTime: start,
                                        endTime: end,
                                        date: date,
                                    }
                                })
                                // return this.handler('date', date)
                            }}
                            minDate={new Date(exam.startDate)}
                            maxDate={new Date(exam.endDate)}
                            className="urpInput"
                        />

                        <label htmlFor="startTime" style={{fontSize:"16px", color: "dimgrey"}}>Start Time</label>
                        <DatePicker
                            id="startTime"
                            selected={this.state.localStore.startTime}
                            onChange={(date) => this.handler('startTime', date)}
                            className="urpInput"
                            minDate={this.state.localStore.date}
                            maxDate={this.state.localStore.date}
                            minTime={this.state.localStore.date.setHours(0, 0)}
                            maxTime={this.state.localStore.endTime}
                            // maxTime={this.state.localStore.date.setHours(23, 59)}
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeSelect
                        />

                        <label htmlFor="endTime" style={{fontSize:"16px", color: "dimgrey"}}>End Time</label>
                        <DatePicker
                            id="endTime"
                            selected={this.state.localStore.endTime}
                            onChange={(date) => this.handler('endTime', date)}
                            className="urpInput"
                            minDate={this.state.localStore.date}
                            maxDate={this.state.localStore.date}
                            minTime={this.state.localStore.startTime}
                            // minTime={this.state.localStore.date.setHours(0, 0)}
                            maxTime={this.state.localStore.date.setHours(23, 59)}
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeSelect
                        />

                        <label htmlFor="invigilator" style={{fontSize:"16px", color: "dimgrey"}}>Invigilator</label>
                        <select name="invigilator" id="invigilator" className="urpSelect"
                                onChange={this.selectChanged}>
                            <option value={null} disabled selected>Please select a invigilator</option>
                            {
                                users.map((user) => {
                                    return (
                                        <option value={user._id}> {user.fullName}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="examiner" style={{fontSize:"16px", color: "dimgrey"}}>Examiner</label>
                        <select name="examiner" id="examiner" className="urpSelect"
                                onChange={this.selectChanged}>
                            <option value={null} disabled selected>Please select a examiner</option>
                            {
                                users.map((user) => {
                                    return (
                                        <option value={user._id}> {user.fullName}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="grader" style={{fontSize:"16px", color: "dimgrey"}}>Grader</label>
                        <select name="grader" id="grader" className="urpSelect"
                                onChange={this.selectChanged}>
                            <option value={null} disabled selected>Please select a grader</option>
                            {
                                users.map((user) => {
                                    return (
                                        <option value={user._id}> {user.fullName}</option>
                                    )
                                })
                            }
                        </select>


                        {/*<div> Create State: {createState}</div>*/}
                        {/*<div> Upload State: {uploadState}</div>*/}
<br/>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            size={'small'}
                            className=""
                            type="submit"
                            disabled={isDisabled}
                            onClick={this.createExamDetails.bind(this)}>
                            {isDisabled ? 'Creating' : 'Create'}
                        </Button>
                    </div>

                </div>

                {/* <div className="row" style={!this.state.viewState ? {} : { display: 'none' }}>
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <div className="row">
                                <div className="col-md-11 order-md-2" style={{ position: 'relative' }}>

                                    <button onClick={this.switch.bind(this)}
                                            style={{   display: (!this.state.viewState ? 'block' : 'none'), marginLeft: "7%", marginBottom:"1%",backgroundColor:"#9db7d2"  }}>
                                        Add New
                                    </button>
                                </div>
                            </div>

                            <table className="assingmentTable" id="dev-table">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Invigilator</th>
                                    <th>Examiner</th>
                                    <th>Grader</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    examDetails &&
                                    examDetails
                                        // this.state.allExamDetails
                                        // TODO Remove this filter when search route is available
                                        .filter((examDetail) => ((this.state.classroom === examDetail.classroom._id) && (this.state.exam === examDetail.exam._id)))
                                        .map((examDetail, i) => {
                                            return (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{examDetail.subject.name}</td>
                                                    <td>{examDetail.date}</td>
                                                    <td>{examDetail.invigilator.fullName}</td>
                                                    <td>{examDetail.examiner.fullName}</td>
                                                    <td>{examDetail.grader.fullName}</td>
                                                    <td><NavLink to={`/examdetails/${examDetail._id}`}>View
                                                        Detail</NavLink></td>
                                                </tr>
                                            )
                                        })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div> */}
                {/* </div> */}
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
}))(withStyles(useStyles)(CreateExamDetails))
