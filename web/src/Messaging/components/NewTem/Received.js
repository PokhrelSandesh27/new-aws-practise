import React, { Component } from 'react'
import { connect } from 'react-redux'
import inboxMessage from "./InboxMessage";
import { mailViewType } from '../../constants'
import NavMail from "./Nav";

class Received extends Component {

    render () {
        return (
            <NavMail
                key={mailViewType.RECEIVED} {...this.props} mailViewType={mailViewType.RECEIVED}
                content={<inboxMessage sender={false}/>} />
        )
    }
}

export default connect(state => ({}))(Received)
