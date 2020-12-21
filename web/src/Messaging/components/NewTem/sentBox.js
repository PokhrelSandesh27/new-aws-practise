import React, { Component } from 'react'
import { connect } from 'react-redux'

import Navmail from './Nav'
import inboxMessage from './InboxMessage';
import { mailViewType } from '../../constants'

class SentBox extends Component {

    render () {
        return (
            <Navmail {...this.props} mailViewType={mailViewType.SEND}
                     content={<inboxMessage sender={true}/>}/>
        )
    }
}

export default connect(state => ({}))(SentBox)
