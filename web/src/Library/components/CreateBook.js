import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { createBook } from '../actions'
import MyInput from 'my-input-react'
import { getUser } from '../../utils'
import { get } from 'lodash'
import '../static/css/style.css'
import { searchTimeTable } from '../../TimeTable/action'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import MyTextField from "../../components/TextField";
import Button from "@material-ui/core/Button";
import  image from "../../img/onlineBook.jpg"
import Paper from "@material-ui/core/Paper";

class CreateBook extends Component {

    state = {
        localStore: {}
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }
        localStore[me] = value

        this.setState({ localStore })
    }

    async createBook () {
        const { localStore } = this.state
        const res = await this.props.dispatch(createBook(localStore))
        const status = get(res, 'value.request.status')
        if (status === 200) {
            const id = res.value.data._id
            this.props.history.push('/library/' + id + '/upload')
        }
    }

    render () {
        const { classes } = this.props
        const { createState } = this.state

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {
                        createState !== 2 &&

                        <div className="page-content">
                            <h2>Add Book</h2>
                            <div>
                                <button onClick={this.props.history.goBack}
                                        style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                                >⬅ Go back
                                </button>
                            </div>

                            <div className="column">
                                <Paper>
                                <div className="col-md-8 order-md-2" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    width: '98%',
                                    margin:"1%"

                                }}>

                                    <h4 className="mb-3">
                                        <h2>Info for creating Book</h2>
                                    </h4>
                                    <br/>
                                    <label className="FormLabel">Book Name</label>
                                    <MyInput
                                        me='name'
                                        required
                                        handler={this.handler.bind(this)}
                                        placeHolder='Name of Book'
                                        className="forminput"/>

                                    <label className="FormLabel">Subtitle</label>
                                    <MyInput
                                        me='subtitle'
                                        required
                                        handler={this.handler.bind(this)}
                                        placeHolder='Enter subtitle'
                                        className="forminput"/>

                                    <label className="FormLabel">Description</label>
                                    <MyInput
                                        me='description'
                                        required
                                        handler={this.handler.bind(this)}
                                        placeHolder='Description'
                                        className="forminput"/>

                                    <label className="FormLabel">Author</label>
                                    <MyInput
                                        me='author'

                                        handler={this.handler.bind(this)}
                                        placeHolder='Author of book'
                                        className="forminput"/>

                                    <button
                                        className="buttonStyle"
                                        type="submit"
                                        onClick={this.createBook.bind(this)}>
                                        ADD
                                    </button>
                                </div>
                                </Paper>
                            </div>
                            <div className="column3">
                                <h2>Online Library</h2>
                                <img src={image} style={{width:"100%"}}/>
                            </div>
                        </div>


                    }
                    {
                        createState === 2 &&
                        <div>
                            <div>BOOK CREATED successfully</div>
                        </div>
                    }
                    <Box pt={4}>
                        <Footer/>
                    </Box>

                </Container>
            </main>

        )
    }
}

export default connect(state => ({}))(withStyles(useStyles)(CreateBook))
