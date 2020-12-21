import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "../../UseStyles";
import MyTextField from "../../components/TextField";
import { createUser, getAllUsers } from '../../User/actions'
import Container from "@material-ui/core/Container";
import {formatDate} from "react-calendar/dist/umd/shared/dateFormatter";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid'
import { assignUserToClassroom, createNewUser } from '../actions'
import { getAllClassroom } from '../../Home/actions'
import { toast } from 'react-toastify'

toast.configure()
class AddStudents extends React.Component {

    state = {
        formData: {
            username:'',
            fullName:'',
            email: '',
            currentAddress:'',
            permanentAddress:'',
            phone:'',
            motherName:'',
            fatherName:'',
            status:'ACTIVE',
            groups:['STUDENT'],
            password: '',
            classroomId: null,
            userId: null,
        }
    }

    classroomChanged = event => {
        const classroomId = event.target.value
        this.setState({ classroomId })
    }

    handleChange = (event) => {
        const formData = {...this.state.formData}
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }
    groupsChanged = event => {
        const formData = {...this.state.formData}

        formData.groups = []
        this.setState({formData})
    }

    handleSubmit =  async (e) => {
        e.preventDefault()
        const {formData} = this.state
        const req = {...formData}
        console.log(req, 'req')
        try {
            const resp = await this.props.dispatch(createUser(req))
            const userId = resp.value.data._id
            const classroomId = this.state.classroomId

            this.props.dispatch(assignUserToClassroom({ classroom: classroomId, student: userId }))
                .then(() => toast.success('Student created successfully'))
        } catch (e) {
            toast.success('Student created successfully')
        }

        // this.props.dispatch(createUser(req))
        //     .then(resp => {
        //         const userId = resp.value.data._id
        //         const classroomId = this.state.classroomId
        //
        //         this.props.dispatch(assignUserToClassroom({classroom: classroomId, student: userId}))
        //
        //         toast.success('user added')
        //
        //     })
        //     .catch(err => {
        //         toast.error('User assign failed');
        //     })

    }

    //
    //
    // createUsers = async (e) => {
    //     e.preventDefault()
    //     const { localStore } = this.state
    //     const req = { ...localStore }
    //
    //     try {
    //         const resp = await this.props.dispatch(createUser(req))
    //         const userId = resp.value.data._id
    //         const classroomId = this.state.classroomId
    //
    //         this.props.dispatch(assignUserToClassroom({ classroom: classroomId, student: userId }))
    //             .then(() => toast.success('Student created successfully'))
    //     } catch (e) {
    //         toast.error('User assign failed')
    //     }
    //
    //     // this.props.dispatch(createUser(req))
    //     //     .then(resp => {
    //     //         const userId = resp.value.data._id
    //     //         const classroomId = this.state.classroomId
    //     //
    //     //         this.props.dispatch(assignUserToClassroom({classroom: classroomId, student: userId}))
    //     //
    //     //         toast.success('user added')
    //     //
    //     //     })
    //     //     .catch(err => {
    //     //         toast.error('User assign failed');
    //     //     })
    // }

    componentDidMount () {
        this.props.dispatch(getAllClassroom())
        this.props.dispatch(getAllUsers())
    }

    render() {
        const { classrooms } = this.props.classroomReducer
        const {classes} = this.props;
        const { formData } = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <h2>ADD User</h2>

                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="UserName"
                                    onChange={this.handleChange}
                                    name="username"
                                    value={formData.username}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    type={ 'password'}
                                    value={formData.password}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'password must be longer than 6 character',"Password must be shorter than 10"]}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="FullName"
                                    onChange={this.handleChange}
                                    name="fullName"
                                    value={formData.fullName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 character']}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="phone"
                                    onChange={this.handleChange}
                                    name="phone"
                                    value={formData.phone}
                                    validators={[ 'isNumber']}
                                    errorMessages={['Phone Number should be in Numeric form' ]}
                                />


                            </Grid>
                            <br/>
                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                />
                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="Father"
                                    onChange={this.handleChange}
                                    name="fatherName"
                                    value={formData.fatherName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 characters']}b
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="motherName"
                                    onChange={this.handleChange}
                                    name="motherName"
                                    value={formData.motherName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 characters']}b
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="currentAddress"
                                    onChange={this.handleChange}
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />



                            </Grid>
                            <br/>
                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>
                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="permanentAddress"
                                    onChange={this.handleChange}
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />


                                <MyTextField
                                    select
                                    name="classroom"
                                    required
                                    id="outlined-select-native"
                                    // onChange={this.classroomChanged}
                                    handler={this.classroomChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    label="ClassRoom"
                                    helperText="Please select Class Room"
                                    id="filled"
                                    variant="filled"
                                >
                                    {
                                        classrooms.map((classroom) => {
                                            return (
                                                <option value={classroom._id}>Class: {classroom.grade},
                                                    Section: {classroom.section}</option>
                                            )
                                        })
                                    }
                                </MyTextField>


                                {/*<div>*/}
                                {/*    <select*/}
                                {/*        name="status"*/}
                                {/*        onChange={this.handleChange}*/}
                                {/*        className='forminput'>*/}
                                {/*        <option value={null} disabled selected>Please Select Status</option>*/}
                                {/*        <option value="ACTIVE">ACTIVE</option>*/}
                                {/*        <option value="DE-ACTIVE">DE-ACTIVE</option>*/}
                                {/*    </select>*/}

                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <select*/}
                                {/*        name="groups"*/}
                                {/*        className='forminput'*/}
                                {/*        onChange={this.groupsChanged}>*/}
                                {/*        <option value={null} disabled selected>Please select Groups</option>*/}
                                {/*        <option value="STAFF">STAFF</option>*/}
                                {/*        <option value="LIBRARIAN">LIBRARIAN</option>*/}
                                {/*        <option value="MANAGEMENT">MANAGEMENT</option>*/}
                                {/*        <option value="TEACHER">TEACHER</option>*/}
                                {/*        <option value="ACCOUNTANT">ACCOUNTANT</option>*/}

                                {/*    </select>*/}
                                {/*</div>*/}
                            </Grid>
                            <br/>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"  fullWidth>
                                submit

                            </Button>
                        </ValidatorForm>
                    </div>
                </Container>
            </main>
        );
    }
}

export default connect(state => ({
    loginReducer: state.loginReducer,
    classroomReducer: state.classroomReducer,
    userReducer: state.userReducer,
    studentReducer: state.studentReducer,

}))(withStyles(useStyles)(AddStudents))
