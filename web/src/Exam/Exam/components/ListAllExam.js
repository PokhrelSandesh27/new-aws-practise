import React, { Component } from 'react'
import { getExams } from '../actions'
import {get} from 'lodash'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

class ListAllExam extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({ type : this.props.name || 'management'})
        const { _id } = getUser()
        this.props.dispatch(getExams())
    }
    createExam (){
        this.props.history.push("../../exam/create'")
    }

    render () {
        const { exams } = this.props.examReducer

        return (

            <div className="page-content">
                <div className="py-5 text-center">
                    {
                        this.props.location.msg && this.state.type === 'create' &&
                        `\n Info:  ${this.props.location.msg}`
                    }
                    <h2>Terminal Exams List</h2>


                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>
                        <div className="panel panel-primary">

                            <NavLink
                                to={'../../exam/create'}>
                                {

                                    <button onClick={this.createExam.bind(this)}
                                            style={{margin:'3%', backgroundColor: "dimgrey"}}>
                                        Create Exam
                                    </button>

                                }
                            </NavLink>
                                {
                                    exams &&
                                    exams.map((exam, i) => {
                                            return (
                                                <div className='container'>
                                            <div className='card flex-row open' style={{marginLeft: '5%', width:"50%"}}>
                                                <div>
                                                    <FontAwesomeIcon
                                                        icon={faBookOpen}
                                                        style={
                                                            {
                                                                width:"5.5%",
                                                                height:"5.1%"
                                                            }}/>
                                                    <div className='flex-column info' style={{padding:"1px"}}>
                                                        <div className='title' style={{color:"dimgrey", fontSize:"1.2em"}}>{exam.name|| 'NA'}</div>
                                                        <div className='title' style={{color:"dimgrey", fontSize:"1.2em"}}>{get(exam, 'classroom.grade')}</div>
                                                        <div className='author'style={{color:"darkgrey", fontSize:"1.2em"}}>{exam.startDate|| 'NA'}&nbsp; - &nbsp;{exam.endDate|| 'NA'} </div>

                                                    </div>
                                                    <div className='flex-column info' style={{padding:"1px"}}>
                                                        <div className='title' style={{color:"darkgrey"}}>Exam Type : {exam.type|| 'NA'}</div>

                                                    </div>

                                                </div>
                                            </div>
                                                </div>

                                            )
                                        })
                                }

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    examReducer: state.examReducer,
}))(ListAllExam)
