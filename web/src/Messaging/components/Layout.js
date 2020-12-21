import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserList from './UserList'
import UserDetail from './UserDetail'
import Message from './Message'
import MessageBox from './MessageBox'
import { updateMessages } from '../utils'

import createHistory from 'history/createBrowserHistory'
import { getUserById, getUserByIdAwait } from '../../User/actions'

const history = createHistory()

class Layout extends Component {

    state = {
        receiver: null
    }

    messageSent = () => {

    }

    receiverChanged = (receiver) => {
        this.props.dispatch(updateMessages(receiver))
        this.setState({ receiver })
        // TODO This only changes the URL itself
        history.push(`/messaging/${receiver._id}`)
    }

    async componentDidMount () {
        const receiver = this.props.match.params.id || null
        if (!!receiver) {
            const userReducer = await this.props.dispatch(getUserByIdAwait(receiver))
            if ((userReducer.value || undefined) && userReducer.value.request.status === 200) {
                this.setState({
                    receiver: userReducer.value.data
                })
            }
        }
    }

    render () {
        return (
            <div className="page-content" style={{
                display: 'flex'
            }}>
                <h2>Messages</h2>
                <UserList receiver={this.state.receiver} onReceiverChanged={this.receiverChanged.bind(this)}/>
                {
                    !!this.state.receiver &&
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateRows: 'auto 1fr auto',
                            height: 'calc(100vh - 100px)',
                            overflowY: 'scroll'
                        }}>
                        <UserDetail receiver={this.state.receiver}/>
                        <Message receiver={this.state.receiver}/>
                        <MessageBox receiver={this.state.receiver} onSent={this.messageSent.bind(this)}/>
                    </div>
                }
                {
                    !this.state.receiver &&
                    <div>
                        Please select a user to send or receive message
                    </div>

                }

            </div>
        )
    }
}

export default connect(state => ({}))(Layout)
