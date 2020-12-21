import React, { Component } from 'react'
import { getExams } from '../../Exam/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'

class ListAllExams extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({ type : this.props.type || 'list'})
        const { _id } = getUser()
        this.props.dispatch(getExams())
    }
    createReport(){
        this.props.history.push("../../examreport/create")
}

    render () {
        const { classes } = this.props;
        const { exams } = this.props.examReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

            <div className="page-content">

                    <h2>List of exams for</h2>

                <div className="row">
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            {/*<NavLink*/}
                            {/*    to={'../../examreport/create'}>*/}
                            {/*    {*/}
                            {/*        this.state.type === 'list' &&*/}
                            {/*        <button onClick={this.createReport.bind(this)}*/}
                            {/*                style={{margin:'3%', backgroundColor: "dimgrey"}}>*/}
                            {/*            Create Report*/}
                            {/*        </button>*/}

                            {/*        ||*/}
                            {/*        this.state.type === 'create' &&*/}
                            {/*        ''*/}

                            {/*    }*/}
                            {/*</NavLink>*/}
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Classroom</b></TableCell>
                                            <TableCell align="center"><b>Type</b></TableCell>
                                            <TableCell align="center"><b>From</b></TableCell>
                                            <TableCell align="center"><b>To</b></TableCell>
                                            <TableCell align="center"><b>Actions</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { exams &&
                                        exams
                                            //     .filter((assignment) => !(this.state.subject !== null && assignment.subject !== this.state.subject))
                                            .map((exam, i) => {
                                                return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{exam.name}</TableCell>
                                                    <TableCell align="center">{exam.type}</TableCell>
                                                    <TableCell align="center">{exam.startDate}</TableCell>
                                                    <TableCell align="center">{exam.endDate}</TableCell>
                                                    <TableCell align="center"><NavLink className ="navlink"
                                                                                       to={`/examreport/${this.state.type}/exam/${exam._id}`}>
                                                        <b> View Classrooms</b>
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
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    examReducer: state.examReducer,
}))(withStyles(useStyles)(ListAllExams))
