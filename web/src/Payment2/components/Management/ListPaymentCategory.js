import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import { get, orderBy } from 'lodash'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import MyTextField from "../../../components/TextField";
import {getAllClassroom} from "../../../Classroom/actions";
import {getAllPaymentCategory} from "../../actions";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "../../../TablePagination";
import SimpleTable from "../../../Classroom/components/Tab";
import ScholarConfigGroup from './ScholarConfigGroup'
import PayementCategoryGroup from './PayementCategoryGroup'



toast.configure()

class CreatePaymentCategory extends Component {

    state = {

    }

    componentDidMount() {
        this.props.dispatch(getAllPaymentCategory())

    }

    filterPaymentCategory = payments => {
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



    render() {
        const { payments} = this.props.paymentReducer
        const {classrooms} = this.props.classroomReducer
        const {classes} = this.props;
        const filterPaymentCategories= this.filterPaymentCategory(payments)

        console.log(payments,'pay')

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
                                <TableCell align="left"  padding={'checkbox'}><b>No. of payment category</b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                filterPaymentCategories &&
                                filterPaymentCategories.map((payment, i) => {
                                    return (
                                        <PayementCategoryGroup key={`${payment._id}`}
                                                            payments={payment}
                                                            id={i += 1}/>
                                    )
                                })



                            }
                        </TableBody>
                    </Table>
                    <TablePagination pageChanged={this.page} page={this.state.currentPage}/>
                </TableContainer>


            </div>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(CreatePaymentCategory))


