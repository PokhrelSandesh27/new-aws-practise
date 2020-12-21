import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { connect } from 'react-redux'
import moment, { isMoment } from 'moment'
import { searchAttendance} from '../../action'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { StyleWrapper } from '../../../styleWrapper'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';


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



const data = [
    { month: 'JAN', atten: 2 },
    { month: 'FEB', atten: 4 },
    { month: 'MARCH', atten: 8 },
    { month: 'APRIL', atten: 10 },
    { month: 'JUN', atten: 20 },
    { month: 'JULY', atten: 30 },
    { month: 'AUG', atten: 21 },
    { month: 'SEPT', atten: 22 },
    { month: 'OCT', atten: 15 },
    { month: 'NOV', atten: 11 },
    { month: 'DEC', atten: 18 },

];

class AttendanceCalendarView extends Component {

    state = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        user: getUser()._id,
        startDate: moment.utc().startOf('month').valueOf(),
        endDate: moment.utc().endOf('month').valueOf(),
        data
    }

    componentDidMount () {
        this.refreshList()
    }

    refreshList (data = {}) {
        const { startDate, endDate, user } = this.state
        const req = {user: user, ...data}
        console.log("req in refresh List", req)
        this.props.dispatch(searchAttendance(req))
    }

    loadAttendance = (args) => {
        console.log("args ", args)
        const month = parseInt((args.end.getMonth() + 1 + args.start.getMonth() + 1) / 2)
        const year = args.end.getFullYear()

        const startDate = moment.utc(year+'-'+month).startOf('month').valueOf()
        const endDate = moment.utc(year+'-'+month).endOf('month').valueOf()
        const req = { startDate:startDate, endDate:endDate}
        this.setState({startDate, endDate})
        this.refreshList(req)


    }

    attendanceList (attendances) {
        console.log("event list ", attendances)
        return attendances.map(attendance => {
            const date = moment(attendance.dateTime).format('YYYY-MM-DD')
            return {
                id: attendance._id,
                allDay: true,
                title: attendance.isPresent ? 'P' : 'A',
                start: date,
                end: date
            }
        })
    }

    render () {
        const events = this.attendanceList(this.props.attendanceReducer.attendances)
        const {classes} = this.props;
        console.log("attendance reducer", this.props.attendanceReducer)
        const { data: chartData } = this.state;

        return (

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div>
                            <div>

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
                                    <NavLink to={'/attendance/view/chart'}>
                                        <StyledBreadcrumb
                                            component="a"
                                            label="Attendance"
                                        />
                                    </NavLink>
                                    <Typography variant={"inherit"} color="secondary">Calender</Typography>
                                    {/*<StyledBreadcrumb*/}
                                    {/*    label=""*/}
                                    {/*    deleteIcon={<ExpandMoreIcon />}*/}
                                    {/*    onClick={this.handleClick()}*/}
                                    {/*    onDelete={this.handleClick()}*/}
                                    {/*/>*/}
                                </Breadcrumbs>

                            </div>

                            <div  className={'column'}>
                                <StyleWrapper >
                                    <FullCalendar
                                        plugins={[dayGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        datesSet={this.loadAttendance}
                                        events={events}
                                        themeSystem={'standard'}

                                    />
                                </StyleWrapper>

                            </div>
                            <div className={'column3'}>
                                <Paper>
                                    <Chart
                                        data={chartData}
                                    >
                                        <ArgumentAxis />
                                        <ValueAxis max={4} />

                                        <BarSeries
                                            valueField="atten"
                                            argumentField="month"
                                        />
                                        <Title text="My Attendance" />
                                        <Animation />
                                    </Chart>
                                </Paper>
                            </div>
                        </div>

                    </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    attendanceReducer: state.attendanceReducer,
}))(withStyles(useStyles)(AttendanceCalendarView))
