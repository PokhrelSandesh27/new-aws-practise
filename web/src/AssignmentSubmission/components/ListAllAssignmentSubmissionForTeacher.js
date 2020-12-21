import React, { Component } from 'react'
import { getAssignmentSubmissions, searchAssignmentSubmission } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getGroups, getUser } from '../../utils'
import { getAssignment } from '../../Assignment/actions'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
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
class ListAllAssignmentSubmissionForTeacher extends Component {

    async componentDidMount () {
        const assignment = this.props.match.params.id
        this.props.dispatch(searchAssignmentSubmission({ 'assignment': assignment }))
        this.props.dispatch(getAssignment(assignment))
    }

    render () {
        const { classes } = this.props;
        const { submissions, searchState} = this.props.assignmentSubmissionReducer
        const { assignment, readState } = this.props.assignmentReducer
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
                    <NavLink to={'/assignment/list'}>
                    <StyledBreadcrumb
                        component="a"
                        label="E-Learning"

                    />
                    </NavLink>

                    <StyledBreadcrumb
                        component="a"
                        label="Assignment"
                        onClick={this.props.history.goBack}

                    />
                    <Typography variant={'inherit'} color={'secondary'}>
                        Submitted
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>

                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <div className="row">


                                <div className="col-md-12 order-md-2">
                                    {/*<h4 className="mb-3">Submissions List for</h4>*/}
                                    {/* TODO Create a separate component for the following details*/}
                                            <Button variant="contained" style={{width:"100%"}}  color="primary">
                                            {
                                                readState === 2 &&



                                                `Classroom :  ${assignment.classroom.grade}  ${assignment.classroom.section}`

                                            }
                                            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                {
                                                    readState === 2 &&
                                                    `Subject : ${assignment.subject.name}`
                                                }
                                        </Button>

                                </div>
                            </div>
                            <br/>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Description</b></TableCell>
                                            <TableCell align="center"><b>Submitted By</b></TableCell>
                                            <TableCell align="center"><b>Attachment</b></TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { searchState === 2 &&
                                        submissions.map((submission, i) => {
                                            return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{submission.description}</TableCell>
                                                    <TableCell align="center">{(submission.student) ? submission.student.fullName : 'NA'}</TableCell>
                                                    <TableCell align="center">{
                                                        !!submission.link &&

                                                        <React.Fragment>
                                                            <a className="navlink"
                                                               href={submission.link} target="_blank"
                                                               download>Download  | </a>
                                                            &nbsp;
                                                            <NavLink
                                                                to={`/assignment-submission/submissions/${submission._id}`}> View</NavLink>
                                                        </React.Fragment>
                                                    }
                                                        {
                                                            !submission.link &&
                                                            'NA'
                                                        }</TableCell>

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
    assignmentSubmissionReducer: state.assignmentSubmissionReducer,
    assignmentReducer: state.assignmentReducer,
}))(withStyles(useStyles)(ListAllAssignmentSubmissionForTeacher))
