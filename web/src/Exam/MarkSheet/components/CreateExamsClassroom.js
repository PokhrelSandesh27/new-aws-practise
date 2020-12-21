import React, { Component } from 'react'
import ListAllExamsClassroom from './ListAllExamsClassroom'

export default class CreateExams extends Component {

    render () {
        return(
            // Only some links and text are different
            <ListAllExamsClassroom type='create' {...this.props}/>
        )
    }
}
