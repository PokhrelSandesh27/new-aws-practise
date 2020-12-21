import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessage, searchMessages } from '../actions'
import { cleanObject, getUser } from '../../utils'
import '../static/css/style.css'
import moment from 'moment'
import SingleCompose from './ComposeComponent/SingleCompose'
import Button from '@material-ui/core/Button'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faChevronCircleRight, faHistory} from "@fortawesome/free-solid-svg-icons";
import send from '../../img/send.svg'
import history from '../../img/history.svg'
import visi from '../../img/visi.svg'

Modal.setAppElement('#root')

class MessageMail extends Component {

    state = {
        compose: {
            status: false,
            receiver: null
        },
        search: { 'content': '' }
    }
    isHistory = !!this.props.parentId

    componentDidMount () {
        if (this.isHistory) {
            this.props.dispatch(getMessage(this.props.parentId))
        }
        this.reloadMsg()
    }

    composeAMessage (receiver, parent) {
        // this.openModal()
        this.setState({
            compose: {
                status: true,
                receiver: receiver,
                parent: parent
            }
        })
    }

    openModal () {
        this.setState({ showModalState: true })
    }

    closeModal () {
        this.setState({ showModalState: false })
    }

    search = (e) => {
        const search = {
            'content': e.target.value
        }
        this.setState({ search: { ...this.state.search, ...search } })

        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.reloadMsg(search), 300)
    }

    messageComposed = (message, status) => {
        this.setState({
            compose: {
                status: false,
                receiver: null,
            }
        })
        if (status)
            this.reloadMsg()
    }

    reloadMsg = (data = {}) => {
        if (this.isHistory) {
            data.parent = this.props.parentId
        } else {
            const user = getUser()
            const role = !!this.props.sender ? 'sender' : 'receiver'
            data[role] = user._id
        }
        const req = { ...this.state.search, ...data }
        this.props.dispatch(searchMessages(cleanObject(req)))
    }

    render () {
        const { messages, searchState, message, readState } = this.props.messagingReducer
        const role = this.props.sender ? 'receiver' : 'sender'
        const { _id: id } = getUser()

        return (
            <React.Fragment>
                <SingleCompose isOpen={this.state.compose.status} receiver={this.state.compose.receiver}
                               parent={this.state.compose.parent}
                               onCompletion={this.messageComposed.bind(this)}/>
                <input onInput={this.search} value={this.state.search.content} name="search" placeholder="search"/>
                {
                    readState === 2 && this.isHistory &&
                    <div className="message">
                        <div>Message Head</div>
                        <span className="sender">{message[role].fullName}</span>
                        <span className="date">{moment(message.createdAt).fromNow()}</span>
                        <span className="msgtitle">{message.content}</span>
                        {/*<Button variant="contained" color="primary" style={{ marginLeft: '57%' }}*/}
                        {/*        onClick={() => {this.composeAMessage(message[role], message.parent ? message.parent._id : message._id)}}>*/}
                        {/*    Reply*/}
                        {/*</Button>*/}


                        <img src={send}
                             className="his"
                             onClick={() => {this.composeAMessage(message[role], message.parent ? message.parent._id : message._id)}}
                            >

                        </img>
                    </div>
                }
                {
                    searchState === 2 && !this.isHistory &&
                    messages.reverse()
                        .map((message, i) => {
                            return (
                                <div className="message">
                                    <span className="sender">{message[role].fullName}</span>
                                    <span className="date">{moment(message.createdAt).fromNow()}</span>
                                    <span className="msgtitle">{message.content}</span>
                                    <img src={send}
                                         className="his"

                                         onClick={() => this.composeAMessage(message[role], message.parent ? message.parent._id : message._id)}
                                    >

                                    </img>

                                    {/*<FontAwesomeIcon*/}
                                    {/*    icon={faChevronCircleRight}*/}
                                    {/*    style={*/}
                                    {/*        {*/}
                                    {/*            width: '100%',*/}
                                    {/*            color: '#4caf50',*/}
                                    {/*            cursor: 'pointer'*/}
                                    {/*        }}*/}
                                    {/*    onClick={() => this.composeAMessage(message[role], message.parent ? message.parent._id : message._id)}*/}
                                    {/*/>*/}



                                    {/*<Button variant="contained" color="primary" style={{ marginLeft: '57%' }}*/}
                                    {/*        onClick={() => this.composeAMessage(message[role], message.parent ? message.parent._id : message._id)}>*/}
                                    {/*    Reply*/}
                                    {/*</Button>*/}
                                    {
                                        message.parent &&
                                        <React.Fragment>
                                            <div className="message">
                                                {
                                                    message.parent.sender._id !== id &&
                                                    <span
                                                        className="sender">Sender: {message.parent.sender.fullName}</span>
                                                }
                                                {
                                                    message.receiver._id !== id &&
                                                    <span
                                                        className="reciver">Receiver: {message.parent.receiver.fullName}</span>
                                                }
                                                <span
                                                    className="date">{moment(message.parent.createdAt).fromNow()}</span>
                                                <span className="msgtitle">{message.parent.content}</span>
                                            </div>


                                            <NavLink to={`/messaging/msg/${message.parent._id}`}>
                                                <img src={history}
                                                        className="his"

                                                >

                                                </img>

                                                {/*<Button variant="contained" color="primary"*/}
                                                {/*        style={{ marginLeft: '57%' }}>*/}
                                                {/*    View History*/}
                                                {/*</Button>*/}
                                            </NavLink>

                                        </React.Fragment>
                                    }

                                </div>)
                        })
                }
                {
                    searchState === 2 && this.isHistory &&
                    <React.Fragment>
                        <span className={'message'} style={{marginLeft:"3%"}}>Message History</span>
                        {
                            messages.reverse()
                                .map((message, i) => {
                                    return (
                                        <div className="message">
                                            {
                                                message.sender._id !== id &&
                                                <span className="sender">Sender: {message.sender.fullName}</span>
                                            }
                                            <br></br>

                                            <div style={{marginTop:"1%"}}>


                                            {
                                                message.receiver._id !== id &&
                                                <span className="sender">Receiver: {message.receiver.fullName}</span>
                                            }
                                            </div>
                                            <span className="date">{moment(message.createdAt).fromNow()}</span>
                                            <span className="msgtitle">{message.content}</span>
                                            <img src={visi}

                                                 style={
                                                     {
                                                         marginTop:"1%",
                                                         marginLeft:"60%",
                                                         width: '0.1%',
                                                         color: '#4caf50',
                                                         cursor: 'pointer'
                                                     }}

                                            >

                                            </img>
                                            <div style={{marginTop:"1%"}}>

                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </React.Fragment>
                }
                {
                    searchState === 1 &&
                    <div>Searching...</div>
                }
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    messagingReducer: state.messagingReducer
}))(MessageMail)
