import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createMessageAwait } from '../actions'
import { getUser } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faSmileWink
} from '@fortawesome/free-solid-svg-icons'
import MyInput from 'my-input-react'
import { updateMessages } from '../utils'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@material-ui/core/Button'
import { defaultParent } from '../constants'
import MyTextField from "../../components/TextField";
import {withStyles} from "@material-ui/core";
import {useStyles} from "../../UseStyles";

toast.configure()

class MessageBox extends Component {

    state = {
        content: '',
        // TODO Remove this when API is fixed
        parent: (this.props.parent) ? this.props.parent : ''
    }

    componentDidMount () {
        // const user = getUser()
        // this.props.dispatch(searchMessages({}))
    }

    sendMessage = async e => {
        e.preventDefault()
        const res = { ...this.state, sender: getUser()._id, receiver: this.props.receiver._id }
        const messageReducer = await this.props.dispatch(createMessageAwait(res))
        if ((messageReducer.value || undefined) && messageReducer.value.request.status === 200) {
            this.setState({ content: '' })
            const message = messageReducer.value.data
            if (typeof this.props.onMessageSent === 'function') {
                this.props.onMessageSent(true, message)
                toast.success(`Message sent to ${this.props.receiver.fullName}`)
                // do something
            }
            // this.props.dispatch(updateMessages(this.props.receiver))
        }
    }



    handler = (me, value) =>
    {
        this.setState({ content: value })
    }


    render () {
        const  {classes} =this.props
        return (


                <form  className={classes.root} onSubmit={this.sendMessage.bind(this)} style={{ width: '100%' }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'}}>


                        <MyTextField id="outlined"
                                     variant="outlined"
                                     value={this.state.content}
                                     me='content'
                                     handler={this.handler}
                                     label="Message"
                        />


                        {/*<MyTextField*/}
                        {/*    className="write-message"*/}
                        {/*    style={{ backgroundColor: 'darkgrey' }}*/}
                        {/*    value={this.state.content}*/}
                        {/*    onInput={this.handler.bind(this)}*/}
                        {/*    placeholder='Please type message here'/>*/}
                        <br></br>

                    </div>
                    <Button variant="contained" color={'primary'} type="submit"
                            onSubmit={this.sendMessage.bind(this)}>Send</Button>
                </form>

        )
    }
}

export default connect(state => ({
    messagingReducer: state.messagingReducer
}))(withStyles(useStyles)(MessageBox))
