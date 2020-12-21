import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    getAllBookDataAwait,
    returnBook,
    payOverdueFine,
    searchBookIssueAwait
} from '../../actions'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faList } from '@fortawesome/free-solid-svg-icons'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import moment from 'moment'
import { get } from 'lodash'
import { cleanObject } from '../../../utils'
import { getAllUsers} from '../../../User/actions'
import MyTextField from '../../../components/TextField'
import {Autocomplete} from "@material-ui/lab";



const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  variant="filled"

                                                                  style={{ width: "100%"}}/>

class ListIssuedBook extends Component {

    state = {
        localStore: {
            user: null
        },
        fine : 0,
        search: {
            text: '',
            user:''
        },
       searchUser:{
            username:''
        },
        books :[],
        book:[],

    }

    componentDidMount () {
        this.props.dispatch(getAllUsers())
        this.fetchData()
    }

    onReturn = (book, index) => {
        const Id = book._id
        console.log(Id, "show me id")
        if (this.state.fine > 0){
            this.props.dispatch(payOverdueFine(Id))
        }
        this.props.dispatch(returnBook(Id))
        setTimeout(() => this.fetchData(), 300)
    }

    fetchData = async() =>{
        const book = await this.props.dispatch(getAllBookDataAwait())
        const status = get(book, 'value.status')
        console.log(status,"my status")
        if(status===200){
            const{books, readAllState} = this.props.libraryReducer

            if(readAllState===2){
                this.setState({books})
            }
        }

    }

    userChanged = (event,option) => {
        const { search } = this.state
        // this.handler('receiver', get(this.getUser(option), '_id', ''))
        search[event.target.name] = event.target.value
        this.setState({ search })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.search(), 300)
    }


    searchOnchange = (event) => {
        const { search } = this.state
        search[event.target.name] = event.target.value

        this.setState({ search })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.search(), 300)
    }

    getOptionLabel = (option) => {
        if (!option) return ''
        const user = this.getUser(option)
        return `${user.fullName}-${user.groups[0]}`
    }
    getUser = (option) => get(option, 'student', option)

    // receiverChanged = (e, option) => this.handler('receiver', get(this.getUser(option), '_id', ''))
    handler = (me, value) =>
    {
        this.setState({ localStore: { ...this.state.localStore, [me]: value } })
    }

    search = async () => {
        const book = await this.props.dispatch(searchBookIssueAwait(cleanObject(this.state.search)))
        const status = get(book, 'response.status')
        const { books, searchState } = this.props.libraryReducer
        if(searchState===2){
            console.log(searchState, 'read')
            this.setState({book:books})

        }

        if (status === 400) {
            this.setState({
                error: get(book, 'response.data')
            })

        }
    }

    render () {
        const {users} = this.props.userReducer
        const { classes } = this.props
        const options = users


        return (

                    <div className="page-content">
                        <h2>Issue book</h2>
                        <Paper>
                            <Grid container justify="flex-start" style={{ margin:"0%"}}>
                                <div style={{border: "1px solid lightgrey", width:"33%"}}>
                                <FontAwesomeIcon
                                    icon={faFilter}
                                    style={{
                                        marginLeft:"2%",
                                        marginRight:"3%"
                                    }}
                                />
                                    <input
                                        value={this.state.search.text}
                                        type="text"
                                        style={{ width: '86.8%',  marginTop:"2%"}}
                                        className="inputBook"
                                        id="text"
                                        name="text"
                                        data-action="filter"
                                        data-filters="#dev-table"
                                        placeholder="Searching Keyword here..."
                                        onInput={this.searchOnchange}
                                    />
                                </div>

                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                    <FontAwesomeIcon
                                        icon={faFilter}
                                        style={{
                                            fill:"blue",
                                            marginLeft:"2%",
                                            marginRight:"3%"
                                        }}
                                    />
                                    {/*<Autocomplete*/}
                                    {/*    id="suggestion"*/}
                                    {/*    options={options}*/}
                                    {/*    style={{marginTop:"1%"}}*/}
                                    {/*    getOptionLabel={this.getOptionLabel}*/}
                                    {/*    onChange={this.userChanged}*/}
                                    {/*    renderInput={(params) => <TextField {...params} form={'non-existing-form'}*/}
                                    {/*                                        label="Type Name to search"*/}
                                    {/*                                        variant="outlined"/>}*/}
                                    {/*/>*/}
                                    <MyTextField
                                        select
                                        name="user"
                                        id="standard-basic"
                                        handler={this.userChanged}
                                        style={{ width: '86.8%', marginTop:"0%", transform:"revert", verticalAlign:"middle", padding:"0%"}}
                                        label="UserName"
                                        SelectProps={{
                                            native: true,
                                        }}

                                    >
                                        {
                                            users.map((user) => {
                                                    return (
                                                        <option
                                                            value={user._id}>{user.username} ({user.fullName})</option>
                                                    )
                                                }
                                            )
                                        }
                                    </MyTextField>


                                </div>
                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                    <FontAwesomeIcon
                                        icon={faFilter}
                                        style={{
                                            marginLeft:"2%",
                                            marginRight:"3%"
                                        }}
                                    />
                                    <input
                                        value={this.state.search.text}
                                        type="text"
                                        style={{ width: '86.8%',  marginTop:"2%"}}
                                        className="inputBook"
                                        id="text"
                                        name="text"
                                        data-action="filter"
                                        data-filters="#dev-table"
                                        placeholder="Searching Keyword here..."
                                        onInput={this.searchOnchange}
                                    />
                                </div>


                            </Grid>

                        </Paper>



                            <br></br>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell align="center"><b>Book Name</b></TableCell>
                                        <TableCell align="center"><b>Author</b></TableCell>
                                        <TableCell align="center"><b>Issued to</b></TableCell>
                                        <TableCell align="center"><b>Issued Date</b></TableCell>
                                        <TableCell align="center"><b>Due Date</b></TableCell>
                                        <TableCell align="center"><b>Fine</b></TableCell>
                                        <TableCell align="center"><b>Action</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.books &&
                                        this.state.book.map((book, i) => {
                                            const issueDate = book.issueDate
                                            const dueDate = book.dueDate
                                            const today = new Date().valueOf()
                                            const fday = Math.floor((today -dueDate)/86400000)

                                        return (
                                            <TableRow >

                                                <TableCell align="center">{get(book, 'book.name')}</TableCell>
                                                <TableCell align="center">{get(book, 'book.author')}</TableCell>
                                                <TableCell align="center">{get(book, 'user.fullName')}</TableCell>
                                                <TableCell align="center">{moment(book.issueDate).format('YYYY/MM/DD')}</TableCell>
                                                <TableCell align="center">{moment(book.dueDate).format('YYYY/MM/DD')}</TableCell>
                                                <TableCell align="center">{
                                                   fday>0? fday*5:0
                                                }</TableCell>

                                                <TableCell align="center">
                                                    <Button variant={'contained'} color={'primary'}
                                                            onClick={this.onReturn.bind(this, book)}
                                                            disabled={book.status==="RETURNED"?true:false}>

                                                        {book.status}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>



        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    userReducer:state.userReducer,
    studentReducer: state.studentReducer,
     libraryReducer : state.libraryReducer
}))(withStyles(useStyles)(ListIssuedBook))
