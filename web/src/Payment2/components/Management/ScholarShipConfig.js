import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import {getAllClassroom} from "../../../Classroom/actions";
import {addPaymentCategory} from "../../actions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CreateScholarConfig from "./CreateScholarConfig";
import AssignScholarStudent from "./AssignScholarStudent";
import ListScholarConfig from "./ListScholarConfig";


toast.configure()

class ScholarShipConfig extends Component {

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

    createDiscount = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const req = {...localStore}
        this.props.dispatch(addPaymentCategory(req))

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
            <div className="col-md-8 order-md-2" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',

                    marginTop:"1%"
                }}>


                    <div className="mb-3">


                        <Tabs
                            classes={{indicator: classes.bigIndicator}}
                            value={value}
                            onChange={this.handleChange}
                        >

                            <Tab
                                style=
                                    {{marginLeft:"15%",
                                        fontFamily:"Shadows Into Light, cursive",
                                        fontWeight:"bold"}} label="Scholar Config"/>

                            <Tab style={{marginLeft:"15%",
                                fontFamily:"Shadows Into Light, cursive",
                                fontWeight:"bold"}} label="List student"/>


                        </Tabs>


                        <div key="tab-content">
                            {value === 0 && <Typography>
                                <CreateScholarConfig/>
                                </Typography>}


                            {/*{value === 1 && <Typography>*/}
                            {/*        <AssignScholarStudent/>*/}
                            {/*</Typography>}*/}

                            {value === 1 && <Typography>
                                <ListScholarConfig/>
                            </Typography>}

                        </div>
                    </div>

                </div>


        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ScholarShipConfig))


