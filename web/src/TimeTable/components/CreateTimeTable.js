import React, { Component } from 'react'
import { getAllClassroom, getClassroomById } from '../../Home/actions'
import { getAllUsers } from '../../User/actions'
import { getAllSlot, getSlotById } from '../../Slot/action'
import { connect } from 'react-redux'
import { addTimeTable, getTimeTableById, searchTimeTable } from '../action'
import { createSubject, getAllSubjects } from '../../Subject/actions'
import { searchSlot } from '../../Slot/action'
import moment from 'moment'
import { get } from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import '../static/css/style.css'
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import {emphasize, Paper} from '@material-ui/core'
import Dialogbox from "../../Dialogbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import Chip from "@material-ui/core/Chip";

Modal.setAppElement('#root')
toast.configure();

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

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class CreateTimeTable extends Component {

    state = {
        localStore: {
            classroom: this.props.match.params.id
        },
        showModalState: false,
        data: {}

    }

    componentDidMount () {
        const body = { classroom: this.props.match.params.id }
        const id = this.props.match.params.id
        this.props.dispatch(getAllSlot())
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(getAllUsers())
        this.props.dispatch(searchTimeTable(body))
        this.props.dispatch(getClassroomById(id))

    }


    handler = (event, reference) => {
        const localStore = { ...this.state.localStore }
        localStore[reference] = event.target.value

        this.setState({ localStore })
    }


    createTimeTable () {
        const { localStore } = this.state

        this.props.dispatch(addTimeTable(localStore))
            .then(resp => {
                this.setState({showModalState: false})
                toast.success('Subject added')
                const body = { classroom: this.props.match.params.id }//3. update the time
                this.props.dispatch(searchTimeTable(body))
            })
            .catch(err => {
                toast.error('Subject assign failed');


            })
        // window.location.reload();

    }

    create (day, period,time) {
        this.openModal()
        const localStore = { ...this.state.localStore }
        localStore.day = day
        localStore.slot = period._id
        this.setState({ localStore, period, day ,time})

    }

    openModal =()=> {
        this.setState({ showModalState: true })
    }

    closeModal= () =>{
        this.setState({ showModalState: false })
    }

    getSubject(timetable, slotId) {
        const entry = timetable.find(t => get(t, 'slot._id') === slotId) // t.slot._id => get(t, 'slot._id')

        return get(entry, 'subject.name')
    }

    render () {
        const { classes } = this.props;
        const { classrooms,classroom, fetchState: classroomFetchState } = this.props.classroomReducer
        const { slots, fetchState: slotFetchState } = this.props.slotReducer
        const { subjects, fetchState: subjectFetchState } = this.props.subjectReducer
        const { addState } = this.props.timetableReducer
        const { users } = this.props.userReducer
        const teachers = users.filter(user => user.groups.includes('TEACHER'))

        const { timetables } = this.props.timetableReducer
        const sundayTimeTable = timetables.filter(t => t.day === 'Sunday')
        const mondayTimeTable = timetables.filter(t => t.day === 'Monday')
        const tuesTimeTable = timetables.filter(t => t.day === 'Tuesday')
        const wednTimeTable = timetables.filter(t => t.day === 'Wednesday')
        const thrusTimeTable = timetables.filter(t => t.day === 'Thursday')
        const friTimeTable = timetables.filter(t => t.day === 'Friday')
        const satTimeTable = timetables.filter(t => t.day === 'Saturday')



        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">

                <Breadcrumbs aria-label="breadcrumb"
                             style={{float: 'right'}}>
                    <StyledBreadcrumb onClick={this.props.history.goBack}
                                      component="a"
                                      label="Back"
                                      icon={<ArrowBackIosIcon fontSize="small" />}>

                    </StyledBreadcrumb>
                    <NavLink to={'/home/homePage'}>


                        <StyledBreadcrumb
                            component="a"
                            label="Home"

                        />
                    </NavLink>
                    <StyledBreadcrumb
                        component="a"
                        label="TimeTable"
                        onClick={this.props.history.goBack}

                    />
                    <Typography variant={'inherit'} color={'secondary'}>
                        Create Schedule
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>

                {
                    classroomFetchState === 2 &&
                    slotFetchState === 2 &&
                    <div>
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '100%'
                        }}>

                            <br/>


                                <div>

                                    {/*<h4 className="mb-3">Submissions List for</h4>*/}
                                    {/* TODO Create a separate component for the following details*/}
                                    <Button variant="contained" style={{width:"100%"}}  color="primary">
                                        ClassTeacher: &nbsp;&nbsp;
                                            {get(classroom, 'teacher.fullName')}

                                        &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        {

                                            `ClassRoom : ${classroom.grade} ${classroom.section}`
                                        }

                                    </Button>
                                </div>


                            <TableContainer component={Paper}>
                            <table className="assingmentTable">

                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Sunday</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    slots.map((period, index) => {
                                        return (
                                            <tr>
                                                <td>{moment(period.startTime, 'hmm').format('HH:mm')}-{moment(period.endTime, 'hmm').format('HH:mm')}</td>

                                                <td onClick={this.getSubject(sundayTimeTable, period._id) ? '' : this.create.bind(this, 'Sunday',period)}>
                                                    {this.getSubject(sundayTimeTable, period._id)}
                                                </td>
                                                <td onClick={this.getSubject(mondayTimeTable, period._id) ? '' : this.create.bind(this, 'Monday',period)}>
                                                    {this.getSubject(mondayTimeTable, period._id)}
                                                </td>
                                                <td onClick={this.getSubject(tuesTimeTable, period._id) ? '' : this.create.bind(this, 'Tuesday',period)}>
                                                    {this.getSubject(tuesTimeTable, period._id)}
                                                </td>
                                                <td onClick={this.getSubject(wednTimeTable, period._id) ? '' : this.create.bind(this, 'Wednesday',period)}>
                                                    {this.getSubject(wednTimeTable, period._id)}
                                                </td>
                                                <td onClick={this.getSubject(thrusTimeTable, period._id) ?'':this.create.bind(this, 'Thursday',period)}>
                                                    {this.getSubject(thrusTimeTable, period._id)}

                                                </td>
                                                <td onClick={this.getSubject(friTimeTable, period._id) ? '' :this.create.bind(this, 'Friday',period)}>
                                                    {this.getSubject(friTimeTable, period._id)}
                                                </td>
                                                <td  onClick={this.getSubject(satTimeTable, period._id) ? '' :this.create.bind(this, 'Saturday',period)}>
                                                    {this.getSubject(satTimeTable, period._id)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>

                            </table>
                            </TableContainer>

                            <hr className="mb-4"/>
                        </div>
                    </div>
                }

                {
                    (classroomFetchState === 1 || slotFetchState === 1) &&
                    <div className={classes.progress}>
                        <CircularProgress />

                    </div>

                }

                {
                    addState === 2 &&
                    <div>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                                style={
                                    {
                                        width:"5.5%",
                                        height:"5.1%",
                                        marginLeft:"40%"
                                    }}/>

                    </div>
                }






                <Dialog
                    scroll={'paper'}
                    onClose={this.closeModal}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.showModalState}>
                    <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>
                        Set Schedule
                        <p style={{color:'#2814b3'}}>
                         <b> Day </b> : {get(this.state, 'day')}
                            &nbsp;:&nbsp; &nbsp;:&nbsp;
                            <b>Period</b> &nbsp;:&nbsp;{moment(get(this.state.period,'startTime'), 'hmm').format("HH:mm")}&nbsp;-
                        {moment(get(this.state.period,'endTime'), 'hmm').format("HH:mm")}
                        </p>
                    </DialogTitles>
                    <DialogContent dividers>
                        <Typography gutterBottom>

                            <select
                                name="subject"
                                id="subject"
                                className="forminput"
                                onChange={(event) => this.handler(event, 'subject')}>

                                <option value={null} disabled selected>Subject</option>

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

                    <div className="row">
                        <div className="col-6" style={{display:'flex', justifyContent:'center'}}>

                            <select
                                name="teacher"
                                id="teacher"
                                className="forminput"
                                onChange={(event) => this.handler(event, 'teacher')}>

                                <option value={null} disabled selected>Teacher</option>

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
                        </Typography>

                    </DialogContent>
                    <DialogActions>

                        <Button autoFocus color="primary"
                            onClick={this.createTimeTable.bind(this)}>Create</Button>


                        <Button autoFocus onClick={this.closeModal} color="primary">
                            Close
                        </Button>
                        {/*<Button autoFocus onClick={this.closeModal} color="primary">*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Dialog>















                {/*<Modal*/}
                {/*    isOpen={this.state.showModalState}*/}
                {/*    onRequestClose={this.closeModal}*/}
                {/*    shouldCloseOnOverlayClick={false}*/}
                {/*    style={customStyles}*/}
                {/*    contentLabel="Example Modal">*/}

                {/*    <h2 style={{display:'flex', justifyContent:'center'}}>Set Time</h2>*/}
                {/*    <h5 style={{display:'flex' , justifyContent:'center'}}>*/}
                {/*       <b>Day</b> &nbsp;:&nbsp;{get(this.state, 'day')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {/*        <b>Period</b>&nbsp;:&nbsp;{moment(get(this.state.period,'startTime'), 'hmm').format("HH:mm")}&nbsp;-*/}
                {/*            {moment(get(this.state.period,'endTime'), 'hmm').format("HH:mm")}</h5>*/}


                {/*    <div className="col-6" style={{display:'flex', justifyContent:'center'}}>*/}

                {/*        <label>Subject </label>*/}
                {/*        <select*/}
                {/*            name="subject"*/}
                {/*            id="subject"*/}
                {/*            className="form-control custom-select"*/}
                {/*            onChange={(event) => this.handler(event, 'subject')}>*/}

                {/*            <option value={null} disabled selected>Please select a subject</option>*/}

                {/*            {*/}
                {/*                subjects.map((subject) => {*/}
                {/*                    return (*/}
                {/*                        <option value={subject._id}>*/}
                {/*                            {subject.name}*/}
                {/*                        </option>*/}
                {/*                    )*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*    <br></br>*/}

                {/*    <div className="row">*/}
                {/*        <div className="col-6" style={{display:'flex', justifyContent:'center'}}>*/}
                {/*            <label>Teacher</label>*/}
                {/*            <select*/}
                {/*                name="teacher"*/}
                {/*                id="teacher"*/}
                {/*                className="form-control custom-select"*/}
                {/*                onChange={(event) => this.handler(event, 'teacher')}>*/}

                {/*                <option value={null} disabled selected>Please select a Teacher</option>*/}

                {/*                {*/}
                {/*                    teachers.map((user) => {*/}
                {/*                        return (*/}
                {/*                            <option value={user._id}>*/}
                {/*                                {user.fullName}*/}

                {/*                            </option>*/}
                {/*                        )*/}
                {/*                    })*/}
                {/*                }*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <br></br>*/}
                {/*    <div className="row">*/}
                {/*        <div className="col-6" style={{display:'flex', justifyContent:'center'}}>*/}
                {/*            <Button variant="contained" color="Darkgrey" className="close" onClick={this.closeModal.bind(this)}>Cancel</Button>*/}

                {/*        <Button variant="contained" color="primary" className="Create" onClick={this.createTimeTable.bind(this)}>Create</Button>*/}


                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    slotReducer: state.slotReducer,
    subjectReducer: state.subjectReducer,
    userReducer: state.userReducer,
    timetableReducer: state.timetableReducer
}))(withStyles(useStyles)(CreateTimeTable))
