import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreateExamReport from './components/CreateExamReport'
import ListAllExams from './components/ListAllExams'
import ListAllExamsClassroom from './components/ListAllExamsClassroom'
// import ListAllExamsClassroomStudent from './components/ListAllExamsClassroomStudent'
// import ListAllMarksheet from './components/ListAllMarksheet'
import CreateExams from './components/CreateExams'
import CreateExamsClassroom from './components/CreateExamsClassroom'
import ListAllExamsClassroomStudent from './components/ListAllExamsClassroomStudent'
import CreateExamsClassroomStudent from './components/CreateExamsClassroomStudent'
import ViewExamReport from './components/ViewExamReport'
// import CreateExamsClassroomStudent from './components/CreateExamsClassroomStudent'
// import CreateMarkSheet from './components/CreateMarkSheet'

const routes = () => {
    return (
        <Switch>
            <Route path="/examreport/list" component={ListAllExams}  exact/>
            <Route path="/examreport/list/exam/:exam" component={ListAllExamsClassroom}  exact/>
            <Route path="/examreport/list/exam/:exam/classroom/:classroom" component={ListAllExamsClassroomStudent}  exact/>
            <Route path="/examreport/list/exam/:exam/classroom/:classroom/student/:student" component={ViewExamReport}  exact/>

            <Route path="/examreport/create" component={CreateExams}  exact/>
            <Route path="/examreport/create/exam/:exam" component={CreateExamsClassroom}  exact/>
            <Route path="/examreport/create/exam/:exam/classroom/:classroom/" component={CreateExamsClassroomStudent}  exact/>
            <Route path="/examreport/create/exam/:exam/classroom/:classroom/student/:student" component={CreateExamReport}  exact/>

            <Redirect path="/examreport" to="/examreport/list"/>


        </Switch>
    )
}

export default routes
