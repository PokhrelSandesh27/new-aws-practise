import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ListStudents from './components/ListStudents'
import AddStudents from './components/AddStudents'

const routes = () => {
    return (
        <Switch>
            <Route path="/student/list" component={ListStudents} exact/>
            <Route path="/student/create" component={AddStudents} exact/>
            <Redirect from='/student' to='/student/list' exact/>
        </Switch>
    )
}

export default routes
