import React, { Component } from 'react'
import ListAllExams from './ListAllExams'

export default class CreateExams extends Component {

    render () {
        return(
            // Only some links and text are different
            <ListAllExams type='create' {...this.props}/>
        )
    }
}
