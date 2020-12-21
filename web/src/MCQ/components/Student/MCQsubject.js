import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Container from "@material-ui/core/Container";
import { getUser } from '../../../utils'

import {
    hasAttend,
    searchExamDetail
} from '../../../Exam/ExamDetails/actions'
import { addAttendance } from '../../../Attendance/action'
import Timeline from '@material-ui/lab/Timeline'
import SubjectList from './SubjectList'
import CircularProgress from '@material-ui/core/CircularProgress'
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

class MCQsubject extends Component {

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
        const id = this.props.match.params.id
        const exam = this.props.match.params.exam
        console.log(id , 'classroom id here')
        this.props.dispatch(searchExamDetail({exam:exam,classroom:id}));

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

    hasAttendExams = () => {
        const { examDetail } = this.props.examDetailsReducer;
        let examDetailsId = examDetail._id;
        let studentId = getUser()._id;
        this.props.dispatch(hasAttend(studentId, examDetailsId))

    }


    render() {


        const {classes} = this.props;
        const { examDetails,  serchState} = this.props.examDetailsReducer
        console.log(examDetails, "My exams list ")


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
                                    label="Online Exam"
                                    onClick={this.props.history.goBack}

                                />

                            <Typography variant={"inherit"} color="secondary">Subject</Typography>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>
                        <br/>
                        <br/>
                        <div className="col-md-8 order-md-2" >
                            {serchState===1&&
                            <div>
                                <CircularProgress
                                    className={classes.progressCircle}
                                    size={40}
                                    left={-20}
                                    top={10}
                                    status={'loading'}
                                    style={{marginLeft: '50%', marginTop:'20%'}}
                                    disableShrink />
                            </div>
                            }
                            {serchState===3&&
                            <div>
                               Fail
                            </div>
                            }

                            {serchState===2&&

                            <Timeline>
                                {
                                    examDetails.map((exam, i) => {
                                        console.log(exam._id, "exam detai ko id ")
                                        return (
                                            <SubjectList
                                                examdetail={exam}
                                                classes = {classes}
                                                hasAtten ={this.hasAttendExams}
                                            />
                                        )})
                                }
                            </Timeline>

                            }
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
    examDetailsReducer : state.examDetailsReducer
}))(withStyles(useStyles)(MCQsubject))


