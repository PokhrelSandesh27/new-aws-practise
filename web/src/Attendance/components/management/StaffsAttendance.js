import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink, Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import Footer from '../../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import MyTextField from "../../../components/TextField";
import {getAllClassroom} from "../../../Classroom/actions";
import canvas from "../../../img/canvas.png"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "../../../TablePagination";
import TableContainer from "@material-ui/core/TableContainer";




toast.configure()

class StaffsAttendance extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false ,
        localStore: {},
    }
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        this.props.dispatch(getAllClassroom())

    }



    handler = (me, value) => {
        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    selectChanged = event => {
        const value = event.target.value
        const id = event.target.name
        this.handler(id, value)
    }
    groupsChanged = event => {
        const localStore = {...this.state.localStore}

        localStore.groups = [event.target.value]
        this.setState({localStore})
    }


    render() {

        const {createState} = this.props.paymentReducer
        const {classrooms} = this.props.classroomReducer
        const {classes} = this.props;
        const {value} = this.state;
        const { row } = this.props;
        const { open } = this.state;

        let msg

        if (createState === 1)
            msg = 'Creating Discount'
        else
            msg = 'Create Discount'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/discount/list',
                    msg: msg
                }}/>
            )
        }

        return (


            <Paper>
                <h2>Attendance Table</h2>
                <Grid container spacing={3}>
                    <Grid container justify="flex-start" spacing={3} style={{gap:"5%", marginLeft:"7%"}}>
                        <MyTextField
                            select
                            name="classroom"
                            id="outlined-select-native"
                            handler={this.selectChanged}
                            label="ClassRoom"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select ClassRoom"
                            variant="outlined">
                            {
                                classrooms.map((classroom) => {
                                        return (
                                            <option
                                                value={classroom._id}>Class: {classroom.grade},
                                                Section: {classroom.section}</option>
                                        )
                                    }
                                )
                            }
                        </MyTextField>

                        <MyTextField
                            id="date"
                            variant="filled"
                            label="Batch To Date"
                            type="date"
                            defaultValue="2017-05-24"

                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <MyTextField
                            id="date"
                            variant="filled"
                            label="Batch From Date"
                            type="date"
                            defaultValue="2020-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>

                            <h4 style={{marginLeft:"3%", marginTop:"3%"}}> Attendance of Batch 2017-2020 class 2A</h4>
                            <TableContainer component={Paper} style={{marginTop:"3%", width:"100%",  borderCollapse: "separate"}}>

                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>S.N.</b></TableCell>
                                            <TableCell align="center"><b>Name</b></TableCell>
                                            <TableCell align="center"><b> 1</b></TableCell>
                                            <TableCell align="center"><b> 2</b></TableCell>
                                            <TableCell align="center"><b>3</b></TableCell>
                                            <TableCell align="center"><b>4</b></TableCell>
                                            <TableCell align="center"><b>5</b></TableCell>
                                            <TableCell align="center"><b> 6</b></TableCell>
                                            <TableCell align="center"><b>7</b></TableCell>
                                            <TableCell align="center"><b>8</b></TableCell>
                                            <TableCell align="center"><b>9</b></TableCell>
                                            <TableCell align="center"><b>10</b></TableCell>
                                            <TableCell align="center"><b>11</b></TableCell>
                                            <TableCell align="center"><b>12</b></TableCell>
                                            <TableCell align="center"><b>13</b></TableCell>
                                            <TableCell align="center"><b>14</b></TableCell>
                                            <TableCell align="center"><b>15</b></TableCell>
                                            <TableCell align="center"><b>16</b></TableCell>
                                            <TableCell align="center"><b>17</b></TableCell>
                                            <TableCell align="center"><b>18</b></TableCell>
                                            <TableCell align="center"><b>19</b></TableCell>
                                            <TableCell align="center"><b>20</b></TableCell>
                                            <TableCell align="center"><b>21</b></TableCell>
                                            <TableCell align="center"><b>22</b></TableCell>
                                            <TableCell align="center"><b>23</b></TableCell>
                                            <TableCell align="center"><b>24</b></TableCell>
                                            <TableCell align="center"><b>25</b></TableCell>
                                            <TableCell align="center"><b>26</b></TableCell>
                                            <TableCell align="center"><b>27</b></TableCell>
                                            <TableCell align="center"><b>28</b></TableCell>
                                            <TableCell align="center"><b>29</b></TableCell>
                                            <TableCell align="center"><b>30</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {


                                            <TableRow >
                                                <TableCell align="center">
                                                    1
                                                </TableCell>
                                                <TableCell align="center">
                                                    Ram Sharma
                                                </TableCell>
                                                <TableCell align="center">A</TableCell>

                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell > <TableCell align="center">
                                                p
                                            </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell > <TableCell align="center">
                                                p
                                            </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell > <TableCell align="center">
                                                p
                                            </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    A
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    A
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >
                                                <TableCell align="center">
                                                    p
                                                </TableCell >












                                            </TableRow>

                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination>

                                </TablePagination>
                            </TableContainer>

                    </Grid>
                </Grid>

            </Paper>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(StaffsAttendance))


