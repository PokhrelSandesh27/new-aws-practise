import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getAllUsers, searchUser } from '../../User/actions'
import UserItem from './UserItem'
import { getUser, isManagement, isStudent } from '../../utils'
import { searchStudent } from '../../Student/actions'

class UserList extends Component {

    state = { receiver: {} }

    changed = (user) => {
        this.props.onReceiverChanged(user)
        this.setState({ receiver: user })
    }

    render () {
        const receiver = this.state.receiver._id

        const { options } = this.props
        const { users, searchState } = this.props.userReducer
        const { students } = this.props.studentReducer
        let list = []

        if (isManagement()) {
            if (options.group === 'STUDENT' && options.classroom !== '')
                list = students
            else
                list = users
        } else {
            list = students
        }

        return (
            <div>
                <ul style={{
                    width:"20%",
                    padding: '0.9rem, 2rem',

                    height: 'calc(100VH - 400px)'
                }}>
                    {
                        list.map((user, i) => {
                            const u = user.hasOwnProperty('student') ? user.student : user
                            return (
                                <UserItem user={u} isActive={receiver === u._id} onChanged={this.changed.bind(this)}/>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
        userReducer: state.userReducer,
        studentReducer: state.studentReducer
    }

))
(UserList)
