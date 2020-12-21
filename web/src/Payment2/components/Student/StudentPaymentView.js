import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeAPaymentAwait, searchPayments } from '../../actions'
import { cleanObject, getMonth } from '../../../utils'
import moment from 'moment'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import { get, orderBy } from 'lodash'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import PaymentGroup from './PaymentGroup'
import CriteriaSelction from './CriteriaSelction'
import Grid from '@material-ui/core/Grid'
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";


const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)
toast.configure()

class StudentPaymentView extends React.Component {

    state = {
        localStore: {
            user: getUser()._id,
            startDate: moment.utc().startOf('month').valueOf(),
            endDate: moment.utc().endOf('month').valueOf(),
        },
        payStore: [],
        isPaid: -1,
    }

    isPaidStateChanged = e => {
        const isPaid = e.target.value
        this.setState({ isPaid })
        this.updateList({ isPaid })
    }

    updateList = (data = {}) => {
        const { localStore, isPaid } = this.state
        const param = { ...localStore, isPaid, ...data }
        if (param.isPaid === -1) param.isPaid = undefined
        const paramFinal = cleanObject(param)
        console.log("SearchPayment params", paramFinal)
        this.props.dispatch(searchPayments(paramFinal))
    }

    componentDidMount () {
        const { localStore, isPaid } = this.state
        const reqParam = { ...localStore, isPaid }
        if (reqParam.isPaid === -1) reqParam.isPaid = undefined
        //const reqParam = {...this.state.localStore }
        console.log("reqParamWhenComponentMount", reqParam)
        this.props.dispatch(searchPayments(reqParam))
    }


    stateChanged = state => {
        state.startDate = moment(state.startDate).utc().startOf('month').valueOf()
        state.endDate = moment(state.endDate).utc().endOf('month').valueOf()
        this.setState({ localStore: state })
        this.updateList({ ...state })
    }

    filterPayments = payments => {
        let pa = []
        for (let payment of payments) {
            let date = `${getMonth(payment.month)}, ${payment.year}`
            let index = pa.findIndex(item => item.date === date)
            if (index > -1)
                pa[index].payments.push(payment)
            else
                pa.push({ date, month: payment.month, year: payment.year, payments: [payment] })
        }
        pa = orderBy(pa, 'month', 'desc')
        pa = orderBy(pa, 'year', 'desc')
        return pa
    }

    render () {
        const { classes } = this.props
        const { localStore } = this.state
        const { payments, searchState } = this.props.paymentReducer
        const { user } = this.state.localStore
        const filteredPayment = this.filterPayments(payments)
        const showTable = payments.length > 0
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <Breadcrumbs aria-label="breadcrumb"
                                     style={{float: 'right'}}>
                            <StyledBreadcrumb onClick={this.props.history.goBack}
                                              component="a"
                                              label="Back"
                                              icon={<ArrowBackIosIcon fontSize="small" />}>

                            </StyledBreadcrumb>
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>


                            <Typography variant={"inherit"} color="secondary">Payments</Typography>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>
                        <br/>
                        <br/>

                        <Paper style={{height:"20%"}}>
                            <h2>My Payment Details</h2>
                            <Grid container spacing={3} sm={12} style={{width:"100%" , marginLeft:"3%"}}>
                                <Grid item  sm={3} style={{width:"100%"}}>
                        <Select
                        variant="filled"
                            labelId="payment-status-label"
                            id="payment-status"
                            value={this.state.isPaid}
                           style={{ width:"100%"}}
                            onChange={this.isPaidStateChanged}
                        >
                            <MenuItem value={-1}>&nbsp; All Payments</MenuItem>
                            <MenuItem value={false}> &nbsp; Due Payments</MenuItem>
                            <MenuItem value={true}> &nbsp; Payment History</MenuItem>
                        </Select>
                                </Grid>
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
                                    <Table className={classes.table} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding={'checkbox'}>{''}</TableCell>
                                                <TableCell align="left"
                                                           padding={'checkbox'}><b>S.N.</b></TableCell>
                                                <TableCell align="left" padding={'checkbox'}><b>&nbsp; </b></TableCell>
                                                <TableCell align="right"><b>&nbsp; Date</b></TableCell>
                                                <TableCell align="left"><b>&nbsp; Payment Status</b></TableCell>
                                                <TableCell align="right"><b>&nbsp; Amount</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                searchState === 2 && filteredPayment &&
                                                filteredPayment.map((payment, i) => {
                                                    return (
                                                        <PaymentGroup key={`${payment.date}-${user._id}`}
                                                                      payments={payment} user={user}
                                                                      id={i += 1}/>//onGenerate={this.showReceipt}
                                                    )
                                                })
                                            }
                                            {
                                                searchState === 1 &&
                                                <TableRow> <TableCell align={'center'}
                                                                      colSpan={6}>Searching...</TableCell></TableRow>
                                            }
                                            {
                                                searchState === 3 &&
                                                <TableRow> <TableCell align={'center'} colSpan={6}>An Error
                                                    Occurred.</TableCell></TableRow>
                                            }
                                            {
                                                filteredPayment.length === 0 &&
                                                <TableRow> <TableCell align={'center'} colSpan={6}>No records
                                                    found.</TableCell></TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </div>

                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(StudentPaymentView))
