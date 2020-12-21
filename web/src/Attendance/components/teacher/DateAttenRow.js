import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { StyleWrapper } from '../../../styleWrapper'
import moment from 'moment'
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import Paper from "@material-ui/core/Paper";


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

const DateAttenRow = (props) => {

    const attendanceList = (props) =>{
        return props.attendance.map(attendance => {
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
    const events = attendanceList(props)
    const { attendance, id, key /*, classes */ } = props

    return (
        <React.Fragment key={key}>
            <div className="column" >
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                events={events}
                initialDate={ moment(props.month).format('YYYY-MM-DD')}
                    // { title: { attendance.isPresent ? 'P' : 'A'}, date:  {moment(attendance.dateTime).format('MMMM DD')} },


                 // datesSet={this.loadAttendance}
                // events={events}
            />
            </div>
            <div className={'column3'}>
                <Paper>
                    <Chart
                        data={data}
                    >
                        <ArgumentAxis />
                        <ValueAxis max={4} />

                        <BarSeries
                            valueField="atten"
                            argumentField="month"
                        />
                        <Animation />
                    </Chart>
                </Paper>
            </div>




            {/*<TableRow>*/}
            {/*    <TableCell align="center" padding={'checkbox'}>*/}

            {/*    </TableCell>*/}
            {/*    <TableCell align="center" padding={'checkbox'}>*/}
            {/*       /!*Day {moment(attendance.dateTime).format('MMMM DD')}*!/*/}
            {/*    </TableCell>*/}

            {/*    <TableCell align="center" style={{ backgroundImage: "linear-gradient(to right, #a6eb87 , whitesmoke)"}}>*/}
            {/*        {moment(attendance.dateTime).format('MMMM DD')}*/}
            {/*    </TableCell>*/}
            {/*    <TableCell  align="right"  style={{ backgroundImage: "linear-gradient(to right, whitesmoke, #a6eb87)"}} >*/}
            {/*      <b>{attendance.isPresent ? 'Present' : 'Absent'}</b>*/}
            {/*    </TableCell>*/}
            {/*</TableRow>*/}
        </React.Fragment>
    )
}


export default connect(state => ({}))(withStyles(useStyles)(DateAttenRow))
