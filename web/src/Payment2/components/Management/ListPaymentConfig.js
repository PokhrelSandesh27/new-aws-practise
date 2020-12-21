import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get, orderBy } from 'lodash'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { generatePayment, getAllPaymentCategory, getAllPaymentConfig, searchPaymentConfig } from '../../actions'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '../../../TablePagination'
import SimpleTable from '../../../Classroom/components/Tab'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import { createReleaseReport } from '../../../Exam/ReleaseReport/actions'
import { searchTimeTable } from '../../../TimeTable/action'
import Modal from 'react-modal'
import CardContent from '@material-ui/core/CardContent'
import { getMonth } from '../../../utils'
import PaymentGroup from '../Accountant/PaymentGroup'
import PaymentConfigGroup from './PaymentConfigGroup'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";




const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});





toast.configure()
const customStyles = {
    content: {
        height: '78%',
        top: '15%',
        left: '25%',
        right: '25%',
        bottom: '25%',
        backgroundColor: '#F0F8FF',
        color: 'ghostwhite'

    }
}

class ListPaymentConfig extends Component {

    state = {
        buttonDisabled: false,
        showModalState: false,
        selectedConfig: {},
        localStore: {
            isGenerated: false
        }

    }

    componentDidMount () {
        this.props.dispatch(getAllPaymentConfig())
        // this.props.dispatch(searchPaymentConfig(body))
    }

    onShowDetails = (paymentConfig = {}) => {
        // console.log(paymentConfig)
        this.openModal(paymentConfig)
    }

    openModal (paymentConfig) {
        this.setState({ showModalState: true, selectedConfig: paymentConfig })
    }

    closeModal= ()=> {
        this.setState({ showModalState: false })
    }

    filterPaymentConfig = payments => {
        let pa = []
        let i = 0
        for (let payment of payments) {
            let classroom = payment.classroom
            let index = pa.findIndex(item => item._id === classroom._id)
            if (index > -1)
                pa[index].payments.push({ i, payment })
            else
                pa.push({ _id: classroom._id, classroom, grade: payment.classroom.grade, section:payment.classroom.section, payments: [{i, payment }] })
            i++;
        }
        pa = orderBy(pa, 'grade', 'asc')
        pa = orderBy(pa, 'section', 'asc')
        console.log(pa)
        // return []
        return pa
    }
    onGenerate = (pay, index) => {
        alert('Do you want to generate this payement')
        const localStore = { ...this.state.localStore }
        const id = pay
        console.log(id, 'id')
        localStore.isGenerated = true
        this.setState({ localStore })
        this.props.dispatch(generatePayment(id, index))
            .then(resp => {

                toast.success('generated succesfully')

            })
            .catch(err => {
                toast.error('failed')

            })

    }

    render () {
        const { payments } = this.props.paymentReducer
        const { classrooms } = this.props.classroomReducer
        const { classes } = this.props
        const filteredPaymentConfigs = this.filterPaymentConfig(payments)

        console.log(payments, 'pay')

        return (

            <div className="panel panel-primary">
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding={'checkbox'}>{''}</TableCell>
                                <TableCell align="left"
                                           padding={'checkbox'}><b>S.N.</b></TableCell>
                                <TableCell align="left" padding={'checkbox'}><b>Classroom </b></TableCell>
                                <TableCell align="left" ><b>Section </b></TableCell>
                                <TableCell align="left"  padding={'checkbox'}><b>No. of paymentConfig present</b></TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                filteredPaymentConfigs &&
                                filteredPaymentConfigs.map((payment, i) => {
                                    return (
                                        <PaymentConfigGroup key={`${payment._id}`}
                                                            payments={payment} onGenerate={this.onGenerate}
                                                            onShowDetails={this.onShowDetails}
                                                            id={i += 1}/>
                                    )
                                })

                            }
                        </TableBody>
                    </Table>
                    <TablePagination pageChanged={this.page} page={this.state.currentPage}/>
                </TableContainer>




                <Dialog  scroll={'paper'}
                         onClose={this.closeModal}
                         aria-labelledby="customized-dialog-title" open={this.state.showModalState}>
                    <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>Details OF Class {get(this.state.selectedConfig,'classroom.grade')}</DialogTitles>
                    <DialogContent>


                        <TableContainer style={{ width: '100%' }}>
                            <tr>
                            </tr>
                            <tr>
                                <td >Name</td>
                                <td> {this.state.selectedConfig.name}</td>

                            </tr>
                            <tr>
                                <td >ClassRoom</td>
                                <td >{get(this.state.selectedConfig, 'classroom.grade')}</td>

                            </tr>
                            <tr>
                                <td >Payment Category</td>
                                <td >{get(this.state.selectedConfig, 'paymentCategory.name')}</td>

                            </tr>
                            <tr>
                                <td >Year</td>
                                <td>{get(this.state.selectedConfig, 'paymentCategory.year')}</td>

                            </tr>
                            <tr>
                                <td >Amount</td>
                                <td >{get(this.state.selectedConfig, 'paymentCategory.amount')}</td>

                            </tr>
                            <tr>
                                <td >Valid Date</td>
                                <td >{moment.unix(this.state.selectedConfig.startDate / 1000).format('MMMM YYYY ')} - {moment.unix(this.state.selectedConfig.endDate / 1000).format('MMMM YYYY ')}</td>

                            </tr>
                            <tr>
                                <td >Repetition</td>
                                <td>{this.state.selectedConfig.repetition}</td>

                            </tr>
                            <tr>
                                <td>Your Status</td>
                                <td>{this.state.selectedConfig.isGenerated ? 'Generated' : 'Not generated'}</td>
                            </tr>

                        </TableContainer>



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>









                {/*<Modal*/}
                {/*    isOpen={this.state.showModalState}*/}
                {/*    onRequestClose={this.closeModal}*/}
                {/*    shouldCloseOnOverlayClick={false}*/}
                {/*    style={customStyles}*/}
                {/*    contentLabel="Example Modal">*/}
                {/*    <h1 style={{ textAlign: 'center' }}>Details OF*/}
                {/*        Class {get(this.state.selectedConfig, 'classroom.grade')}</h1>*/}
                {/*    <TableContainer style={{ width: '100%' }} component={Paper}>*/}
                {/*        <tr>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Name</td>*/}
                {/*            <td className="paymentConfigTd"> {this.state.selectedConfig.name}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">ClassRoom</td>*/}
                {/*            <td className="paymentConfigTd">{get(this.state.selectedConfig, 'classroom.grade')}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Payment Category</td>*/}
                {/*            <td className="paymentConfigTd">{get(this.state.selectedConfig, 'paymentCategory.name')}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Year</td>*/}
                {/*            <td className="paymentConfigTd">{get(this.state.selectedConfig, 'paymentCategory.year')}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Amount</td>*/}
                {/*            <td className="paymentConfigTd">{get(this.state.selectedConfig, 'paymentCategory.amount')}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Valid Date</td>*/}
                {/*            <td className="paymentConfigTd">{moment.unix(this.state.selectedConfig.startDate / 1000).format('MMMM YYYY ')} - {moment.unix(this.state.selectedConfig.endDate / 1000).format('MMMM YYYY ')}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Repetition</td>*/}
                {/*            <td className="paymentConfigTd">{this.state.selectedConfig.repetition}</td>*/}

                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd">Your Status</td>*/}
                {/*            <td className="paymentConfigTd">{this.state.selectedConfig.isGenerated ? 'Generated' : 'Not generated'}</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className="paymentConfigTd"></td>*/}
                {/*            <td className="paymentConfigTd">*/}
                {/*                <Button variant="contained" color="Darkgrey" className="close"*/}
                {/*                        onClick={this.closeModal.bind(this)}>Cancel</Button>*/}
                {/*            </td>*/}

                {/*        </tr>*/}
                {/*    </TableContainer>*/}

                {/*</Modal>*/}
            </div>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(ListPaymentConfig))


