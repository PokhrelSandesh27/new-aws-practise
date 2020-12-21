import React, { Component } from 'react'
import { connect } from 'react-redux'

import Mail from '../Mail'
import { groups, mailViewType } from '../../constants'
import UserList from '../UserList'
import UserDetail from '../UserDetail'
import MessageBox from '../MessageBox'
import { getAllClassroom } from '../../../Home/actions'
import { getUser, isLibrarian, isManagement, isStudent, isTeacher } from '../../../utils'
import { searchStudent } from '../../../Student/actions'
import { getAllUsers, searchUser } from '../../../User/actions'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../../UseStyles'
import Card from '@material-ui/core/Card'


class SelectCompose extends Component {

    state = {
        options: {
            group: '',
            classroom: ''
        }
    }

    updateList = (opt) => {
        const options = opt || this.state.options
        if (isManagement()) {
            if (options.group === 'STUDENT' && options.classroom !== '')
                this.props.dispatch(searchStudent({ classroom: options.classroom }))
            else if (options.group === '')
                this.props.dispatch(searchUser({}))
            else
                this.props.dispatch(searchUser({
                    groups: [options.group]
                }))

        } else {
            const req = {}
            if (options.classroom !== '') req.classroom = options.classroom
            this.props.dispatch(searchStudent(req))
        }
    }

    componentDidMount () {
        this.props.dispatch(getAllClassroom())
        this.updateList()
    }

    loadClasses = () => {

    }

    groupChanged = e => {
        const currentValue = e.target.value
        const { options } = this.state
        options.group = currentValue
        this.setState({
            options
        })
        this.updateList(options)
    }

    classroomChanged = e => {
        const currentValue = e.target.value
        const { options } = this.state
        options.classroom = currentValue
        this.setState({
            options
        })
        this.updateList(options)
    }

    render () {
        const{classes}= this.props

        const { classrooms } = this.props.classroomReducer

        return (
            <Mail {...this.props} mailViewType={mailViewType.COMPOSE}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>{
                    isManagement() &&
                    <select name="group" id="group" className="urpSelect"
                            style={{ width: 'auto', marginBottom: '1%' }}
                            value={this.state.options.group}
                            onChange={this.groupChanged}>
                        <option value=''> All</option>
                        {
                            groups.map((type) => <option value={type}> {type}</option>)
                        }
                    </select>
                }

                    {
                        (this.state.options.group === '' || isTeacher()|| isStudent() || isLibrarian()) &&
                        <select name="classroom" id="classroom" className="urpSelect"
                                style={{ width: 'auto', marginBottom: '1%' }}
                                value={this.state.options.classroom}
                                onChange={this.classroomChanged}>
                            <option value=''> All</option>
                            {
                                classrooms.map((classroom) => <option
                                    value={classroom._id}> {classroom.grade}{classroom.section}</option>)
                            }
                        </select>
                    }
                </div>
                <div style={{
                    display: 'flex'
                }}>

                    <Card style={{width:"40%" , backgroundColor:"#bbd0e4"}}>
                    <UserList onReceiverChanged={(receiver) => {
                        this.setState({
                            receiver
                        })
                    }}
                              options={this.state.options}/>
                    </Card>
                    {
                        !!this.state.receiver &&
                        <Card
                            style={{
                                display: 'grid',
                                height: 'calc(60vh - 100px)',
                                width:"120%",
                                overflowY: 'scroll'
                            }}>
                            <UserDetail receiver={this.state.receiver}/>
                            <MessageBox receiver={this.state.receiver}/>
                        </Card>
                    }
                    {
                        !this.state.receiver &&
                        <div style={{backgroundColor: "darkgrey"}}>
                            <h1>
                                stay connected..
                            </h1>
                            <p>click on the person profile..</p>
                        </div>


                    }
                </div>
            </Mail>
        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(SelectCompose))
