import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllClassroom } from '../../Home/actions'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

class ListPresentationClassroom extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({
            type: this.props.type || 'List'
        })

        this.props.dispatch(getAllClassroom())
    }

    render () {
        const {classes}= this.props
        const { classrooms } = this.props.classroomReducer
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <div className="py-5 text-center">
                    {
                        this.props.location.msg && this.state.type === 'create' &&
                        `\n Info:  ${this.props.location.msg}`
                    }
                    {/* TODO set text-transform  to 'capitalize' in CSS*/}
                    <h2>{this.state.type} presentation.</h2>
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <NavLink
                                to={'../../presentation/create'}>
                                {
                                    this.state.type === 'List' &&
                                    <button
                                        style={{
                                            margin:'1%',
                                            width: '15%',
                                            backgroundColor: "dimgrey"
                                        }}>
                                        Add LectureNotes
                                    </button>
                                    ||
                                    this.state.type === 'create' &&
                                    ''

                                }
                            </NavLink>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Classroom</b></TableCell>
                                            <TableCell align="center"><b>Actions</b></TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                        classrooms &&
                                        classrooms.map((classroom, i) => {

                                            return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">Class: {classroom.grade},
                                                            Section: {classroom.section}</TableCell>
                                                        <TableCell align="center">
                                                            <NavLink className = "navlink"
                                                                                           to={{
                                                                                               pathname: `/presentation/${this.state.type}/classroom/${classroom._id}`,
                                                                                           }}>
                                                            {
                                                                this.state.type === 'List' &&
                                                                <b>View List</b>
                                                                ||
                                                                this.state.type === 'create' &&
                                                                <b>Add New Presentation</b>
                                                            }
                                                        </NavLink></TableCell>


                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>







                            {/*<table className="assingmentTable" id="dev-table">*/}
                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        <th>No.</th>*/}
                            {/*        <th>Classroom</th>*/}
                            {/*        <th>Actions</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*    {*/}
                            {/*        classrooms &&*/}
                            {/*        classrooms.map((classroom, i) => {*/}

                            {/*            return (*/}
                            {/*                <tr>*/}
                            {/*                    <td>{i + 1}</td>*/}
                            {/*                    <td>Class: {classroom.grade},*/}
                            {/*                        Section: {classroom.section}</td>*/}
                            {/*                    <td>*/}
                            {/*                        <NavLink className = "navlink"*/}
                            {/*                            to={{*/}
                            {/*                                pathname: `/presentation/${this.state.type}/classroom/${classroom._id}`,*/}
                            {/*                            }}>*/}
                            {/*                            {*/}
                            {/*                                this.state.type === 'list' &&*/}
                            {/*                                <b>View List</b>*/}
                            {/*                                ||*/}
                            {/*                                this.state.type === 'create' &&*/}
                            {/*                                <b>Add New Presentation</b>*/}
                            {/*                            }*/}
                            {/*                        </NavLink></td>*/}
                            {/*                </tr>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*    </tbody>*/}
                            {/*</table>*/}

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
    presentationReducer: state.presentationReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListPresentationClassroom))
