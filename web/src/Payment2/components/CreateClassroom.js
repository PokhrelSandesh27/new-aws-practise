import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import MyInput from 'my-input-react'
import { createPayment } from '../actions'
import ListAllClassroom from './ListAllClassroom'

export default class CreateClassroom extends Component {

    render () {
        return (
            <ListAllClassroom type="create" {...this.props}/>
        )
    }

}
