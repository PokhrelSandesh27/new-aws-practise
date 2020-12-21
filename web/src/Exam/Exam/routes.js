import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreateExam from './components/CreateExam'
import ListAllExam from './components/ListAllExam'

const routes = () => {
    return (
        <Switch>
            <Route path="/exam/create" component={CreateExam}  exact/>
            <Route path="/exam/list" component={ListAllExam}  exact/>
            <Redirect from='/exam' to='exam/list' exact/>
        </Switch>
    )
}

export default routes
