import React, { Component } from 'react'
import { connect } from 'react-redux'

import Mail from './Mail'
import MessageMail from './MessageMail'
import { mailViewType } from '../constants'

class Received extends Component {

    render () {
        return (
            <Mail
                key={mailViewType.RECEIVED} {...this.props} mailViewType={mailViewType.RECEIVED}
                  content={<MessageMail sender={false}/>} />
        )
    }
}

export default connect(state => ({}))(Received)
