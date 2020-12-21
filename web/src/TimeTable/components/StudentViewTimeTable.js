import React, { Component } from 'react'
import '../static/css/style.css'
import { connect } from 'react-redux'
import { get, map } from 'lodash'
import { getUser } from '../../utils'
import { getGroups } from '../../utils'
import {  searchTimeTable } from '../action'
import moment from 'moment'
import { getAllSlot } from '../../Slot/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Container from '@material-ui/core/Container'
import TableContainer from '@material-ui/core/TableContainer'
import {emphasize, Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Copyright } from '@material-ui/icons'
import Box from '@material-ui/core/Box'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Chip from "@material-ui/core/Chip";
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

class studentViewTimeTable extends Component {


    componentDidMount () {

        const query = {}
        const d = getGroups()
        const user = getUser()
        if (d.includes("STUDENT")) {
            query.classroom = user.classroom._id
        }
        this.props.dispatch(searchTimeTable(query))
        this.props.dispatch(getAllSlot())

    }
    getSubject=(timetable, slotId) => {

        const datesub = timetable.filter(t => get(t, 'slot._id') === slotId)
        if (datesub.length > 0) {
            return datesub[0].subject.name
        } else {
            return ""
        }
    }
    createSub (timetable, slotId) {
        const entry = timetable.find(t => get(t, 'slot._id') === slotId)
        const id = get(entry, '_id')
        this.props.history.push('/timetable/video/'+ id)
    }

    render () {
        const { classes } = this.props;
        const { timetables, serchState } = this.props.timetableReducer
        const { slots, fetchState: slotFetchState } = this.props.slotReducer
        const sundayTimeTable = timetables.filter(t => t.day === 'Sunday')
        const mondayTimeTable = timetables.filter(t => t.day === 'Monday')
        const tuesTimeTable = timetables.filter(t => t.day === 'Tuesday')
        const wednTimeTable = timetables.filter(t => t.day === 'Wednesday')
        const thrusTimeTable = timetables.filter(t => t.day === 'Thursday')
        const friTimeTable = timetables.filter(t => t.day === 'Friday')
        const saturday = timetables.filter(t => t.day === 'Saturday')

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
                        <NavLink to={'/home/homepage'}>
                            <StyledBreadcrumb
                                component="a"
                                label="Home"
                                icon={<HomeIcon fontSize="small" />}

                            />
                        </NavLink>
                        <Typography variant={"inherit"} color="secondary">Schedule</Typography>
                        {/*<StyledBreadcrumb*/}
                        {/*    label=""*/}
                        {/*    deleteIcon={<ExpandMoreIcon />}*/}
                        {/*    onClick={this.handleClick()}*/}
                        {/*    onDelete={this.handleClick()}*/}
                        {/*/>*/}
                    </Breadcrumbs>
                <div className="row" >
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


                                serchState===  2 &&
                                <TableContainer component={Paper}>
                                <table class="assingmentTable">

                                    <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>saturday</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        slots.map((period, index) => {
                                            return (

                                                <tr>
                                                    <td>{moment(period.startTime, "hmm").format("HH:mm")}-{moment(period.endTime, "hmm").format("HH:mm")}</td>

                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(sundayTimeTable, period._id) ? this.createSub.bind(this, sundayTimeTable, period._id) :''}>
                                                        {this.getSubject(sundayTimeTable, period._id)}
                                                    </td>
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(mondayTimeTable, period._id) ? this.createSub.bind(this, mondayTimeTable, period._id) :''}>
                                                        {this.getSubject(mondayTimeTable, period._id)}
                                                    </td>
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(tuesTimeTable, period._id) ? this.createSub.bind(this, tuesTimeTable, period._id) :''}>
                                                        {this.getSubject(tuesTimeTable, period._id)}
                                                    </td >
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(wednTimeTable, period._id) ? this.createSub.bind(this, wednTimeTable, period._id) :''}>
                                                        {this.getSubject(wednTimeTable, period._id)}
                                                    </td>
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(thrusTimeTable, period._id) ? this.createSub.bind(this, thrusTimeTable, period._id) :''}>
                                                        {this.getSubject(thrusTimeTable, period._id)}
                                                    </td>
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(friTimeTable, period._id) ? this.createSub.bind(this, friTimeTable, period._id) :''} >
                                                        {this.getSubject(friTimeTable, period._id)}
                                                    </td>
                                                    <td className="navlink" style={{color:"black"}} onClick={this.getSubject(saturday, period._id) ? this.createSub.bind(this, saturday, period._id) :''} >
                                                        {this.getSubject(saturday, period._id)}
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>

                                </table>
                                </TableContainer>
                            }


                            {
                                serchState === 3 &&
                                <div>Something went wrong</div>
                            }
                        </div>

                    </div>
                </div>
            </div>
                    <Box pt={4}>

                    </Box>
                </Container>
            </main>
        )

    }

}
export default connect(state => ({
    slotReducer:state.slotReducer,
    timetableReducer: state.timetableReducer
}))(withStyles(useStyles)(studentViewTimeTable))
