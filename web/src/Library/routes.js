import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListAllBook from './components/ListAllBook'
import CreateBook from './components/CreateBook'
import UploadBooks from './components/UploadBooks'
import StudentView from './components/StudentView'
import IssueBook from './components/IssueBook/IssueBook'
import ListIssuedBook from './components/IssueBook/ListIssuedBook'
import MyBook from './components/student/MyBook'
import IssueTab from './components/IssueBook/IssueTab'
import DetailsBook from "./components/student/DetailsBook";


const routes = () => {
    return (
        <Switch>

           {/*// <Route path="/book/create" component={CreateBook}  exact/>*/}
            <Route path="/library/list" component={ListAllBook}  exact/>
            <Route path="/library/studentBook" component={StudentView}  exact/>
            <Route path="/library/create" component={CreateBook}  exact/>
            <Route path="/library/:id/upload" component={UploadBooks}  exact/>
            <Route path="/book/issue" component={IssueBook}  exact/>
            <Route path="/list/issued" component={ListIssuedBook}  exact/>
            <Route path="/list/mybook/"component={MyBook} exact/>
            <Route path="/details/book/"component={DetailsBook} exact/>
            <Route path="/Tab/issue/"component={IssueTab} exact/>



            <Redirect from='/library' to='/library/list' exact/>
        </Switch>
    )
}

export default routes
