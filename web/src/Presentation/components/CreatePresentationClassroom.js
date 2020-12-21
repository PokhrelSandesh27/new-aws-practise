import React, { Component } from 'react'
import ListPresentationClassroom from './ListPresentationClassroom'

export default class CreatePresentationClassroom extends Component {

    render () {
        return (
            <ListPresentationClassroom type='create' {...this.props}/>
        )
    }
}
