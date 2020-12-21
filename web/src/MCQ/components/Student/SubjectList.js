import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { getUser } from '../../../utils'
import {get} from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
import SubjectIcon from '@material-ui/icons/Subject';
import { hasAttend } from '../../../Exam/ExamDetails/actions'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import Typography from '@material-ui/core/Typography'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'

import Paper from '@material-ui/core/Paper'
import { NavLink} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'


 class SubjectList extends Component {



        componentDidMount()
        {
            let studentId = getUser()._id;
            console.log(this.props.examdetail._id,"Exam whole printed")

            //this.props.hasAtten()
            this.props.dispatch(hasAttend(studentId, this.props.examdetail._id))
        }


    render() {
      const {hasAttends, readStateAttend} = this.props.examDetailsReducer
        let result;
        console.log('date', Date.now())
        console.log('start time',  this.props.examdetail.startTime)
        console.log('end time',  this.props.examdetail.endTime)
        if(this.props.examdetail.questionSet==null){
            result = 0;
        }else if(readStateAttend[this.props.examdetail._id] === 1){
            result = 1;
        }else if(hasAttends[this.props.examdetail._id]){
            result = 2;
        }else if(this.props.examdetail.startTime < Date.now() && Date.now() < this.props.examdetail.endTime){
            result = 3;
        }else if(this.props.examdetail.startTime > Date.now()){
            result = 4
        }else{
            result = 5
        }
        return (
            <div>
                    {/*{  result === 1 &&*/}
                    {/*        <div>*/}
                    {/*            <CircularProgress*/}
                    {/*                className={this.props.classes.progressCircle}*/}
                    {/*                size={40}*/}
                    {/*                left={-20}*/}
                    {/*                top={10}*/}
                    {/*                status={'loading'}*/}
                    {/*                style={{marginLeft: '50%', marginTop: '20%'}}*/}
                    {/*                disableShrink/>*/}
                    {/*        </div>}*/}

            {result!=1 &&
                <TimelineItem>
                <TimelineOppositeContent style={{flexGrow: "0.2"}}>
                <Typography
                color="textSecondary">{moment(this.props.examdetail.startTime).format("hh:mm")} - {moment(this.props.examdetail.endTime).format("hh:mm")} </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                <TimelineDot color="primary">
                <SubjectIcon/>
                </TimelineDot>
                <TimelineConnector/>
                </TimelineSeparator>


                <TimelineContent >
                    {result===0 &&
                    <Paper style={{backgroundColor: "#c1c1c1"}} elevation={3}
                           className={this.props.classes.paper}>
                        <Typography variant="h6" component="h1" color={'secondary'}>
                            {get(this.props.examdetail, 'subject.name')}
                        </Typography>
                        <Typography color={'primary'}>
                            <p>No Content</p>
                        </Typography>
                    </Paper> }
                {/*{result ===2 &&*/}
                {/*    <Paper style={{backgroundColor: "#c1c1c1"}} elevation={3}*/}
                {/*           className={this.props.classes.paper}>*/}
                {/*        <Typography variant="h6" component="h1" color={'secondary'}>*/}
                {/*            {get(this.props.examdetail, 'subject.name')}*/}
                {/*        </Typography>*/}
                {/*        <Typography color={'primary'}>*/}
                {/*            You Already Attend This Exam and marks are updated*/}
                {/*            <p>All the best</p>*/}
                {/*        </Typography>*/}
                {/*    </Paper> }*/}
                    {result===3&&
                        <NavLink
                            className="navlink"
                            to={`/mcq/list/examDetails/${this.props.examdetail._id}`}>
                            <Paper elevation={3} className={this.props.classes.paper}>
                                <Typography variant="h6" component="h1" color={'secondary'}>
                                    {get(this.props.examdetail, 'subject.name')}
                                </Typography>
                                <Typography color={'primary'}>
                                    Atten your exam
                                    <p>All the best</p>
                                </Typography>
                            </Paper>
                        </NavLink> }
                    {result ===4 &&
                            <Paper style={{backgroundColor: "lightGreen"}} elevation={3}
                                   className={this.props.classes.paper}>
                                <Typography variant="h6" component="h1" color={'secondary'}>
                                    {get(this.props.examdetail, 'subject.name')}
                                </Typography>
                                <Typography color={'primary'}>
                                    wait for the time
                                    <p>All the best</p>
                                </Typography>
                            </Paper> }
                    {result ===5 &&
                            <Paper style={{backgroundColor: '#99aab5'}} elevation={3}
                                   className={this.props.classes.paper}>
                                <Typography variant="h6" component="h1" color={'secondary'}>
                                    {get(this.props.examdetail, 'subject.name')}
                                </Typography>
                                <Typography color={'primary'}>
                                    Sorry
                                    <p>All the best</p>
                                </Typography>
                            </Paper>
                }
                </TimelineContent>

                </TimelineItem>
            }

            </div>
        );
    }
}
export default connect(state => ({
    studentReducer: state.studentReducer,
    mcqReducer : state.mcqReducer,
    examDetailsReducer: state.examDetailsReducer
}))(withStyles(useStyles)(SubjectList))
