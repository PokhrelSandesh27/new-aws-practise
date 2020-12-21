import React, { Component } from 'react'
import '../static/css/style.css'
import { connect } from 'react-redux'
import { searchTimeTable } from '../action'
import { get } from 'lodash'
import moment from 'moment'
import { parseTwoDigitYear } from 'moment'
import { pad } from 'redux-logger/src/helpers'
import { NavLink } from 'react-router-dom'
import { getAllClassroom } from '../../Home/actions'
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
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
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
class CreateTimetableClassroom extends Component {
    state = {}

    componentDidMount () {
        this.props.dispatch(getAllClassroom())
        // this.props.dispatch(getAllTimeTable())

    }

    render () {
        const { classes } = this.props;
        const { timetables, serchState } = this.props.timetableReducer
        const { classrooms, searchState } = this.props.classroomReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                    <Breadcrumbs aria-label="breadcrumb"
                                 style={{float: 'right'}}>
                        <StyledBreadcrumb onClick={this.props.history.goBack}
                                          component="a"
                                          label="Back"
                                          icon={<ArrowBackIosIcon fontSize="small" />}>

                        </StyledBreadcrumb>
                        <NavLink to={'/home/homePage'}>
                         <StyledBreadcrumb
                            component="a"
                            label="Home"/>
                        </NavLink>
                        <StyledBreadcrumb
                            component="a"
                            label="TimeTable"

                        />
                        <Typography variant={'inherit'} color={'secondary'}>
                          Class
                        </Typography>
                    </Breadcrumbs>
                    <br/> <br/>
                <div className="row">

                    {
                        serchState === 3 &&
                        <div>Something went wrong</div>
                    }
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            {
                                serchState === 1 &&
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
                            {
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                <TableCell align="center"><b>classRoom</b></TableCell>
                                                <TableCell align="center"><b>ViewDetails</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                classrooms.map((classroom, index) => {
                                                    return (
                                                        <TableRow >
                                                            <TableCell align="center">
                                                                {index+1}
                                                            </TableCell>
                                                            <TableCell align="center">{get(classroom, 'grade')}{get(classroom, 'section')}</TableCell>
                                                            <TableCell align="center">
                                                                <NavLink className="navlink" to={`/timetable/create/classroom/${classroom._id}`}>
                                                                    <Tooltip title="View Results" aria-label="add" arrow>

                                                                        <IconButton >
                                                                            <VisibilityIcon color={'primary'}/>
                                                                        </IconButton>

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
    classroomReducer: state.classroomReducer,
    timetableReducer: state.timetableReducer
}))(withStyles(useStyles)(CreateTimetableClassroom))
