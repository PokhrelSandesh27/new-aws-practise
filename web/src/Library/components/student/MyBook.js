import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createBook, searchBookIssueAwait, searchIssuedBooks } from '../../actions'
import { get } from 'lodash'
import { cleanObject, getUser } from '../../../utils'

import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import moment from 'moment'
import Button from "@material-ui/core/Button";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)
class MyBook extends Component {

    state = {
        localStore: {
            user: getUser()._id
        },
        search: {
            text: '',
            user: getUser()._id,
        },
        color: '',
        backgroundColor: '',
        showModalState:false
    }

    componentDidMount () {
        const req = {...this.state.localStore}
        console.log("params", req)
        this.props.dispatch(searchIssuedBooks(req))
    }

    // changeColorBW =() => {
    // //     changeColorBW (){
    //     this.setState({
    //         color: "black",
    //         backgroundColor: "white"
    //     })
    //     console.log("changeColorBW", this.state.color)
    // }
    // changeColorRB =() =>{
    // // changeColorRB (){
    //     this.setState({
    //         color: "black",
    //         backgroundColor: "red",
    //     })
    //     console.log("colorRB", this.state.color)
    // }


    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    searchOnchange = (event) => {
        const { search } = this.state
        search[event.target.name] = event.target.value

        this.setState({ search })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.search(), 300)
    }

    search = async () => {
        const book = await this.props.dispatch(searchBookIssueAwait(cleanObject(this.state.search)))
        const status = get(book, 'response.status')
        if (status === 400) {
            this.setState({
                error: get(book, 'response.data')
            })
        }
    }

    render () {
        const { classes } = this.props
        const { issuedBooks, searchIssuedBookState } = this.props.libraryReducer;

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <Breadcrumbs aria-label="breadcrumb"
                                     style={{float: 'right'}}>
                            <StyledBreadcrumb onClick={this.props.history.goBack}
                                              component="a"
                                              label="Back"
                                              icon={<ArrowBackIosIcon fontSize="small" />}>

                            </StyledBreadcrumb>
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>

                                <StyledBreadcrumb
                                    component="a"
                                    label="Library"
                                    onClick={this.props.history.goBack}
                                />

                            <Typography variant={"inherit"} color="secondary">My books</Typography>

                        </Breadcrumbs>
                        <br/>
                        <br/>

                        <Paper>
                            <input
                                value={this.state.search.text}
                                type="text"

                                className="inputBook"
                                id="text"
                                name="text"
                                data-action="filter"
                                data-filters="#dev-table"
                                placeholder="📁 Searching Keyword here..."
                                onInput={this.searchOnchange}
                            />
                        </Paper>


                        <br>
                        </br>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>Book Name</b></TableCell>
                                        <TableCell align="center"><b>Author Name</b></TableCell>
                                        <TableCell align="center"><b>Subtitle</b></TableCell>
                                        <TableCell align="center"><b>Issued Date</b></TableCell>
                                        <TableCell align="center"><b>Due Date</b></TableCell>
                                        <TableCell align="center"><b>Status</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {issuedBooks.map((book, i) => {
                                        console.log('log book', book)
                                        const issueDate = moment(book.issueDate).format('YYYY-MM-DD')
                                        const dueDate = moment(book.dueDate).format('YYYY-MM-DD')
                                        const status = (book.status === "RETURNED")
                                        return (
                                            <TableRow >
                                                <TableCell align="center">{get(book, 'book.name' || 'NA')}</TableCell>
                                                <TableCell align="center">{get(book, 'book.author' || 'NA')}</TableCell>
                                                <TableCell align="center">{get(book, 'book.subtitle' || 'NA')}</TableCell>
                                                <TableCell align="center">{issueDate || 'NA'}</TableCell>
                                                <TableCell align="center">{dueDate || 'NA'}</TableCell>
                                                <TableCell align="center" style={{color: this.state.color, backgroundColor: this.state.backgroundColor }}>{book.status || 'NA'}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>



                    <Box pt={4}>
                        <Footer/>
                    </Box>

                </Container>
            </main>

        )
    }
}

export default connect(state => ({
    libraryReducer: state.libraryReducer
}))(withStyles(useStyles)(MyBook))
