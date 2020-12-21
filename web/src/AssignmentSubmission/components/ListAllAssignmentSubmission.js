import React, { Component } from 'react'
import '../static/css/style.css'
import ListAllAssignmentForStudent from '../../Assignment/components/ListAllAssignmentForStudent'

export default class ListAllAssignmentSubmission extends Component {

    render () {
        return (
            // Only some links and text are different
            <ListAllAssignmentForStudent type="submission" {...this.props}/>

        )

    }
}
