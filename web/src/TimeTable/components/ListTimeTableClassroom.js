import React, { Component } from 'react'
import '../static/css/style.css'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAccessToken, getUser } from '../../utils'
import { getGroups } from '../../utils'
import { NavLink } from 'react-router-dom'
import { getAllTimeTable } from '../action'
import { getAllClassroom } from '../../Home/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
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

class ListTimeTableClassroom extends Component {
    state = {}

    componentDidMount () {

            this.props.dispatch(getAllClassroom())
    }
    createClassRoomTimeTableLink (){
        this.props.history.push("../../timetable/create/classroom")

}
    createslotLink(){
        this.props.history.push("../../slot/list")

    }

    render () {
        const { classes } = this.props;
        const { timetables, serchState } = this.props.timetableReducer
        const { classrooms, searchState } = this.props.classroomReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <h2>List ClassRoom TimeTable.</h2>

                <div className="row">
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>

                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <NavLink
                                to={'../../timetable/create/classroom'}>
                                {

                                    <button onClick={this.createClassRoomTimeTableLink.bind(this)}
                                            style={{margin:'3%', backgroundColor: "dimgrey"}}>
                                        Add TimeTable
                                    </button>

                                }
                            </NavLink>


                            {
                                serchState === 1 &&
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        style={
                                            {
                                                width:"10.5%",
                                                height:"10.1%",
                                                margin: "27%",
                                                marginLeft:"40%"
                                            }}/>
                                </div>
                            }
                            {
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>classRoom</b></TableCell>
                                                    <TableCell align="center"><b>ViewDetails</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    classrooms.map((classroom, index) => {
                                                    return (
                                                        <TableRow >
                                                            <TableCell align="center">
                                                                {index+1}
                                                            </TableCell>
                                                            <TableCell align="center">{get(classroom, 'grade')}{get(classroom, 'section')}</TableCell>
                                                            <TableCell align="center">
                                                                <NavLink className="navlink" to={`/timetable/classroom/${classroom._id}`}>
                                                                                                    Details
                                                                                               </NavLink>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                            }

                            {
                                serchState === 3 &&
                                <div>Something went wrong</div>
                            }
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
    timetableReducer: state.timetableReducer,
    classroomReducer: state.classroomReducer,
    slotReducer: state.slotReducer,
    subjectReducer: state.subjectReducer,
    userReducer: state.userReducer

}))(withStyles(useStyles)(ListTimeTableClassroom))
