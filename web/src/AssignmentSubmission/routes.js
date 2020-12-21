import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateAssignmentSubmission from './components/CreateAssignmentSubmission'
import ListAllAssignmentSubmission from './components/ListAllAssignmentSubmission'
import ListAllAssignmentSubmissionForTeacher from './components/ListAllAssignmentSubmissionForTeacher'
import ListAllAssignmentSubmissionSubject from './components/ListAllAssignmentSubmissionSubject'
import ViewAssignmentSubmission from './components/ViewAssignmentSubmission'


const routes = () => {
    return (
        <Switch>
            <Route path="/assignment-submission/create/submission/:id" component={CreateAssignmentSubmission} exact/>
            <Route path="/assignment/list/assignment-submissions/:id" component={ListAllAssignmentSubmissionForTeacher} exact/>
            <Route path="/assignment-submission/submissions" component={ListAllAssignmentSubmission} exact/>
            <Route path="/assignment-submission/submissions/:submission" component={ViewAssignmentSubmission} exact/>
            <Route path="/assignment-submission/submission/list/subject/:id" component={ListAllAssignmentSubmissionSubject} exact/>

            <Redirect from='/assignment-submission' to='/assignment-submission/assignments' exact/>
        </Switch>
    )
}

export default routes
