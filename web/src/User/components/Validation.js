import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createUser, getAllUsers} from '../actions'
import MyInput from 'my-input-react'
import {getGroups, getUser} from '../../utils'
import "../static/css/style.css"
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from "@material-ui/core/TextField";
import MyTextField from "../../components/TextField";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

toast.configure();

class CreateClassroom extends Component {

    state = {
        localStore: {}
    }

    handler = (me, value) => {

        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    createUsers = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const req = {...localStore}
        this.props.dispatch(createUser(req))
            .then(resp => {
                toast.success('user added')

            })
            .catch(err => {
                toast.error('User assign failed');
            })


    }

    statusChanged = event => {
        const localStore = {...this.state.localStore}
        localStore.status = event.target.value

        this.setState({localStore})
    }
    groupsChanged = event => {
        const localStore = {...this.state.localStore}

        localStore.groups = [event.target.value]
        this.setState({localStore})
    }


    render() {
        const {classes} = this.props;
        const {localStore} = this.state
        const {users} = this.props.userReducer
        // const group     = ['LIBRARIAN', 'STUDENT', 'MANAGEMENT', "TEACHER"],
        //     MakeItem = function(X) {
        //         return <option value="groups">{X}</option>;
        //     };

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Creating User</h2>

                        <Button onClick={this.props.history.goBack}
                                style={{marginLeft: '1%', backgroundColor: "#f0f1f6", color: "green"}}
                        >⬅ Go back</Button>

                        <Box component="div" display="inline">
                            <form className={classes.root} onSubmit={this.createUsers.bind(this)}>

                                <div className="col-md-8 order-md-2" style={{
                                    display: 'inline',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap:'5%'
                                }}>

                                    <div className="mb-3">
                                        <label className="urpLabel">Info for creating User
                                        </label>
                                    </div>


                                    <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='username'
                                                     required
                                                     helperText={"format user_001"}
                                                     handler={this.handler}
                                                     label="Username"/>


                                        <MyTextField
                                            helperText={"Password must contain 6 character"}
                                            id="filled"
                                            variant="filled"
                                            me='password'
                                            type='password'
                                            required
                                            handler={this.handler}
                                            label="Password"
                                            inputProps={{
                                                minLength:6,
                                                maxLength: 10,
                                            }}

                                        />
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='fullName'
                                            // helperText={"FullName must contain 6 character long"}
                                                     required
                                                     handler={this.handler}
                                                     label="FullName"
                                                     style={{height: "100px"}}
                                        />
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='currentAddress'
                                                     required
                                                     handler={this.handler}
                                                     label="CurrentAddress"
                                                     style={{height: "100px"}}
                                        />
                                    </Grid>

                                    <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%"}}>

                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='permanentAddress'
                                                     required
                                                     handler={this.handler}
                                                     label="PermanentAddress"
                                                     style={{height: "100px"}}
                                        />
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='phone'
                                                     handler={this.handler}
                                                     label="Phone Number"
                                                     style={{height: "100px"}}
                                        />

                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='email'
                                                     handler={this.handler}
                                                     label="Email-address"
                                                     style={{height: "100px"}}
                                        />
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='fatherName'
                                            // helperText={"FatherName must contain 6 character long"}
                                                     handler={this.handler}
                                                     label="FatherName"
                                                     style={{height: "100px"}}
                                        />

                                    </Grid>

                                    <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>

                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='motherName'
                                            // helperText={"MotherName must contain 6 character long"}
                                                     handler={this.handler}
                                                     label="MotherName"
                                                     style={{height: "100px"}}
                                        />
                                        <MyTextField
                                            select
                                            name="status"
                                            required
                                            id="outlined-select-native"
                                            handler={this.statusChanged}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            label="Status"
                                            helperText="Please select status"
                                            id="filled"
                                            variant="filled"
                                        >

                                            <option value="ACTIVE">ACTIVE</option>
                                            <option value="DE-ACTIVE">DE-ACTIVE</option>

                                        </MyTextField>

                                        <MyTextField
                                            select
                                            name="groups"
                                            required
                                            id="outlined-select-native"
                                            handler={this.groupsChanged}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            label="Groups"
                                            helperText="Please select groups"
                                            id="filled"
                                            variant="filled"


                                        >
                                            <option value="STUDENT">STAFF</option>
                                            <option value="LIBRARIAN">LIBRARIAN</option>
                                            <option value="MANAGEMENT">MANAGEMENT</option>
                                            <option value="TEACHER">TEACHER</option>
                                            <option value="STUDENT">ACCOUNTANT</option>
                                            {/* {
                                       group.map(MakeItem)
                                      } */}


                                        </MyTextField>

                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        size={'100%'}
                                    >
                                        Create
                                    </Button>

                                </div>
                            </form>

                        </Box>
                        {/*














                    <div className="urpForm">
                        <div className="col-md-8 order-md-2"
                             style={{display:"flex" ,
                                 justifyContent: "center"
                                 ,flexDirection:"column",
                                 width: "70%" ,
                                 marginLeft : "7%"}}>
                            <label className="urpLabel">
                                <u>Info for creating User</u>
                            </label>
                            <br/>
                            <label htmlFor="username"style={{fontSize: "16px" , color: "dimgrey"}}>UserName*</label>
                            <MyInput
                                me='username'
                                handler={this.handler.bind(this)}
                                placeHolder='Enter Username'
                                className="urpInput" />

                            <label htmlFor="password" style={{fontSize: "16px" , color: "dimgrey"}}>Password*</label>
                            <MyInput
                                me='password'
                                handler={this.handler.bind(this)}
                                placeHolder='password'
                                className="urpInput"/>

                            <label htmlFor="fullName" style={{fontSize: "16px" , color: "dimgrey"}}>FullName*</label>
                            <MyInput
                                me='fullName'
                                handler={this.handler.bind(this)}
                                placeHolder='FullName'
                                className="urpInput"/>
                            <label htmlFor="currentAddress" style={{fontSize: "16px" , color: "dimgrey"}}>Current Address*</label>
                            <MyInput
                                me='currentAddress'
                                handler={this.handler.bind(this)}
                                placeHolder='Your current address'
                                className="urpInput"/>
                            <label htmlFor="permanentAddress" style={{fontSize: "16px" , color: "dimgrey"}}>Permanent Address*</label>
                            <MyInput
                                me='permanentAddress'
                                handler={this.handler.bind(this)}
                                placeHolder='Your permanent address'
                                className="urpInput"/>
                            <label htmlFor="phone" style={{fontSize: "16px" , color: "dimgrey"}}>Phone no.*</label>
                            <MyInput
                                me='phone'
                                handler={this.handler.bind(this)}
                                placeHolder='phone no.'
                                className="urpInput"/>

                            <label htmlFor="email" style={{fontSize: "16px" , color: "dimgrey"}}>Email Address*</label>
                            <MyInput
                                me='email'
                                handler={this.handler.bind(this)}
                                placeHolder='Your email address'
                                className="urpInput"/>

                            <label htmlFor="fatherName" style={{fontSize: "16px" , color: "dimgrey"}}>Father Name</label>
                            <MyInput
                                me='fatherName'
                                handler={this.handler.bind(this)}
                                placeHolder='FatherName'
                                className="urpInput"/>

                            <label htmlFor="motherName" style={{fontSize: "16px" , color: "dimgrey"}}>Mother Name</label>
                            <MyInput
                                me='motherName'
                                handler={this.handler.bind(this)}
                                placeHolder='Mother Name'
                                className="urpInput"/>


                            <label htmlFor="status" style={{fontSize: "16px" , color: "dimgrey"}}>Status</label>
                            <select
                                name="status"
                                className="urpSelect"
                                onChange={this.statusChanged}>

                                <option value={null} disabled selected>Please select a group</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="DE-ACTIVE">DE-ACTIVE</option>

                            </select>
                            <label htmlFor="groups" style={{fontSize: "16px" , color: "dimgrey"}}>Groups</label>
                            <select onChange={this.groupsChanged} className="urpSelect">
                                {
                                    group.map(MakeItem)

                                }
                            </select>


                            <button

                                type="submit"
                                style={{backgroundColor: "#4D6875", marginTop: "5%", marginLeft: "1%" }}
                                onClick={this.createUsers.bind(this)}>
                                Create
                            </button>

 */}

                    </div>
                    {/*
                    </div>
                </div> */}
                </Container>
            </main>
        )
    }
}

export default connect(state => ({

    userReducer: state.userReducer
}))(withStyles(useStyles)(CreateClassroom))
