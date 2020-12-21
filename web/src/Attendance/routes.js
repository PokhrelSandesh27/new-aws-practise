import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ViewAttendace from "./components/teacher/ViewAttendance";
import AttendanceTab from "./components/management/AttendanceTab";

import createAttendance from './components/teacher/CreateAttendance'
import attendanceTab from './components/teacher/attendanceTab'

import AttendanceTableView from './components/students/AttendanceTableView';
import AttendanceCalendarView from './components/students/AttendanceCalendarView'
import AttendancePiChart from "./components/students/AttendancePiChart";



const routes = () => {
    return (
        <Switch>
            {<Route path="/attendance/View" component={AttendanceTab} exact/>}

            {<Route path="/attendance/list" component={attendanceTab} exact/>}
            {<Route path="/attendance/class" component={createAttendance} exact/>}
            {<Route path="/attendance/list" component={ViewAttendace} exact/>}
            {<Route path="/attendance/view/student" component={AttendanceCalendarView} exact/>}
            {<Route path="/attendance/view/chart" component={AttendancePiChart} exact/>}
            {<Route path="/attendance/student/view" component={AttendanceTableView} exact/>}

            <Redirect from='/attendance' to='/attendance/list' exact/>
        </Switch>
    )
}

export default routes
