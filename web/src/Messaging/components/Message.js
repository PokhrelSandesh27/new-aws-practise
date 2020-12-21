import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { searchMessages } from '../actions'
import MessageBox from './MessageBox'
import { getUser } from '../../utils'

import '../static/css/style.css'
import moment from 'moment'

class Message extends Component {

    state = {}

    componentDidMount () {
        this.reloadMsg()
    }

    reloadMsg = () => {
        const user = getUser()
        this.props.dispatch(searchMessages({
            sender: user._id,
            receiver: this.props.receiver._id,
        }))
    }

    render () {
        const { messages, fetchState } = this.props.messagingReducer
        const receiver = this.props.receiver._id
        const sender = getUser()._id

        return (
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                    {
                        messages.reverse()
                            .map((message, i) => {
                                let className = ''
                                if (sender === message.sender._id && receiver === message.receiver._id) {
                                    className = 'sender'
                                } else if (sender === message.receiver._id && receiver === message.sender._id)
                                    className = 'receiver'
                                return (
                                    <article className={`message ${className}`}>
                                        <span>{message.content}</span>
                                        {moment(message.createdAt).fromNow()}
                                    </article>
                                )
                            })
                    }
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    messagingReducer: state.messagingReducer
}))(Message)
