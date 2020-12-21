import React, { Component } from 'react'
// import { getExams } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import { getClassroomById } from '../../Home/actions'
import { getPayments, searchPayments } from '../actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import moment from 'moment'

class ListAllPaymentsForStudent extends Component {

    state = {
        type: null,
    }

    componentDidMount () {
        const { student, classroom } = getUser()
        // const { classroom } = student
        // this.props.dispatch(getClassroomById(classroom))
        this.props.dispatch(searchPayments({ classroom: classroom._id }))
    }

    render () {
        const { classroom } = getUser()
        // const { classroom } = this.props.classroomReducer
        const { payments, searchState } = this.props.paymentReducer
        const { classes } = this.props

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">

                        <h2>List of payments
                            for {classroom && ` Classroom : ${classroom.grade} ${classroom.section}`}</h2>
                        <Button onClick={this.props.history.goBack}
                                style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                        >⬅ Go back
                        </Button>
                        <div className="row">

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Months</b></TableCell>

                                            <TableCell align="center"><b>Action</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            payments &&
                                            payments.map((payment, i) => {
                                                const d = moment(payment.updatedAt)
                                                d.month() // 1
                                                const date = d.format('MMM')
                                                return (
                                                    <TableRow>
                                                        <TableCell align="center">
                                                            {i + 1}
                                                        </TableCell>
                                                        <TableCell align="center">{date}</TableCell>

                                                        <TableCell align="center">
                                                            <NavLink className="navlink"
                                                                     to={{
                                                                         pathname: `/receipts/student/list/${payment._id}`,
                                                                     }}>
                                                                <b>View Receipts</b>
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
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    paymentReducer: state.paymentReducer,
}))(withStyles(useStyles)(ListAllPaymentsForStudent))
