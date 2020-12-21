import React, { Component } from 'react'
import { getAssignments, searchAssignment } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getGroups, getUser } from '../../utils'
import { NavLink } from 'react-router-dom'
import { get } from 'lodash'
import { getClassroomById } from '../../Home/actions'
import { getSubject } from '../../Subject/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

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
class ListAllAssignmentForStudent extends Component {

  type = this.props.type || 'assignment'

    async componentDidMount () {
        const subject = this.props.subject || this.props.match.params.id
        const query = {}
        const d = getGroups()
        const user = getUser()
        if (d.includes('STUDENT')) {
            query.classroom = user.classroom._id
        }
        query.subject = subject
        this.props.dispatch(searchAssignment(query))
        this.props.dispatch(getSubject(this.subject))
    }

    render () {
        const { classes } = this.props;
        const { assignments } = this.props.assignmentReducer
        const { subject, getState: subjectGetState } = this.props.subjectReducer
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">

                    {/*<h2>List of assignments.</h2>*/}

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
                    <Typography variant={"inherit"} color="secondary">Assignments</Typography>
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
                            <div className="timeline">
                                <ul>
                                    {
                                        assignments &&
                                        assignments.map((assignment, i) => {
                                            return (
                                                <li>
                                            <NavLink
                                                to={{
                                                    pathname: `/assignment-submission/create/submission/${assignment._id}`,
                                                }}>
                                                <span>Submit</span>
                                                        </NavLink>

                                                    <div className="co">
                                                        <h3>Topic: {assignment.topic}</h3>
                                                        <p><b>Assignment </b>:
                                                            {
                                                                !!assignment.link &&

                                                                <React.Fragment>
                                                                    <a href={assignment.link} target="_blank"
                                                                       download>Download</a>
                                                                    &nbsp;
                                                                    <NavLink
                                                                        to={`/assignment/view/${assignment._id}`}>View</NavLink>
                                                                </React.Fragment>
                                                            }
                                                            {
                                                                !assignment.link &&
                                                                'NA'
                                                            }
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
}))(withStyles(useStyles)(ListAllAssignmentForStudent))
