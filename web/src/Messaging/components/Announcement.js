import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import UserList from './UserList'
import UserDetail from './UserDetail'
import Message from './Message'
import MessageBox from './MessageBox'
import { updateMessages } from '../utils'

import createHistory from 'history/createBrowserHistory'
import { getUser } from '../../utils'
import { searchMessages } from '../actions'
import moment from 'moment'

const history = createHistory()

class Announcement extends Component {

    state = {
        sender: null
    }

    componentDidMount () {
        const receiver = getUser()._id
        const sender = this.props.match.params.id || null
        this.props.dispatch(searchMessages((!sender) ? { receiver } : { receiver, sender }))

    }

    render () {
        const { messages, searchState } = this.props.messagingReducer
        const noSender = !this.props.match.params.id
        return (
            <div className="page-content">
                <h2>Messages</h2>
                <div className="row">
                    <button onClick={this.props.history.goBack}
                            style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                    >⬅ Go back
                    </button>
                    <br></br>
                    <div className="col-md-6">
                        <div className="panel panel-primary">


                            <div className="mailbox">
                                <div className="nav">
                                    <NavLink to={''}
                                    >compose
                                    </NavLink>
                                    <a href="#" className="active">inbox</a>
                                    <a href="#">starred</a>
                                    <a href="#">sent</a>
                                    <a href="#">drafts (1)</a>
                                    <a href="#">trash</a>
                                </div>
                                <div className="messages">
                                    <input name="search" placeholder="search"/>
                                    <div className="actions-dropdown">
                                        <label>actions <span>▼</span></label>
                                        <ul>
                                            <li>flag</li>
                                            <li>move</li>
                                            <li>delete</li>
                                        </ul>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                    <div className="message">
                                        <input type="checkbox"/>
                                        <span className="sender">lauren</span>
                                        <span className="date">today</span>
                                        <span className="title">hello world</span>
                                    </div>

                                </div>
                            </div>


                            {/*<table className="TimeTable">*/}
                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        <th>#</th>*/}
                            {/*        <th>Message</th>*/}
                            {/*        <th>Sent By</th>*/}
                            {/*        <th>Sent At</th>*/}
                            {/*        {*/}
                            {/*            noSender &&*/}
                            {/*            <th>Filter</th>*/}
                            {/*        }*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    {*/}
                            {/*        searchState === 2 &&*/}
                            {/*        messages.map((message, i) => (*/}
                            {/*                <tr>*/}
                            {/*                    <td>{i + 1}</td>*/}
                            {/*                    <td>{message.content}</td>*/}
                            {/*                    <td>{message.sender.fullName}</td>*/}
                            {/*                    <td>{moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</td>*/}
                            {/*                    {*/}
                            {/*                        noSender &&*/}
                            {/*                        <td><NavLink to={`/announcement/${message.sender._id}`}>Filter</NavLink></td>*/}
                            {/*                    }*/}
                            {/*                </tr>*/}
                            {/*            )*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</table>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    messagingReducer: state.messagingReducer
}))(Announcement)
