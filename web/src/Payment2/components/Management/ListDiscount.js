import React, { Component } from 'react'

import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'



import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from "../../../TablePagination";
import TableSearch from "../../../TableSearch";

class ListDiscount extends Component {

    state = {
        type: this.props.type || 'list'
    }

    componentDidMount () {

    }
    createPayments(){

    }


    render () {
        const { classrooms } = this.props.classroomReducer
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Discount Rate</h2>
                        <div className="py-5 text-center">
                            {
                                this.props.location.msg && this.state.type === 'create' &&
                                `\n Info:  ${this.props.location.msg}`
                            }


                        </div>
                        <div className="row">
                            <Button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</Button>
                            <div className="col-md-6">

                                <NavLink className="navlink"
                                         to={{
                                             pathname: `/discount/create`,
                                         }}>
                                    <Button variant="contained" color='primary'>
                                        Add</Button>

                                </NavLink>

                                <div className="panel panel-primary">
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>&nbsp; Classroom</b></TableCell>
                                                    <TableCell align="center"><b>&nbsp; Category</b></TableCell>
                                                    <TableCell align="center"><b> Rate</b></TableCell>

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
                                                                    <NavLink className="navlink"
                                                                             to={{
                                                                                 pathname: `/payment/create/classroom/${classroom._id}`,
                                                                             }}>

                                                                        <Button variant="outlined" color='primary'
                                                                                style={{backgroundColor:"lightgreen"}}>
                                                                            Add</Button>

                                                                    </NavLink>



                                                                </TableCell >
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
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListDiscount))
