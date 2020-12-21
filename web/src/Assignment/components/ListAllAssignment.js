import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getAllClassroom } from '../../Home/actions'

import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from "../../TablePagination";
import TableSearch from "../../TableSearch";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddStudents from "../../Student/components/AddStudents";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
class ListAllAssignment extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({
            type: this.props.type || 'List'
        })

        this.props.dispatch(getAllClassroom())
    }
    Create (){
        this.props.history.push("../assignment/create")
    }

    render () {
        const { classes } = this.props;
        const { classrooms } = this.props.classroomReducer
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
                    <Typography variant={"inherit"} color="secondary">E-Learning</Typography>

                </Breadcrumbs>
                <br/>

                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        {/*<TableSearch></TableSearch>*/}
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Classroom</b></TableCell>
                                            <TableCell align="center"><b>Assignments</b></TableCell>
                                            <TableCell align="center"><b>Materials</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {classrooms.map((classroom, i) => {

                                            return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{classroom.grade}{classroom.section}</TableCell>
                                                    <TableCell align="center">
                                                        <NavLink
                                                            className="navlink"
                                                                 to={{pathname: `/assignment/list/classroom/${classroom._id}`,}} >

                                                            <Tooltip title="View Results" aria-label="add" arrow>
                                                                <Fab style={{backgroundColor:"skyblue"}} className={classes.fab}>
                                                                    <IconButton >
                                                                        <VisibilityIcon/>
                                                                    </IconButton>
                                                                </Fab>
                                                            </Tooltip>

                                                            &nbsp; &nbsp;
                                                    </NavLink>

                                                        <NavLink className="navlink"
                                                                 to={{
                                                                     pathname: `/assignment/create/classroom/${classroom._id}`,
                                                                 }} >
                                                            <Tooltip title="View Results" aria-label="add" arrow>
                                                                <Fab style={{backgroundColor:"skyblue"}} className={classes.fab}>
                                                                    <IconButton >
                                                                        <AddCircleOutlineIcon/>
                                                                    </IconButton>
                                                                </Fab>
                                                            </Tooltip>
                                                        </NavLink>

                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <NavLink
                                                            to={{
                                                                pathname: `../../presentation/list/classroom/${classroom._id}`,
                                                            }} >
                                                            <Tooltip title="View Results" aria-label="add" arrow>
                                                                <Fab style={{backgroundColor:"lightGreen"}} className={classes.fab}>
                                                                    <IconButton >
                                                                        <VisibilityIcon/>
                                                                    </IconButton>
                                                                </Fab>
                                                            </Tooltip>

                                                        </NavLink>
                                                        &nbsp; &nbsp;
                                                        <NavLink
                                                            to={{
                                                                pathname: `../../presentation/create/classroom/${classroom._id}`,
                                                            }} >
                                                            <Tooltip title="View Results" aria-label="add" arrow>
                                                                <Fab style={{backgroundColor:"lightGreen"}} className={classes.fab}>
                                                                    <IconButton >
                                                                        <AddCircleOutlineIcon/>
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
                                <TablePagination>

                                </TablePagination>
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
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListAllAssignment))
