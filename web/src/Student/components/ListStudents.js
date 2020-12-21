import React, { Component, Fragment } from 'react'
import { searchStudent } from '../actions'
import { connect } from 'react-redux'
import "../static/css/style.css"
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TablePagination from "../../TablePagination";
import {Payment} from '../../svg'



class ListStudents extends Component {
    componentDidMount () {
        //need postman ops--for now trying with searchStudents
        // For now empty, we may need to send more parameter in future, so retaining this parameter
        const req = {
            // "status": "ACTIVE",
            // "groups": ["STUDENT"]
        }
        this.props.dispatch(searchStudent(req));

    }


    render () {

        const {students} = this.props.studentReducer
        const { classes } = this.props;


        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content" >

                <h2>STUDENT LIST</h2>
                <div className="row">
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>UserName</b></TableCell>
                                            <TableCell align="center"><b>Fullname</b></TableCell>
                                            <TableCell align="center"><b>Classroom</b></TableCell>
                                            <TableCell align="center"><b>Email&nbsp;Address</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((student, index) => {
                                            let isUser = !!student.student;
                                            const isClassroom = !!student.classroom
                                            if(!isUser && !isClassroom ) return;
                                            return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {index+1}
                                                    </TableCell>
                                                    <TableCell align="center">{isUser ? student.student.username || 'NA' : 'NA'}</TableCell>
                                                    <TableCell align="center">{isUser ? student.student.fullName || 'NA' : 'NA'}</TableCell>
                                                    <TableCell align="center">{isClassroom ? student.classroom.grade || 'NA' : 'NA'} {isClassroom ? student.classroom.section || 'NA' : 'NA'}</TableCell>
                                                    <TableCell align="center">{isUser? student.student.email||'NA': 'NA'}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination>

                                </TablePagination>

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

export default
connect(state => ({
    studentReducer: state.studentReducer,

})) (withStyles(useStyles)(ListStudents))
