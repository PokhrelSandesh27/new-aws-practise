import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListUser from './components/ListUser'
import CreateUser from './components/Createuser'
import uploadProfilePicture from './components/uploadProfilePicture'
import ProfileView from './components/ProfileView'
import TeacherDetails from './components/TeacherDetails'
import StudentDetails from './components/StudentDetails'
import LibrarianDetails from './components/LibrarianDetails'
import ManagemnetDetails from './components/ManagemnetDetails'
import ListAllClassroom from "./components/ListAllClassroom";
import Validation from "./components/Validation";
import AccountDerails from './components/AccountDerails'
import staffs from './components/staffs'



const routes = () => {
    return (
        <Switch>


            <Route path="/user/list" component={ListUser}  exact/>
            <Route path="/user/create" component={CreateUser}  exact/>
            <Route path="/user/:id/upload" component={uploadProfilePicture}  exact/>
            <Route path="/user/view" component={ProfileView}  exact/>
            <Route path="/user/TeacherDetails" component={TeacherDetails}  exact/>
            <Route path="/user/StudentDetails/classroom/:classroom/" component={StudentDetails}  exact/>
            <Route path="/user/LibrarianDetails" component={LibrarianDetails}  exact/>
            <Route path="/user/AccountDetails" component={AccountDerails}  exact/>
            <Route path="/user/StaffsDetails" component={staffs}  exact/>
            <Route path="/user/classroom" component={ListAllClassroom}  exact/>


            <Route path="/user/validation" component={Validation}  exact/>
            <Route path="/user/ManagemnetDetails" component={ManagemnetDetails}  exact/>

            <Redirect from='/user' to='/user/list' exact/>
        </Switch>
    )
}

export default routes
