import React, { Component } from 'react'
import { getAssignmentSubmissions, searchAssignmentSubmission } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getUser } from '../../utils'
import { getSubject } from '../../Subject/actions'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
class ListAllAssignmentSubmissionSubject extends Component {

    subject = this.props.match.params.id
    classroom = null

    componentDidMount () {
        const user = getUser()
        this.classroom = user.classroom._id
        const req = {
            // "classroom": user.classroom,
            "student":user._id,
            // "subject": this.subject
        }
        // We cam only search assignment via assignments/
        // For now filtering the response
        this.props.dispatch(searchAssignmentSubmission(req))
        this.props.dispatch(getSubject(this.subject))
    }

    render () {
        const { classes } = this.props;
        const { submissions, searchState } = this.props.assignmentSubmissionReducer
        const { subject, getState: subjectGetState } = this.props.subjectReducer
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
                    <NavLink to={'/assignment-submission/assignments'}>
                        <StyledBreadcrumb
                            component="a"
                            label="E-Learning"


                        />
                    </NavLink>
                    <Typography variant={"inherit"} color="secondary">Submitted</Typography>
                    {/*<StyledBreadcrumb*/}
                    {/*    label=""*/}
                    {/*    deleteIcon={<ExpandMoreIcon />}*/}
                    {/*    onClick={this.handleClick()}*/}
                    {/*    onDelete={this.handleClick()}*/}
                    {/*/>*/}
                </Breadcrumbs>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <br></br>
                            {searchState===1&&
                            <div>
                                <CircularProgress
                                                className={this.props.classes.progressCircle}
                                                size={40}
                                                left={-20}
                                                top={10}
                                                status={'loading'}
                                                style={{marginLeft: '50%', marginTop: '20%'}}
                                                disableShrink/>
                                        </div>
                            }

                            {searchState===2 &&

                            <div className="timeline">
                                <ul>
                                    {
                                        submissions &&
                                        submissions.map((submission, i) => {
                                            if (!submission.student)
                                                return;
                                            if (submission.assignment.classroom !== this.classroom || submission.assignment.subject !== this.subject)
                                                return;
                                            return (
                                                <li>
                                                    <span>
                                                      {
                                                          !!submission.link &&

                                                          <React.Fragment>
                                                              <a href={submission.link} target="_blank"
                                                                 download>Download</a>
                                                              &nbsp;
                                                              <NavLink
                                                                  to={`/assignment-submission/submissions/${submission._id}`}>View</NavLink>
                                                          </React.Fragment>
                                                      }
                                                        {
                                                            !submission.link &&
                                                            'Not Available'
                                                        }
                                                    </span>

                                                    <div className="co">

                                                        <h3><b>Topic </b>:
                                                            {submission.assignment.topic}
                                                        </h3>
                                                        <p><b>Description</b>: {submission.description}</p>
                                                        <p> Teacher's Attachment: {
                                                            !!submission.assignment.link &&

                                                            <React.Fragment>
                                                                <a href={submission.assignment.link} target="_blank"
                                                                   download>Download</a>
                                                                &nbsp;
                                                                <NavLink
                                                                    to={`/assignment/view/${submission.assignment._id}`}>View</NavLink>
                                                            </React.Fragment>
                                                        }
                                                            {
                                                                !submission.assignment.link &&
                                                                'NA'
                                                            }</p>

                                                    </div>
                                                </li>

                                            )

                                        })
                                    }
                                </ul>
                            </div>
                            }
                            {
                                searchState===3&&
                                    <div>
                                        <p>please check your internet connection</p>
                                    </div>

                            }

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
    assignmentSubmissionReducer: state.assignmentSubmissionReducer,
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListAllAssignmentSubmissionSubject))
