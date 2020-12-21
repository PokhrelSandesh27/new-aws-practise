import React, { Component } from 'react'
import { connect } from 'react-redux'

import Mail from './Mail'
import MessageMail from './MessageMail'
import { mailViewType } from '../constants'

class Sent extends Component {

    render () {
        return (
            <Mail {...this.props} mailViewType={mailViewType.SEND} content={<MessageMail sender={true}/>}/>
        )
    }
}

export default connect(state => ({}))(Sent)
