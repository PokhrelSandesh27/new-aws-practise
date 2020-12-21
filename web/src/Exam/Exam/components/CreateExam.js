import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import MyInput from 'my-input-react'
import { createExam } from '../actions'
import { connect } from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Paper from "@material-ui/core/Paper";
import {getAllClassroom} from "../../../Classroom/actions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
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
class CreateExam extends Component {

    state = {
        redirect: false,
        disabled: false,
        localStore: {
            startDate: new Date(),
            endDate: new Date(),
        },
        classroomId: null,
    }

    // Dropped this idea
    // handleStartDateChange = (date) => this.handler('startDate', date)
    // handleEndDateChange = (date) => this.handler('startDate', date)

    async createExam () {
        this.setState({ disabled: true })
        const { localStore: req, classroomId } = this.state

        const sD = moment(req.startDate).format('YYY/MM/DD')
        const eD = moment(req.endDate).format('YYY/MM/DD')
        const createExamReducer = await this.props.dispatch(createExam({ ...req, startDate: sD, endDate: eD, classroom: classroomId,year:2020 }))
        if ((createExamReducer.value || undefined) && createExamReducer.value.request.status === 200) {
            this.setState({ redirect: true })
        }
        this.setState({ disabled: false })

    }
    componentDidMount () {
        this.props.dispatch(getAllClassroom())
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    classroomChanged = event => {
        const classroomId = event.target.value

        this.setState({ classroomId: classroomId })
    }
    render () {
        const { classes } = this.props;
        const {classrooms} = this.props.classroomReducer
        const { createState, exam } = this.props.examReducer

        let msg, isDisabled = this.state.disabled

        if (createState === 1 && isDisabled)
            msg = 'Creating Exam'
        else if (createState === 2 && isDisabled)
            msg = `Exam '${exam.name}' Created`
        else
            msg = 'Create Exam'

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/exam/list',
                    msg: msg
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

                        <Typography variant={'inherit'} color={'secondary'}>
                            Exam Create
                        </Typography>
                    </Breadcrumbs>

                    <div>

                            <div >
                                {/*<Paper>*/}
                                    <div className="col-md-8 order-md-2" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        width: '70%',
                                        margin:"1%"

                                    }}>


                            <label className="FormLabel">Name Of Exam</label>
                            <MyInput
                                me='name'
                                handler={this.handler.bind(this)}
                                placeHolder='Enter Name'
                                className="forminput"/>

                            <label className="FormLabel">Exam Type</label>
                            <MyInput
                                me='type'
                                handler={this.handler.bind(this)}
                                placeHolder='Type of exam'
                                className="forminput"/>


                                <label className="FormLabel">Classroom</label>
                                        <select name="classroom" id="classroom"  className="forminput"
                                                onChange={this.classroomChanged}>
                                            <option value={null} disabled selected>Please select a classroom</option>
                                            {
                                                classrooms.map((classroom) => {
                                                    return (
                                                        <option value={classroom._id}>Class: {classroom.grade},
                                                            Section: {classroom.section}</option>
                                                    )
                                                })
                                            }
                                        </select>
                            <label className="FormLabel">Exam Start Date</label>
                            <DatePicker
                                id="startDate"
                                selected={this.state.localStore.startDate}
                                onChange={(date) => this.handler('startDate', date)}
                                className="forminput"
                            />
                            <label className="FormLabel">Exam End Date</label>
                            <DatePicker
                                id="endDate"
                                selected={this.state.localStore.endDate}
                                onChange={(date) => this.handler('endDate', date)}
                                className="forminput"
                            />
                            <button
                                className="buttonStyle"
                                type="submit"
                                style={{marginTop: "2%", backgroundColor: "dimgrey"}}
                                disabled={isDisabled}
                                onClick={this.createExam.bind(this)}>
                                {msg}
                            </button>

                                </div>

                                {/*</Paper>*/}
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
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(CreateExam))
