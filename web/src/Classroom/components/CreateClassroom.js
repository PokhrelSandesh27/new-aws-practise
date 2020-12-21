import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addClassroom} from '../../Home/actions'
import MyInput from 'my-input-react'
import {getUser} from '../../utils'
import "../static/css/style.css"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {searchTimeTable} from '../../TimeTable/action'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'
import {useStyles} from '../../UseStyles'
import Button from '@material-ui/core/Button'
import MyTextField from "../../components/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

toast.configure();

class CreateClassroom extends Component {
    state =
        {
            localStore: {},
            open:false
        }



    handler = (me, value) => {
        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    createClassroom = (e) => {
        e.preventDefault()
        const user = getUser()
        const {localStore} = this.state
        const req = {...localStore, teacher: user._id}
        this.props.dispatch(addClassroom(req))
            .then(resp => {
                this.open();
            })
            .catch(err => {
                toast.error('Subject assign failed');


            })


    }
    open(){
        this.setState({open:true})
    }
    handleClose = (event, reason)=> {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open: false})
    }


    render() {
        const {classes} = this.props;
        const {localStore} = this.state
        const {addState} = this.props.classroomReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Creating Classroom</h2>
                        <div className="urpForm">
                            <div className="col-md-8 order-md-2" style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                width: "70%",
                                marginLeft: "7%"
                            }}>

                                <Button onClick={this.props.history.goBack}
                                        style={{marginLeft: '1%', backgroundColor: "#f0f1f6", color: "green"}}
                                >⬅ Go back</Button>

                                {
                                    addState === 1
                                }
                                {addState === 2



                                }
                                {
                                    addState === 3 &&
                                    toast.error('Something went wrong') && toast.dismiss()
                                }
                                <form className={classes.root} onSubmit={this.createClassroom.bind(this)}>

                                    <div className="col-md-8 order-md-2" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        width: '70%',
                                        marginLeft: '7%'
                                    }}>

                                        <div className="mb-3">
                                            <label className="urpLabel">Info for creating User
                                            </label>
                                        </div>
                                        <MyTextField id="outlined"

                                                     variant="outlined"
                                                     me='grade'
                                                     required
                                                     handler={this.handler}
                                                     label="Grade"
                                                     style={{height: "100px"}}/>


                                        <MyTextField id="outlined"
                                                     variant="outlined"
                                                     me='section'

                                                     required
                                                     handler={this.handler}
                                                     label="Section"
                                                     style={{height: "100px"}}
                                        />
                                        {/* <MyTextField id="outlined"
                                                                    variant="outlined"
                                                                    me='fullName'
                                                                    required
                                                                    handler={this.handler}
                                                                    label="FullName"
                                                                    style={{height: "100px"}}
                                                                    /> */}


                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"


                                        >Create
                                        </Button>
                                    </div>
                                </form>
                                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                    <Alert onClose={this.handleClose} severity="success">
                                        Book Details Loaded!
                                    </Alert>
                                </Snackbar>


                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(CreateClassroom))
