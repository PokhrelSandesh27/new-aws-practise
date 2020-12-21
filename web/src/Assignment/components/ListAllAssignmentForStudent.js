import React, { Component } from 'react'
import { getAssignments, searchAssignment } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getGroups, getUser } from '../../utils'
import { NavLink } from 'react-router-dom'
import { get } from 'lodash'
import { getClassroomById } from '../../Home/actions'
import { getAllSubjects } from '../../Subject/actions'

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
import Button from '@material-ui/core/Button'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'

import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import FolderSpecialOutlinedIcon from '@material-ui/icons/FolderSpecialOutlined';
import material from "../../img/material.svg"
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
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
    class ListAllAssignmentForStudent extends Component {
        state = {
            set: null
        }
        type = this.props.type || 'Assignment'


        async componentDidMount () {

            const query = {}
            const d = getGroups()
            const user = getUser()
            if (d.includes('STUDENT')) {
                query.classroom = user.classroom
            }
            this.setState({
                set: this.props.type || 'list'
            })
            this.props.dispatch(getAllSubjects())
        }
        Create(){
            this.props.history.push("../../assignment-submission/submissions")

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
                    <div className="py-5 text-center">
                        {
                            this.props.location.msg &&
                            `\n Info:  ${this.props.location.msg}`
                        }
                        {/*<h2>{(this.type !== 'assignment') ? `My ${this.type}` : ''}.</h2>*/}

                    </div>
                    <div className="row">
                        <div className="col-md-6">
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
                                <Typography variant={"inherit"} color="secondary">E-Learning</Typography>
                                {/*<StyledBreadcrumb*/}
                                {/*    label=""*/}
                                {/*    deleteIcon={<ExpandMoreIcon />}*/}
                                {/*    onClick={this.handleClick()}*/}
                                {/*    onDelete={this.handleClick()}*/}
                                {/*/>*/}
                            </Breadcrumbs>

                            <div className="panel panel-primary">

                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                <TableCell align="center"><b>Subject</b></TableCell>
                                                <TableCell align="center"><b>Action</b></TableCell>



                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                subjects &&
                                                subjects.map((subject, i) => {
                                                    return (
                                                            <TableRow  hover>

                                                                <TableCell align="center">
                                                                    {i+1}
                                                                </TableCell>
                                                                <TableCell align="center">{subject.name}</TableCell>

                                                                <TableCell align="center"><NavLink className ="navlink"
                                                                                                   to={{
                                                                                                       pathname: `/assignment-submission/${this.type}/list/subject/${subject._id}`,
                                                                                                       data: {
                                                                                                       }
                                                                                                   }}>
                                                                    <Tooltip title="Assignments" aria-label="add" arrow>
                                                                        <Fab color={'primary'} className={classes.fab}>
                                                                        <IconButton >
                                                                           <AssignmentIcon/>
                                                                        </IconButton>
                                                                        </Fab>
                                                                    </Tooltip>

                                                                </NavLink>
                                                                   <NavLink
                                                                       className ="navlink"
                                                                       to={{
                                                                           pathname: `/assignment-submission/submission/list/subject/${subject._id}`,
                                                                           data: {
                                                                                                           }
                                                                                                       }}>
                                                                       <Tooltip title="Submissions" aria-label="add" arrow>
                                                                           <Fab style={{backgroundColor:"skyblue"}} className={classes.fab}>
                                                                               <IconButton >
                                                                                   <AssignmentTurnedInOutlinedIcon/>
                                                                               </IconButton>
                                                                           </Fab>
                                                                       </Tooltip>

                                                                    </NavLink>
                                                                    <NavLink className = "navlink"
                                                                             to={{

                                                                                 pathname: `/presentation/list/student/view/subject/${subject._id}`,
                                                                                 data: {
                                                                                 }
                                                                             }}>
                                                                        <Tooltip title="Material" aria-label="add" arrow>
                                                                            <Fab style={{backgroundColor:"lightgreen"}} className={classes.fab}>
                                                                                <IconButton >
                                                                                    <FolderSpecialOutlinedIcon/>
                                                                                </IconButton>
                                                                            </Fab>
                                                                        </Tooltip>

                                                                    </NavLink>
                                                                </TableCell>

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
