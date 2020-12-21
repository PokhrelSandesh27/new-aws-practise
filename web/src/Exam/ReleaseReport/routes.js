import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListAllExams from './components/ListAllExams'
import ListAllExamsClassroom from './components/ListAllExamsClassroom'
import CreateExams from './components/CreateExams'
import CreateExamsClassroom from './components/CreateExamsClassroom'
import CreateMarkSheet from './components/CreateMarkSheet'
import ListAllExamsClassroomStudent from './components/ListAllExamsClassroomStudent'
import CreateExamsClassroomStudent from './components/CreateExamsClassroomStudent'
import ListAllMarksheet from './components/ListAllMarksheet'
import TeacherView from './components/TeacherView'
import ListAllExamsStudent from './components/student/ListAllExams'
import ViewMarksheet from './components/student/ViewMarksheet'

const routes = () => {
    return (
        <Switch>

            <Route path="/marksheets/list" component={ListAllExams}  exact/>
            <Route path="/marksheets/Teacher" component={TeacherView}  exact/>
            <Route path="/marksheets/list/exam/:exam" component={ListAllExamsClassroom}  exact/>
            <Route path="/marksheets/list/exam/:exam/classroom/:classroom/:type" component={ListAllExamsClassroomStudent}  exact/>
            <Route path="/marksheets/list/exam/:exam/classroom/:classroom/:type/:typeId" component={ListAllMarksheet}  exact/>

            <Route path="/marksheets/create" component={CreateExams}  exact/>
            <Route path="/marksheets/create/exam/:exam" component={CreateExamsClassroom}  exact/>
            <Route path="/marksheets/create/exam/:exam/classroom/:classroom/:type" component={CreateExamsClassroomStudent}  exact/>
            <Route path="/marksheets/create/exam/:exam/classroom/:classroom/:type/:typeId" component={CreateMarkSheet}  exact/>

            <Route path="/grade/list" component={ListAllExamsStudent}  exact/>
            <Route path="/grade/exam/:id" component={ViewMarksheet}  exact/>

            <Redirect path="/marksheets" to="/marksheets/list"/>
            <Redirect path="/grade" to="/grade/list"/>
        </Switch>
    )
}

export default routes
