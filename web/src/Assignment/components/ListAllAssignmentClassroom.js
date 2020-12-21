import React, { Component } from 'react'
import { getAssignments, searchAssignment } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getAllSubjects } from '../../Subject/actions'
import { getUser } from '../../utils'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
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
class ListAllAssignmentClassroom extends Component {

    state = {
        subject: null,
    }

    selectChanged = event => {
        this.setState({
            subject: event.target.value
        })

    }

    componentDidMount () {
        const { _id } = getUser()
        this.props.dispatch(getAllSubjects())

        const req = {
            classroom: this.props.match.params.id,
            teacher: _id
        }
        this.props.dispatch(searchAssignment(req))
    }

    render () {
        const { classes } = this.props;
        const { assignments } = this.props.assignmentReducer
        const { subjects } = this.props.subjectReducer
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
                            label="E-Learning"
                            onClick={this.props.history.goBack}

                        />

                    <Typography variant={"inherit"} color="primary">Assignment</Typography>


                    <Typography variant={"inherit"} color="secondary">View</Typography>
                </Breadcrumbs>
               <br/> <br/>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div>

                                <select name="subject" className="inputBook" style={{width:"100%"}}
                                        onChange={this.selectChanged}>
                                    <option value={null} selected>All Subjects</option>
                                    {
                                        subjects.map((subject) => {
                                            return (
                                                <option value={subject._id}> {subject.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <br/>

                            <div className="timeline">
                                <ul>
                                    {
                                        assignments &&
                                        assignments
                                            .filter((assignment) => !(this.state.subject !== null && assignment.subject !== this.state.subject))
                                            .map((assignment, i) => {

                                                return (
                                                <li>
                                            <NavLink
                                                           to={{
                                                               pathname: `/assignment/list/assignment-submissions/${assignment._id}`,

                                                           }} >
                                                        <span>View All Submissions</span>
                                                    </NavLink>
                                                    <div className="co">
                                                        <h3>Topic: {assignment.topic}</h3>
                                                        <p><b>Description</b>: {assignment.description}</p>
                                                        <p><b>Assignment </b>:
                                                            {(assignment.link) ?
                                                                <a href={assignment.link}
                                                                   target="_blank"
                                                                   download style={{color:'blue'}}>
                                                                    Download
                                                                </a> : 'NA'}
                                                        </p>
                                                    </div>
                                                </li>
                                            )

                                        })
                                    }
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    assignmentReducer: state.assignmentReducer,
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListAllAssignmentClassroom))
