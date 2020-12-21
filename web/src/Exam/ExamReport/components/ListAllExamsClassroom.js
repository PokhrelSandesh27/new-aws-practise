import React, { Component } from 'react'
import { getExam } from '../../Exam/actions'
import { getAllClassroom } from '../../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
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
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
class ListAllExams extends Component {

    state = {
        type: null,
        exam: this.props.match.params.exam
    }

    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        const { _id } = getUser()
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getAllClassroom())
    }

    render () {
        const { classes } = this.props;
        const { exam, readState } = this.props.examReducer
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


                            <StyledBreadcrumb
                                component="a"
                                label="Reports"
                                onClick={this.props.history.goBack}

                            />


                            <Typography variant={'inherit'} color={'secondary'}>
                              {readState === 2 && exam.name}
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>


                <div className="row">

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Classroom</b></TableCell>

                                            <TableCell align="center"><b>Actions</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {  classrooms &&
                                        classrooms.map((classroom, i) => {

                                                return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{classroom.grade}{classroom.section}</TableCell>

                                                        <TableCell align="center"> <NavLink
                                                            className="navlink"
                                                            to={{
                                                                pathname: `/examreport/${this.state.type}/exam/${this.state.exam}/classroom/${classroom._id}`,
                                                            }}>
                                                            {
                                                                this.state.type === 'list' &&
                                                                <Tooltip title="View Results" aria-label="add" arrow>
                                                                    <Fab style={{backgroundColor:"lightGreen"}} className={classes.fab}>
                                                                        <IconButton >
                                                                            <VisibilityIcon/>
                                                                        </IconButton>
                                                                    </Fab>
                                                                </Tooltip>

                                                                ||
                                                                this.state.type === 'create' &&
                                                                <b>View Students</b>
                                                            }
                                                        </NavLink></TableCell>

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
    examReducer: state.examReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListAllExams))
