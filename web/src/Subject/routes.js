import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateSubject from './components/createSubject'
import ListSubjects from './components/ListSubjects'

const routes = () => {
    return (
        <Switch>
            <Route path="/subject/create" component={CreateSubject} exact/>
            <Route path="/subject/list" component={ListSubjects} exact/>
            <Redirect from='/subject' to='/subject/list' exact/>
        </Switch>
    )
}

export default routes
