import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SelectionPage from './components/Teacher/SelectionPage'
import CreateQuestion from './components/Teacher/CreateQuestion'
import ViewQuestionList from './components/Teacher/ViewQuestionList'
import ClassSelection from './components/Teacher/ClassSelection'
import TermSelection from './components/Teacher/TermSelection'
import ExamDetailsList from './components/Teacher/ExamDetailsList'
import CreateExamDetails from './components/Teacher/CreateExamDetails'
import Test from './components/MCQ'
import MCQList from './components/Student/MCQList'
import ListTimeTable from '../TimeTable/components/ListTimeTable'
import MCQsubject from './components/Student/MCQsubject'
import AllQuestionlist from './components/Student/AllQuestionlist'
import QuestionSheet from './components/Student/QuestionSheet'


const routes = () => {
    return (
        <Switch>
            <Route path="/exam/term" component={TermSelection}  exact/>
            <Route path="/exam/term/:termId" component={ClassSelection}  exact/>
            {/*<Route path="/exam/class" component={ClassSelection}  exact/>*/}

            {/*<Route path="/exam/class" component={ClassSelection}  exact/>*/}
            {/*<Route path="/exam/class/:classroomId" component={TermSelection}  exact/>*/}
            <Route path="/exam/term/:termId/classroom/:classroomId" component={ExamDetailsList}  exact/>
            <Route path="/exam/class/:classroomId/term/:termId/examdetails/create" component={CreateExamDetails}  exact/>

            {/*<Route path="/exam/term/class/:id" component={TermSelection}  exact/>*/}
            {/*<Route path="/exam/term/examDetails" component={ExamDetailsList}  exact/>*/}
            {/*<Route path="/exam/term/examDetails/create" component={CreateExamDetails}  exact/>*/}



            <Route path="/exam/class/:classroomId/term/:termId/examdetail/:examDetailId" component={CreateQuestion}  exact/>
            <Route path="/questions/teacher/list" component={ViewQuestionList}  exact/>
            <Route path="/mcq/action" component={SelectionPage}  exact/>
            <Route path="/mcq/tes" component={Test} exact/>

            <Route path="/mcq/examlist" component={MCQList} exact/>
            <Route path="/mcq/List/examDetails/:id" component={AllQuestionlist} exact/>


            <Route path="/mcq/list/classroom/:classroom/subject/:subject/question/:question" component={AllQuestionlist}  exact/>
            <Route path="/mcq/question/:id" component={QuestionSheet} exact/>
            {<Route path="/mcq/exam/:exam/:id" component={MCQsubject} exact/>}


            <Redirect from='/mcq' to='/mcq/action' exact/>
        </Switch>
    )
}

export default routes
