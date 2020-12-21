import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from "../../../TablePagination";
import { searchExamDetail } from '../../actions'

class ExamDetailsList extends Component {


    componentDidMount () {
        const classroom = this.props.match.params.classroomId
        const exam = this.props.match.params.termId
        this.props.dispatch(searchExamDetail({classroom, exam}))
    }

    render () {
        const { classes } = this.props;
        const examDetails = this.props.mcqReducer.examDetails
        const classroom = this.props.match.params.classroomId
        const termId = this.props.match.params.termId

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="py-5 text-center">

                            <h2> List of Exam Details.</h2>

                        </div>
                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</Button>
                        {/*<NavLink*/}
                        {/*    className="navlink"*/}
                        {/*    to={{pathname: `/exam/class/${classroom}/term/${termId}/examdetails/create`,}} >*/}

                        {/*    <Button variant="outlined" color="Green">  Create Exam Details*/}
                        {/*    </Button>*/}
                        {/*    &nbsp; &nbsp;*/}
                        {/*</NavLink>*/}

                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>Term</b></TableCell>
                                                    <TableCell align="center"><b>Subject</b></TableCell>
                                                    <TableCell align="center"><b>Theory F.M</b></TableCell>
                                                    <TableCell align="center"><b>Prac. F.M</b></TableCell>
                                                    <TableCell align="center"><b>Theory P.M</b></TableCell>
                                                    <TableCell align="center"><b>Prac. P.M</b></TableCell>
                                                    <TableCell align="center"><b>Grader</b></TableCell>
                                                    <TableCell align="center"><b>Action</b></TableCell>

                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {examDetails.map((examDetail, i) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="center">
                                                                {i + 1}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.exam.name}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.subject.name}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.theoryFullMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.pracFullMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.theoryPassMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                            {examDetail.pracPassMarks}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {examDetail.grader.fullName}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <NavLink
                                                                    className="navlink"
                                                                    to={{ pathname: `/exam/class/${classroom}/term/${termId}/examdetail/${examDetail._id}` }}>

                                                                    <Button variant="outlined" color="Green"> View
                                                                    </Button>
                                                                    &nbsp; &nbsp;
                                                                </NavLink>

                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                })}

                                            </TableBody>
                                        </Table>
                                        <TablePagination>

                                        </TablePagination>
                                    </TableContainer>

                                </div>
                            </div>
                        </div>
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
    mcqReducer: state.mcqReducer
}))(withStyles(useStyles)(ExamDetailsList))
