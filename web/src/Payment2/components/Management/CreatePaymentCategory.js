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
import {addPaymentCategory} from '../../actions'



toast.configure()

class CreatePaymentCategory extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false ,
        localStore: {},
    }

    componentDidMount() {
        this.props.dispatch(getAllClassroom())

    }

    createPaymentCat = (e) => {
        e.preventDefault()
        const {localStore} = this.state
        const req = {...localStore}
        this.props.dispatch(addPaymentCategory(req))
            .then((resp) => {
                toast.success('succesfully Added')
            })
            .catch(err => {
                toast.error('failed to Add');
            })

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
        let msg
        if (createState === 1)
            msg = 'Creating Discount'
        else
            msg = 'Create Discount'
        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/discount/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <div>
            <form className={classes.root}
                  onSubmit={this.createPaymentCat.bind(this)}>


                <div className="col-md-8 order-md-2" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '70%',
                    marginLeft: "11%",
                    marginRight: "7%",
                    marginTop:"3%",
                    marginBottom:"3%"
                }}>
                <MyTextField id="outlined"
                             variant="outlined"
                             me='name'
                             required
                             handler={this.handler}
                             label="Payment Type"
                           />

                <MyTextField
                    select
                    name="classroom"
                    required
                    id="outlined-select-native"
                    handler={this.selectChanged}
                    label="Class Room"
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
                    <MyTextField id="outlined"
                                 variant="outlined"
                                 me='year'
                                 required
                                 handler={this.handler}
                                 defaultValue="2020"
                                 label="Year"
                                />



                <MyTextField id="outlined"
                             variant="outlined"
                             me='amount'
                             required
                             handler={this.handler}
                             label="Amount"
                            />

                <Button
                    variant="contained"
                    style={{backgroundColor:"lightgreen", marginTop:"3%", marginBottom:"3%"}}
                    type="submit"
                >Create
                </Button>

                </div>

            </form>
            </div>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(CreatePaymentCategory))


