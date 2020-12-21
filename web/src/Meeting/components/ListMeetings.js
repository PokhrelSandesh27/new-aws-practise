import React, { Component } from 'react'
import '../static/css/style.css'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAllMeeting, searchMeeting } from '../actions'
import { getAccessToken, getUser } from '../../utils'
import { getGroups } from '../../utils'
import { NavLink } from 'react-router-dom'



class ListMeetings extends Component {
    state = {}

    componentDidMount () {
        const query = {}
        const d = getGroups()
        const user = getUser()
        if (d.includes("STUDENT")) {
            query.classroom = user.classroom
        } else if (d.includes("TEACHER")) {
            query.teacher = getUser()._id
        }

        this.props.dispatch(searchMeeting(query))
    }

    render () {
        const { meetings, serchState } = this.props.meetingReducer

        return (
            <div className="mainContent">
                <div className="py-5 text-center">

                    <h2>List of all the meetings.</h2>
                    <p className="lead">
                        Type the keyword below in search box for specific meeting search.
                    </p>
                </div>
                <div className="row" >
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dev-table-filter"
                                    data-action="filter"
                                    data-filters="#dev-table"
                                    placeholder="Search Meeting"
                                />
                            </div>
                            <br/> <br/>
                            <div className="row">
                                <div className="col-md-2 order-md-1 mb-2 " style={{position: 'absolute'}}></div>

                            </div>
                            {
                                serchState === 1 &&
                                <div>Loading ...</div>
                            }
                            {
                                serchState ===2 &&


                                <table className="w3-table w3-striped w3-border" id="dev-table">
                                    <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Classroom</th>
                                        <th>Teacher</th>

                                        <th>Subject</th>
                                        <th>StartTime</th>
                                        <th>Join Meeting</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        meetings.map((meeting, index) => {
                                            const date = meeting.startTime;
                                            const d = new Date(date);
                                            const ds = d.toLocaleString();
                                            return (

                                                <tr key={meeting._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{get(meeting, 'classroom.grade')}{get(meeting, 'classroom.section')}</td>
                                                    <td>{get(meeting, 'teacher.fullName')}</td>
                                                    <td>{get(meeting, 'lecture.subject')}</td>
                                                    <td>{ds}</td>

                                                    <td>
                                                        {/*<NavLink to={'../meeting/detail/'+ meeting._id}> {get(meeting, 'link')} </NavLink>*/}

                                                    <button className="btn"
                                                        type="submit" style={{display:'flex', justifyContent:'center',fontWeight:'bold'}}>
                                                        <NavLink to={'../meeting/detail/'+ meeting._id}>JOIN</NavLink>
                                                    </button>
                                                    </td>


                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            }


                            {
                                serchState === 3 &&
                                <div>Something went wrong</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
export default connect(state => ({
    studentReducer: state.studentReducer,
    meetingReducer: state.meetingReducer
}))(ListMeetings)
