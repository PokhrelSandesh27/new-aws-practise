import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import {get} from 'lodash'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper'
import { getGroups, getUser } from '../../../utils'
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { getExamDetails, searchExamDetail } from '../../../Exam/ExamDetails/actions'
import { addAttendance } from '../../../Attendance/action'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import Typography from '@material-ui/core/Typography'
import {getExam, searchExam} from "../../../Exam/Exam/actions";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";


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

class MCQList extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false ,
        text:false,
        localStore: {
            user:[]
        },

        students: []
    }
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        const d = getGroups()
        const user = getUser()
        console.log(user.classroom, 'query')
        if (d.includes("STUDENT")) {
            const id = user.classroom._id
            console.log(id, 'id')
            this.props.dispatch(searchExam({classroom:id}));
        }
    }
    onCheck=(event)=>{
        const localStore = {...this.state.localStore}
        if(event.target.checked) {
            if (!localStore.user.includes(event.target.id)) {
                localStore.user.push(event.target.id)
            }
        }else{
            if (localStore.user.includes(event.target.id)) {
                const index= localStore.user.findIndex(item => item._id === event.target.index)
                console.log(index, 'index')
                localStore.user.splice(index, 1)

            }
        }
        this.setState({
            localStore:localStore
        })

    }

    create=()=>{
        const localStore = { ...this.state.localStore }

        this.props.dispatch(addAttendance(localStore))
        console.log(localStore, 'local')
    }



    render() {

        const {createState} = this.props.paymentReducer
        const {classroom} = this.props.classroomReducer
        const {classes} = this.props;
        const {students} = this.props.studentReducer
        const {mcqs} = this.props.mcqReducer
        const { exams } = this.props.examReducer

        const {user} = this.props;
        const {value} = this.state;
        const { row } = this.props;
        const { open } = this.state;

        let msg

        if (createState === 1)
            msg = 'Creating Discount'
        else
            msg = 'Create Discount'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/discount/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="col-md-8 order-md-2">
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

                                <Typography variant={"inherit"} color="secondary">Online Exam</Typography>
                                {/*<StyledBreadcrumb*/}
                                {/*    label=""*/}
                                {/*    deleteIcon={<ExpandMoreIcon />}*/}
                                {/*    onClick={this.handleClick()}*/}
                                {/*    onDelete={this.handleClick()}*/}
                                {/*/>*/}
                            </Breadcrumbs>
                            <br/>
                        <br/>
                        <Timeline>
                            {
                                exams.map((stu, i) => {
                                    return (
                                        <TimelineItem >
                                            <TimelineOppositeContent style={{flexGrow:"0.2"}}>
                                                <Typography color="textSecondary">{get(stu, 'exam.startDate')}</Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color="primary">
                                                    <LaptopMacIcon />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <NavLink to={`/mcq/exam/${get(stu, '_id')}/${get(stu, 'classroom')}`}>
                                                    <Paper elevation={3} className={classes.paper}>
                                                        <Typography variant="h6" component="h1" color={'secondary'}>
                                                            {get(stu, 'name')}
                                                        </Typography>
                                                        <Typography color={'primary'}>Atten your exam <p>All the best</p></Typography>
                                                    </Paper>
                                                </NavLink>
                                            </TimelineContent>
                                        </TimelineItem>

                                    )})
                            }
                        </Timeline>

                    </div>
                    </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    mcqReducer: state.mcqReducer,
    paymentReducer: state.paymentReducer,
    userReducer:state.userReducer,
    studentReducer: state.studentReducer,
    classroomReducer: state.classroomReducer,
    examReducer : state.examReducer
}))(withStyles(useStyles)(MCQList))


