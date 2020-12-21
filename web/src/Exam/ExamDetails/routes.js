import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreateExamDetails from './components/CreateExamDetails'
import ListAllExams from './components/ListAllExams'
import ListAllExamsClassroom from './components/ListAllExamsClassroom'
import ListAllExamDetails from './components/ListAllExamDetails'
import CreateExams from './components/CreateExams'
import CreateExamsClassroom from './components/CreateExamsClassroom'
import ViewAnExamDetail from './components/ViewAnExamDetail'

const routes = () => {
    return (
        <Switch>
            {/*<Route path="/examdetails/create" component={CreateExamDetails}  exact/>*/}
            <Route path="/examdetails/list" component={ListAllExams}  exact/>
            <Route path="/examdetails/list/exam/:exam" component={ListAllExamsClassroom}  exact/>
            <Route path="/examdetails/list/exam/:exam/classroom/:classroom" component={ListAllExamDetails}  exact/>

            <Route path="/examdetails/create" component={CreateExams}  exact/>
            <Route path="/examdetails/create/exam/:exam" component={CreateExamsClassroom}  exact/>
            <Route path="/examdetails/create/exam/:exam/classroom/:classroom" component={CreateExamDetails}  exact/>

            <Route path="/examdetails/:id" component={ViewAnExamDetail}  exact/>

            <Redirect path="/examdetails" to='/examdetails/list'  exact/>
        </Switch>
    )
}

export default routes
