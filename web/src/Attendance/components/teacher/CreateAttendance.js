import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {get} from 'lodash'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import {getAllClassroom} from "../../../Classroom/actions";
import { addPaymentCategory, createScholarConfig } from '../../../Payment2/actions'

import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import { getGroups, getUser } from '../../../utils'
import { getClassroomById } from '../../../Classroom/actions'
import { searchStudent } from '../../../Student/actions'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { addAttendance } from '../../action'
import userEvent from '@testing-library/user-event'




toast.configure()

class createAttendance extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false ,
        text:false,
        localStore: {
            user:[]
        },

        students: []
    }
    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        const d = getGroups()
        const user = getUser()
        console.log(user.classroom, 'query')
        if (d.includes("TEACHER")) {
            const id = user.classroom
            this.props.dispatch(getClassroomById(id))
            this.props.dispatch(searchStudent({classroom:id}));
        }
    }
    onCheck=(event)=>{
        const localStore = {...this.state.localStore}
        if(event.target.checked) {
            if (!localStore.user.includes(event.target.id)) {
                localStore.user.push(event.target.id)
            }
        }else{
            if (localStore.user.includes(event.target.id)) {
                   const index= localStore.user.findIndex(item => item._id === event.target.index)
                console.log(index, 'index')
                localStore.user.splice(index, 1)

            }
        }
        this.setState({
            localStore:localStore
        })

    }

    create=()=>{
        const localStore = { ...this.state.localStore }

        this.props.dispatch(addAttendance(localStore))
        console.log(localStore, 'local')
    }



    render() {

        const {createState} = this.props.paymentReducer
        const {classroom} = this.props.classroomReducer
        const {classes} = this.props;
        const {students} = this.props.studentReducer
        console.log(students, "students array list ")
        const {user} = this.props;
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

                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '98%',
                            marginLeft: "1%",
                            marginRight: "1%",
                            marginTop:"1%",
                            marginBottom:"3%"
                        }}>
                            <h2>Attendance of Grade {get(classroom, 'grade')} </h2>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b></b></TableCell>
                                            <TableCell align="center"><b>Name </b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {students.map((stu, i) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="center" padding={'checkbox'}>
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center" padding={'checkbox'}>
                                                        <Checkbox
                                                            inputProps={{ 'aria-labelledby': `stu._id` }}
                                                            id ={stu.student._id}
                                                            onChange={this.onCheck}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        align="center">{get(stu, 'fullName')}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center">
                                                    </TableCell>


                                                </TableRow>
                                            )
                                        })
                                        }



                                                    {/*<TableCell align="center">{get(classroom, 'grade')}</TableCell>*/}
                                                    {/*<TableCell align="center">*/}

                                                    {/*    Details*/}
                                                    {/*</TableCell>*/}


                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                variant="contained"
                                style={{backgroundColor: "lightgreen", width:"30%",marginTop: "3%", marginBottom: "3%"}}
                                type="submit"
                                onClick={this.create.bind()}
                            >Submit
                            </Button>
                        </div>



        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    userReducer:state.userReducer,
    studentReducer: state.studentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(createAttendance))


