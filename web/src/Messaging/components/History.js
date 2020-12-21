import React, { Component } from 'react'
import { connect } from 'react-redux'

import Mail from './Mail'
import MessageMail from './MessageMail'
import { mailViewType } from '../constants'

class Received extends Component {

    render () {
        return (
            <Mail key={mailViewType.HISTORY} {...this.props} mailViewType={mailViewType.HISTORY}
                  content={<MessageMail sender={false} parentId={this.props.match.params.id}/>}/>
        )
    }
}

export default connect(state => ({}))(Received)
