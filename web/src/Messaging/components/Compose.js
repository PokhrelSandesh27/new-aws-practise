import React, { Component } from 'react'
import { connect } from 'react-redux'

import SelectCompose from './ComposeComponent/SelectCompose'

export default class Compose extends Component {

    render () {
        return (
            <SelectCompose {...this.props}/>
            // {/*// <Mail {...this.props} mailViewType={mailViewType.COMPOSE} content={<ComposeMail/>}/>*/}
        )
    }
}

