import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getClassroomById} from '../../../Classroom/actions'
import {getAllSubjects} from '../../../Subject/actions'
import {Redirect} from 'react-router-dom'
import {toast} from 'react-toastify';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import TextField from "@material-ui/core/TextField";
import MyTextField from "../../../components/TextField";
import {searchUser} from '../../../User/actions';
import { createExamDetailAwait } from '../../../Exam/ExamDetails/actions'

const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  style={{ width: "100%", padding:"10px"}}
                                                                  variant="filled"/>
const date = e => DatePickerInput('Date', e)

toast.configure();

class CreateExamDetails extends Component {
    state = {
        localStore: {
            date: "2020-10-02",
            exam: this.props.match.params.termId,
            classroom: this.props.match.params.classroomId
        },
        hr: "00",
        min: "00",
        redirect: false,
        disabled: false
    }

    componentDidMount() {
        console.log("params",this.props.match.params)
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(getClassroomById(this.props.match.params.classroomId))

        this.props.dispatch(searchUser("{\"groups\":[\"TEACHER\"]\}"))
        console.log("initialDate is", this.state.localStore.date)
    }

    selectChanged = event => {
        const value = event.target.value
        const id = event.target.name
        this.handler(id, value)
    }

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
    }

    dateChanged = date => {
        this.updateLocalStore('date', date.target.value)
        console.log("date in state", this.state.localStore.date)
    }

    startTimeChanged = event => {
        console.log("start time is", event.target.value)
        const date = this.state.localStore.date
        const time= event.target.value
        const sTime = date +" "+time+":00"
        console.log(sTime)
        let epochStart = new Date(sTime).getTime()

        this.updateLocalStore('startTime', epochStart)
        console.log("this state", this.state.localStore)
    }

    endTimeChanged = event => {
        console.log("end time is", event.target.value)
        const date = this.state.localStore.date
        const time= event.target.value
        const eTime = date +" "+time+":00"
        console.log(eTime)
        let epochEnd = new Date(eTime).getTime()

        this.updateLocalStore('endTime', epochEnd)
        console.log("this state", this.state.localStore)
    }

    newFileSelected = event => {
        const file = event.target.files[0]
        const id = event.target.id
        this.setState({[id]: file})
    }

    handler = (me, value) => {

        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    createExamDetails = async (e) => {
        const localStores = this.state.localStore
        console.log('localStores', localStores)
        const json = JSON.stringify(localStores)
        console.log("json stuff",json)
        await this.props.dispatch(createExamDetailAwait(this.state.localStore))

    }
    render() {
        const {classes} = this.props;
        const {localStore} = this.state
        const {subjects} = this.props.subjectReducer
        const {createState, uploadState} = this.props.assignmentReducer
        const {classroom} = this.props.classroomReducer
        const teachers = this.props.userReducer.users

        let msg
        const isDisabled = this.state.disabled

        if (createState === 1 && (!this.state.uploadFile || uploadState === 0) && isDisabled)
            msg = 'Creating Assignment'
        else if (createState === 2 && (!this.state.uploadFile) && isDisabled) {
            msg = 'Assignment Created'
        } else if (createState === 2 && (uploadState === 1) && isDisabled)
            msg = 'Assignment Created, Attachment Uploading'
        else if (createState === 2 && (uploadState === 2) && isDisabled) {
            msg = 'Assignment Created, Attachment Uploaded'
        } else {
            msg = 'Create Assignment'
        }

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/assignment/create',
                    msg: msg
                }}/>
            )
        }

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="row">

                            <h2>Creating Exam Details</h2>

                        </div>
                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft: '1%', backgroundColor: "#f0f1f6", color: "green"}}
                        >⬅ Go back</Button>

                        <form className={classes.root} onSubmit={this.createExamDetails.bind(this)}>

                            <div className="col-md-8 order-md-2" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                width: '70%',
                                marginLeft: '7%'
                            }}>

                                <div className="mb-3">
                                    <label className="urpLabel">Info for creating Exam Details{
                                        classroom &&
                                        ` Classroom :  ${classroom.grade}  ${classroom.section}`


                                    }
                                    </label>
                                </div>

                                <TextField
                                    id="date"
                                    label="Exam Date"
                                    type="date"
                                    defaultValue="2020-10-02"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={event => this.dateChanged(event)}
                                />
                                <br/><br/>

                                <TextField
                                    id="time"
                                    label="Start Time"
                                    type="time"
                                    defaultValue="00:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={ event => this.startTimeChanged(event)}
                                />
                                <br/><br/>

                                <TextField
                                    id="time"
                                    label="End Time"
                                    type="time"
                                    defaultValue="00:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={ event => this.endTimeChanged(event)}
                                />
                                <br/><br/>

                                <MyTextField
                                    select
                                    name="subject"
                                    id="outlined-select-native"
                                    handler={this.selectChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    label="Please select Subject"
                                    variant="outlined"
                                >
                                    {
                                        subjects.map((subject) => {
                                            return (
                                                <option value={subject._id}> {subject.name}
                                                    {subject.label}
                                                </option>
                                            )
                                        })
                                    }
                                </MyTextField>

                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='theoryFullMarks'
                                             handler={this.handler}
                                             label="Theory Full Marks"
                                             style={{height: "100px"}}/>

                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='pracFullMarks'
                                             handler={this.handler}
                                             label="Practical Full Marks"
                                             style={{height: "100px"}}/>

                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='theoryPassMarks'
                                             handler={this.handler}
                                             label="Theory Pass Marks"
                                             style={{height: "100px"}}/>

                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='pracPassMarks'
                                             handler={this.handler}
                                             label="Practical Pass Marks"
                                             style={{height: "100px"}}/>

                                <MyTextField
                                    select
                                    name="invigilator"
                                    id="outlined-select-native"
                                    handler={this.selectChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    label="Please select invigilator"
                                    variant="outlined"
                                >
                                    {
                                        teachers.map((teacher) => {
                                            return (
                                                <option value={teacher._id}> {teacher.fullName}
                                                    {teacher.label}
                                                </option>
                                            )
                                        })
                                    }
                                </MyTextField>

                                <MyTextField
                                    select
                                    name="examiner"
                                    id="outlined-select-native"
                                    handler={this.selectChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    label="Please select Examiner"
                                    variant="outlined"
                                >
                                    {
                                        teachers.map((teacher) => {
                                            return (
                                                <option value={teacher._id}> {teacher.fullName}
                                                    {teacher.label}
                                                </option>
                                            )
                                        })
                                    }
                                </MyTextField>

                                <MyTextField
                                    select
                                    name="grader"
                                    id="outlined-select-native"
                                    handler={this.selectChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    label="Please select Grader"
                                    variant="outlined"
                                >
                                    {
                                        teachers.map((teacher) => {
                                            return (
                                                <option value={teacher._id}> {teacher.fullName}
                                                    {teacher.label}
                                                </option>
                                            )
                                        })
                                    }
                                </MyTextField>
                                {console.log("last state reader", this.state.localStore)}
                                <label style={{fontSize: "12px"}}>
                                    {
                                        createState === 0 && uploadState === 0 &&
                                        'Please fill up all the boxes'||
                                        createState === 1 && uploadState === 0 &&
                                        'Creating' ||
                                        createState === 2 && uploadState === 1 &&
                                        'Created, Uploading' ||
                                        createState === 2 && uploadState === 2 &&
                                        'Created,Uploaded'
                                    }
                                </label>

                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon/>}
                                    onClick={this.createExamDetails.bind(this)}
                                    style={{width: "30%"}}
                                >
                                    Create Exam Details
                                </Button>

                                <label htmlFor="file" style={{fontSize: "18px"}}>Select a file to upload</label>
                            </div>
                        </form>
                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    subjectReducer: state.subjectReducer,
    assignmentReducer: state.assignmentReducer,
    userReducer: state.userReducer
}))(withStyles(useStyles)(CreateExamDetails))
