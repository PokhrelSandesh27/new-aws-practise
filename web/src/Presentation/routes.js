import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ListPresentation from './components/ListPresentation'
import ListPresentationClassroom from './components/ListPresentationClassroom'
import CreatePresentation from './components/CreatePresentation'
import CreatePresentationClassroom from './components/CreatePresentationClassroom'
import ListPresentationStudents from './components/ListPresentationStudents'
import ListPresentationStudentSubject from './components/ListPresentationStudentSubject'


const routes = () => {
    return (
        <Switch>

            <Route path="/presentation/create/classroom/:id" component={CreatePresentation} exact/>
            <Route path="/presentation/create" component={CreatePresentationClassroom}  exact/>
            <Route path="/presentation/list" component={ListPresentationClassroom}  exact/>
            <Route path="/presentation/list/classroom/:id" component={ListPresentation} exact/>
            <Route path="/presentation/list/student/view" component={ListPresentationStudentSubject} exact/>
            <Route path="/presentation/list/student/view/subject/:id" component={ListPresentationStudents} exact/>

            <Redirect from='/presentation' to='/presentation/create' exact/>
        </Switch>
    )
}

export default routes
