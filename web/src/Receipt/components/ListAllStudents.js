import React, { Component } from 'react'
import { getAllClassroom, getClassroomById } from '../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { searchStudent } from '../../Student/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

class ListAllStudents extends Component {

    // state = {}

    componentDidMount () {
        const classroom = this.props.match.params.classroom
        this.props.dispatch((getClassroomById(classroom)))
        this.props.dispatch((searchStudent({ classroom})))
    }

    render () {
        const { classes } = this.props;
        const { classroom } = this.props.classroomReducer
        const { students } = this.props.studentReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">

                    <h2>List of students of {classroom && ` Classroom : Grade ${classroom.grade} Section ${classroom.section}`} for paying receipts</h2>

                <div className="row">
                    <div className="col-md-6">
                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</Button>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                        <TableCell align="center"><b>Name</b></TableCell>
                                        <TableCell align="center"><b>Actions</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {   students &&
                                    students.map((student, i) => {
                                        return (
                                            <TableRow >
                                                <TableCell align="center">
                                                    {i+1}
                                                </TableCell>
                                                <TableCell align="center">{student.student.fullName}</TableCell>
                                                <TableCell align="center"><NavLink className="navlink"
                                                                                   to={{
                                                                                       pathname: `/receipts/list/classroom/${classroom._id}/student/${student.student._id}`,
                                                                                   }}>
                                                    View/Pay Receipts
                                                </NavLink></TableCell>

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
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(ListAllStudents))
