import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createBook, createIssue, searchBookAwait } from '../../actions'
import { get } from 'lodash'

import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Grid from '@material-ui/core/Grid'
import MyTextField from '../../../components/TextField'
import DatePicker from 'react-datepicker'
import { TextField } from '@material-ui/core'
import pic from '../../../img/student.svg'
import Button from '@material-ui/core/Button'
import { getAllSlot } from '../../../Slot/action'
import { getAllSubjects } from '../../../Subject/actions'
import { searchUserAwait, searchUsers } from '../../../User/actions'
import { searchTimeTable } from '../../../TimeTable/action'
import { getClassroomById } from '../../../Home/actions'
import { cleanObject } from '../../../utils'
import moment from 'moment'
import { createScholarConfig } from '../../../Payment2/actions'
import { toast } from 'react-toastify'

const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  variant="filled"

                                                                  style={{ width: "100%"}}/>

const StartDate = e => DatePickerInput('Date Issued', e)
const EndDate = e => DatePickerInput('To return', e)


class IssueBook extends Component {

    state = {
        date: new Date(),
        formatDate: '',
        book:[],
        user:[],
        search: {
            name: ''
        },
        searchUser:{
            username:''
        },
        localStore: {



        }
    }


    onDateChanged = (date, type) => {
        const localStore = {...this.state.localStore}
        localStore[type] = date
        this.setState({localStore})
    }

    searchOnchange = (event) => {
        const { search } = this.state
        search[event.target.name] = event.target.value

        this.setState({ search })

        // var searchText = evt.target.value // this is the search text
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.search(), 300)
    }

    search = async () => {
        const book = await this.props.dispatch(searchBookAwait(cleanObject(this.state.search)))
        const status = get(book, 'response.status')
        const { books, searchState } = this.props.libraryReducer
        if(searchState===2){
            this.setState({book:books})
            if(books.length>0)
                this.handler ('book', books[0]._id);
        }

        if (status === 400) {
            this.setState({
                error: get(book, 'response.data')
            })

        }
    }

    searchOnUser = (event) => {
        const { searchUser } = this.state
        searchUser[event.target.name] = event.target.value

        this.setState({ searchUser })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.searchuser(), 300)
    }

    searchuser = async () => {
        const user = await this.props.dispatch(searchUserAwait(cleanObject(this.state.searchUser)))

        const status = get(user, 'response.status')
        const {users,lookState} = this.props.userReducer
        console.log(lookState,"Response From user")
        if(lookState===2){
            this.setState({user:users})
            if(users.length>0)
                this.handler ('user', users[0]._id);
        }
        if (status === 400) {
            this.setState({
                error: get(user, 'response.data')
            })
        }
    }

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
        console.log(localStore,'local')
    }


    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    createIsue = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const req = {...localStore}
        console.log(req, "data alll here")
        this.props.dispatch(createIssue(req))
            .then((resp) => {
                toast.success('succesfully Added')
            })
            .catch(err => {
                toast.error('failed to Add');
            })

    }


    render () {
        const { classes } = this.props

        //



        //     console.log('books', books)
        // console.log('books', users)

        return (

                    <div className="page-content">
                    <h2>Issue book</h2>
                    <div className="columnIssue1">
                        {
                            this.state.book.map((book, index) => {

                            })
                        }
                        <img src="" width="270px" height="350px"></img>
                    </div>
            <form className={classes.root} onSubmit={this.createIsue.bind(this)}>
                    <div className="columnIssue">
                        <Card className="CardIssue" >
                            <div className="card2" >
                                <CardContent className ="card-body" >
                                    <h2 style={{textAlign:'center'}}>Issue Books</h2>
                                    <form className={classes.root}>

                                        <div className="col-md-8 order-md-2" style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            width: '100%',
                                            margin:'1%'

                                        }}>
                                            {/*{*/}
                                            {/*    searchState === 1 &&*/}
                                            {/*    <div>Searching</div>*/}
                                            {/*}*/}
                                            {/*{*/}
                                            {/*    searchState === 3 &&*/}
                                            {/*    <div>{this.state.error}</div>*/}
                                            {/*}*/}
                                            {/*{*/}
                                            {/*    searchState === 2 && !books.length &&*/}
                                            {/*    <div>No Records found</div>*/}
                                            {/*}*/}

                                            <Grid container justify="flex-start" spacing={6} style={{gap: "5%", margin:"1%"}}>

                                                <input
                                                    value={this.state.search.name}
                                                    type="text"
                                                    style={{ width: '30.8%'}}
                                                    className="inputBook"
                                                    id="name"
                                                    name="name"
                                                    data-action="filter"
                                                    data-filters="#dev-table"
                                                    placeholder="Book Name"
                                                    onInput={this.searchOnchange}
                                                />
                                            </Grid>
                                            <table className="table table-bordered" ng-show="qty !=null"
                                                   style={{border: "1px solid lightgrey"}}>
                                                <tbody>
                                                {
                                                    this.state.book.map((book, index) => {
                                                        return (
                                                            <tr>
                                                                {/*<td>*/}
                                                                {/*    <MyTextField id="outlined"*/}
                                                                {/*                 variant="outlined"*/}
                                                                {/*                 disabled*/}
                                                                {/*                 me='book'*/}
                                                                {/*                 value={book._id}*/}
                                                                {/*                 handler={this.handler}*/}
                                                                {/*                 label={book.author}*/}

                                                                {/*    />*/}
                                                                {/*</td>*/}
                                                                <td style={{background: "beige"}}>Author</td>
                                                                <td className="ng-binding">{book.author}</td>
                                                                <td style={{background: "beige"}}>SubTitle</td>
                                                                <td className="ng-binding">{book.subtitle}</td>
                                                                <td style={{background: "beige"}}>Description</td>
                                                                <td className="ng-binding">{book.description}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                </tbody>
                                            </table>


                                            <Grid container justify="flex-start" spacing={6} style={{gap: "5%", margin:"1%"}}>

                                                <input
                                                    value={this.state.searchUser.username}
                                                    type="text"
                                                    style={{ width: '30.8%'}}
                                                    className="inputBook"
                                                    id="username"
                                                    name="username"
                                                    data-action="filter"
                                                    data-filters="#dev-table"
                                                    placeholder="user Name"
                                                    onInput={this.searchOnUser}
                                                />
                                            </Grid>
                                            <table className="table table-bordered" ng-show="phone !=null"
                                                   style={{border: "1px solid lightgrey"}}>
                                                <tbody>
                                                {
                                                    this.state.user.map((user, index) => {
                                                        return (
                                                            <tr>
                                                            {/*    <td>*/}
                                                            {/*    <MyTextField id="outlined"*/}
                                                            {/*                 variant="outlined"*/}
                                                            {/*                 value={user._id}*/}
                                                            {/*                 disabled*/}
                                                            {/*                 me='user'*/}
                                                            {/*                 handler={this.handler}*/}
                                                            {/*                 label={user.fullName}*/}
                                                            {/*                 placeholder={user._id}*/}
                                                            {/*    />*/}
                                                            {/*</td>*/}
                                                                <td style={{background: "beige"}}>FullName</td>
                                                                <td className="ng-binding">{user.fullName}</td>
                                                                <td style={{background: "beige"}}>Email</td>
                                                                <td className="ng-binding">{user.email}</td>
                                                                <td style={{background: "beige"}}>Phone</td>
                                                                <td colSpan="4" className="ng-binding">{user.phone}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                <tr>

                                                </tr>
                                                </tbody>
                                            </table>

                                            <Button variant={'contained'} color={'primary'}
                                                    onClick={this.createIsue.bind(this)}>
                                                Issue
                                            </Button>


                                        </div>

                                    </form>

                                </CardContent>
                            </div>
                        </Card>


                    </div>
            </form>
                    </div>

        )
    }
}

export default connect(state => ({
    libraryReducer: state.libraryReducer,
    userReducer:state.userReducer
}))(withStyles(useStyles)(IssueBook))
