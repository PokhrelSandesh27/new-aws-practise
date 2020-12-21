import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllClassroom } from '../../Home/actions'
import "../static/css/style.css"
import { NavLink , navigate} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'

class ListClassroom extends Component {
    state = {}


    componentDidMount () {
        console.log('this will run once')
        this.props.dispatch(getAllClassroom())
    }
    createClassRoom (){
        this.props.history.push("../../class-room/create")
    }
    listSubjectLink(){
        this.props.history.push("../../subject/list")
    }

    render () {
        const { classes } = this.props;
        const {classrooms} = this.props.classroomReducer

        console.log('log class rooms', classrooms)



        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <h2>Classroom List </h2>
                <div className="row" >
                    <div className="col-md-6">
                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</Button>
                        <div className="panel panel-primary">


                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Teacher</b></TableCell>
                                            <TableCell align="center"><b>Grade</b></TableCell>
                                            <TableCell align="center"><b>Section</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {classrooms.map((classroom, i) => {

                                            return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{classroom.teacher ? classroom.teacher.fullName || 'NA' : 'NA'}</TableCell>
                                                    <TableCell align="center">{classroom.grade || 'NA'}</TableCell>
                                                    <TableCell align="center">{classroom.section || 'NA'}</TableCell>


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
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(ListClassroom))
