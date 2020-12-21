import React, { Component } from 'react'
import ListAllExamsClassroom from './ListAllExamsClassroom'
import ListAllExamsClassroomStudent from './ListAllExamsClassroomStudent'

export default class CreateExams extends Component {

    render () {
        return(
            // Only some links and text are different
            <ListAllExamsClassroomStudent type='create' {...this.props}/>
        )
    }
}
