import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import MyInput from 'my-input-react'
import { connect } from 'react-redux'
import { createSubject } from '../actions'
import "../static/css/style.css"
import { getAllClassroom } from '../../Home/actions'
import { getUser } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'

class CreateSubject extends Component {
    state = {
        body: {}
    }

    handler (me, value) {
        const body = { ...this.state.body }  // reading from the state ( by value )
        body[me] = value

        this.setState({ body }) // write to state
    }

    createSub () {
        const { body } = this.state // reading from the state ( by ref )
        this.props.dispatch(createSubject(body))
        this.props.history.push('/subject/list')
    }

    render () {
        const { classes } = this.props;
        const { createState } = this.props.subjectReducer

        return(

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                {
                    createState !== 2 &&
                    <div className="page-content">

                            <h2>Create Subjects</h2>
                            <Button onClick={this.props.history.goBack}
                                        style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                                >⬅ Go back</Button>

                        <div className="row" style={{marginLeft:"7%"}}>
                            <label className="urpLabel"> Subject</label>
                            <div className="col-3">
                                <MyInput
                                    me='name'
                                    handler={this.handler.bind(this)}
                                    placeHolder='Enter subject'
                                    className=""/>
                            </div>
                        </div>
                            <br></br>
                                <Button
                                variant="contained"
                                color="primary"
                                    onClick={this.createSub.bind(this)}
                                  
                                >
                                    Create subject
                                </Button>
                               
                           

                    </div>
                }


                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(CreateSubject))
