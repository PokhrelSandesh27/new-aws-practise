import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ListAllAssignment from './components/ListAllAssignment'
import ListAllAssignmentForStudent from './components/ListAllAssignmentForStudent'
import CreateAssignmentClassroom from './components/CreateAssignmentClassroom'
import ListAllAssignmentClassroom from './components/ListAllAssignmentClassroom'
import CreateAssignment from './components/CreateAssignment'
import ListAllAssignmentSubjectForStudent from './components/ListAllAssignmentSubjectForStudent'
import ViewAssignment from './components/ViewAssignment'
// import ListAllAssignmentByClassroom from './components/ListAllAssignmentByClassroom'


const routes = () => {
    return (
        <Switch>
            <Route path="/assignment/create/classroom/:id" component={CreateAssignmentClassroom} exact/>
            <Route path="/assignment/create" component={CreateAssignment}  exact/>
            <Route path="/assignment/list" component={ListAllAssignment}  exact/>

            <Route path="/assignment/view/:assignment" component={ViewAssignment} exact/>

            <Route path="/assignment/list/classroom/:id" component={ListAllAssignmentClassroom} exact/>
            <Route path="/assignment-submission/assignments" component={ListAllAssignmentForStudent} exact/>
            <Route path="/assignment-submission/assignment/list/subject/:id" component={ListAllAssignmentSubjectForStudent} exact/>

            <Redirect from='/assignment' to='/assignment/list' exact/>
        </Switch>
    )
}

export default routes
