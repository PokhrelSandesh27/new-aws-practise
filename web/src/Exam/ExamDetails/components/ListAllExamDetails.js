import React, { Component } from 'react'
import { getExam, getExams } from '../../Exam/actions'
import { getExamDetails } from '../actions'
import { getClassroomById } from '../../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { get } from 'lodash'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'


class ListAllExams extends Component {

    state = {
        type: null,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
    }

    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        const { _id } = getUser()
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(getExamDetails())
    }

    render () {
        const { classes } = this.props;
        const { exam } = this.props.examReducer
        const { examDetails } = this.props.examDetailsReducer
        const { classroom } = this.props.classroomReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">

                    <h2>List of exam details for</h2>

                    {/*<div>Classroom: {`${classroom.grade} ${classroom.section} `}</div>*/}
                    {/*<div>Examination: {`${exam.name}`}</div>*/}

                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>
                        <div className="panel panel-primary">
                            <div>
                            <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {
                                        `Classroom :${classroom.grade} ${classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Examination : ${exam.name}`
                                    }
                                   
                                </Button>

                            </div>
<br></br>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Subject</b></TableCell>

                                            <TableCell align="center"><b>Date</b></TableCell>
                                         
                                            <TableCell align="center"><b>Invigilator</b></TableCell>
                                            <TableCell align="center"><b>Examiner</b></TableCell>
                                            <TableCell align="center"><b>Grader</b></TableCell>
                                            <TableCell align="center"><b>Actions</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {   examDetails &&
                                    examDetails
                                        // TODO Remove this filter when search route is available
                                        .filter((examDetail) => ((this.state.classroom === examDetail.classroom._id) && (this.state.exam === examDetail.exam._id)))
                                        .map((examDetail, i) => {
                                            return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{examDetail.subject.name}</TableCell>

                                                        <TableCell align="center">{examDetail.date}
                                                                     </TableCell>
                                                     
                                                     <TableCell align="center">
                                                     {examDetail.invigilator.fullName}
                                                        </TableCell>
                                                <TableCell align="center"> {examDetail.examiner.fullName} </TableCell>
                                                <TableCell align="center">{examDetail.grader.fullName}</TableCell>
                                                <TableCell align="center">
                                                <NavLink to={`/examdetails/${examDetail._id}`}>View
                                                        Detail</NavLink>
                                                </TableCell>

                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>


                        </div>
                    </div>
                </div>
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    examReducer: state.examReducer,
    examDetailsReducer: state.examDetailsReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListAllExams))
