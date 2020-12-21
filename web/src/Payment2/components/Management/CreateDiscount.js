import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
import {addTimeTable} from "../../../TimeTable/action";
import {addPaymentCategory} from "../../actions";

toast.configure()

class CreateDiscount extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        localStore: {

        },
    }

    componentDidMount () {
        this.props.dispatch(getAllClassroom())

    }

    createDiscount =(e)=> {
        e.preventDefault()
        const { localStore } = this.state
        const req = { ...localStore}
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

    render () {

        const { createState } = this.props.paymentReducer
        const { classrooms } = this.props.classroomReducer
        const { classes } = this.props;

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
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <div className="page-content">
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>

                        <form className={classes.root} onSubmit={this.createDiscount.bind(this)}>

                                    <div className="col-md-8 order-md-2" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        width: '70%',
                                        marginLeft: '7%'
                                    }}>
                                        <div className="mb-3">
                                            <label className="urpLabel">Info for creating Discount category
                                            </label>
                                        </div>

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
                                                <option value={classroom._id}>Class: {classroom.grade},
                                                    Section: {classroom.section}</option>
                                            )
                                        }
                                        )
                                    }
                                </MyTextField>


                                        <MyTextField id="outlined"
                                                     variant="outlined"
                                                     me='category'
                                                     handler={this.handler}
                                                     label="category"
                                                     style={{height: "100px"}}/>



                                        <MyTextField id="outlined"
                                                     variant="outlined"
                                                     me='amount'
                                                     handler={this.handler}
                                                     label="amount"
                                                     style={{height: "100px"}}/>


                                {/*<label htmlFor="category" style={{fontSize:"18px", color:"dimgrey"}}>Category</label>*/}
                                {/*<select name="category" id="category" className="urpSelect"*/}
                                {/*        onChange={this.selectChanged}>*/}
                                {/*    <option value={null} disabled selected>Please select a category</option>*/}
                                {/*    {*/}
                                {/*        getPaymentCategories().map((category) => {*/}
                                {/*            return (*/}
                                {/*                <option value={category}> {category}</option>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</select>*/}




                                        <button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                           >Create
                                        </button>



                            </div>
                                </form>

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
    paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(CreateDiscount))
