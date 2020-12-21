import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateTimeTable from './components/CreateTimeTable'
import ListTimeTableClassroom from './components/ListTimeTableClassroom'
import ListTimeTable from './components/ListTimeTable'
import CreateTimetableClassroom from './components/CreateTimetableClassroom'
import UpdateSlotTimeTable from './components/UpdateSlotTimeTable'
import TeacherViewTimeTable from './components/TeacherViewTimeTable'
import StudentViewTimeTable from './components/StudentViewTimeTable'
import VideoCall from './components/VedioCall'
import { getUser, ProtectedComponents } from '../utils'



const routes = () => {
    return (
        <Switch>
            {<Route path="/timetable/create/classroom" component={CreateTimetableClassroom} exact/>}
            <Route path="/timetable/create/classroom/:id" component={CreateTimeTable} exact/>
            <Route path="/timetable/video/:id" component={VideoCall} exact/>
            <Route path="/timetable/teacher" component={TeacherViewTimeTable} exact/>
            <Route path="/timetable/student/classroom" component={StudentViewTimeTable} exact/>
            {<Route path="/timetable/list/classroom" component={ListTimeTableClassroom} exact/>}
            {<Route path="/timetable/classroom/:id" component={ListTimeTable} exact/>}
            {<Route path="/timetable/classroom/slot/:id" component={UpdateSlotTimeTable} exact/>}
            <Redirect from='/timetable' to='/timetable/create/classroom' exact/>
        </Switch>
    )
}

export default routes
