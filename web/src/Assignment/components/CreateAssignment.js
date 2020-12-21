import React, { Component } from 'react'
import ListAllAssignment from './ListAllAssignment'

export default class CreateAssignment extends Component {

    render () {
        return(
            // Only some links and text are different
            <ListAllAssignment type='Create' {...this.props}/>
        )
    }
}
