import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
//import { makeAPaymentAwait, searchPayments } from '../../actions'
import { cleanObject, getMonth } from '../../../utils'
import moment from 'moment'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import logo from '../../../img/logo.svg'
import { toast } from 'react-toastify'
import { get, orderBy } from 'lodash'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
//import PaymentGroup from './PaymentGroup'
import CriteriaSelction from './CriteriaSelction'
import Grid from '@material-ui/core/Grid'
import { searchAttendance} from '../../action'
import attendanceReducer from '../../reducer'

toast.configure()

class AttendanceTableView extends React.Component {

    state = {
        localStore: {
            user: getUser()._id,
            startDate: moment.utc().startOf('month').valueOf(),
            endDate: moment.utc().endOf('month').valueOf(),
        },
        payStore: [],
    }



    updateList = (data = {}) => {
        const { localStore } = this.state
        const param = { ...localStore, ...data }
        const paramFinal = cleanObject(param)
        console.log("SearchPayment params", paramFinal)
        this.props.dispatch(searchAttendance(paramFinal))
    }

    componentDidMount () {
        const { localStore } = this.state
        const reqParam = { ...localStore }
        // if (reqParam.isPaid === -1) reqParam.isPaid = undefined
        //const reqParam = {...this.state.localStore }
        console.log("reqParamWhenComponentMount", reqParam)
        this.props.dispatch(searchAttendance(reqParam))
    }


    stateChanged = state => {
        state.startDate = moment(state.startDate).utc().startOf('month').valueOf()
        state.endDate = moment(state.endDate).utc().endOf('month').valueOf()
        this.setState({ localStore: state })
        this.updateList({ ...state })
    }

    render () {
        const { classes } = this.props
        const { localStore } = this.state
        const { attendances, searchState } = this.props.attendanceReducer
        const { user } = this.state.localStore
        const showTable = attendances.length > 0
        console.log("attendance reducers", attendances)
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Attendance</h2>
                        <div className="col-md-6">

                            <Button onClick={this.props.history.goBack}
                                    style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                            >⬅ Go back</Button>
                        </div>

                        <Paper style={{height:"20%"}}>
                            <br/>
                            <h2>Select the date range here.</h2>
                            <Grid container spacing={3} sm={12} style={{width:"100%" , marginLeft:"3%"}}>
                                <CriteriaSelction onChanged={this.stateChanged}/>

                            </Grid>
                            <div style={{marginTop:"2%"}}>
                                <p>. </p>
                            </div>
                        </Paper>
                        <br></br>
                        <div>
                            {
                                showTable &&
                                <TableContainer component={Paper}>
                                    <div>
                                        <br/>
                                        <h2>Attendance log.</h2>
                                    </div>
                                    <Table className={classes.table} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding={'checkbox'}>{''}</TableCell>
                                                <TableCell align="left"
                                                           padding={'checkbox'}><b>S.N.</b></TableCell>
                                                {/*<TableCell align="left" padding={'checkbox'}><b>&nbsp; </b></TableCell>*/}
                                                <TableCell align="center"><b>&nbsp; Date</b></TableCell>
                                                <TableCell align="center"><b>&nbsp; Status</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {attendances.map((attendance, i) => {

                                                const date = new Date(attendance.dateTime)
                                                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                                const rowDate = date.toLocaleDateString("en-US", options); //September 17, 2016

                                                const month = date.getMonth()+1
                                                const year = date.getFullYear()
                                                console.log("date", month)
                                                console.log("date", year)

                                                return (
                                                    <TableRow >
                                                        <TableCell padding={'checkbox'}>{''}</TableCell>
                                                        <TableCell align="left">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{rowDate || 'NA'}</TableCell>
                                                        <TableCell align="center">{attendance.isPresent ? 'Present' : 'Absent'}</TableCell>

                                                    </TableRow>
                                                )
                                            })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }

                            {
                                !showTable &&
                                    <div>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <b><i> Seems there is no data in the selected range. Try selecting the valid date range.</i></b>
                                    </div>
                            }
                        </div>

                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    attendanceReducer: state.attendanceReducer
}))(withStyles(useStyles)(AttendanceTableView))
