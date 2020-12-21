import React, { Component } from 'react'
import '../static/css/style.css'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAllSlot } from '../action'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



class ListSlots extends Component {
    state = {}

    componentDidMount () {
        this.props.dispatch(getAllSlot())
    }

    render () {
        const { slots, fetchState} = this.props.slotReducer

        return (
            <div className="page-content">
                <h2>List of all Periods</h2>
                <div className="row" >
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <div className="row">
                                <div className="col-md-2 order-md-1 mb-2 " style={{position: 'absolute'}}></div>

                            </div>
                            {
                                fetchState === 1 &&
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        style={
                                            {
                                                width:"10.5%",
                                                height:"10.1%",
                                                margin: "27%",
                                                marginLeft:"40%"
                                            }}/>
                                </div>
                            }
                            {
                                fetchState ===2 &&


                                <table className="assingmentTable" id="dev-table">
                                    <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>schedule</th>


                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        slots.map((slot, index) => {
                                            const date = slot.startTime
                                            const d = new Date(date);
                                            const ds = d.toLocaleString();
                                            const enddate = slot.endTime
                                            const end = new Date(enddate)
                                            const endTime = end.toLocaleString()
                                            return (

                                                <tr key={slot._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{get(slot, 'name')}</td>

                                                    <td>{moment(slot.startTime, 'hmm').format('HH:mm')}-{moment(slot.endTime, 'hmm').format('HH:mm')}</td>


                                                    {/*<td>*/}
                                                    {/*    /!*<NavLink to={'../meeting/detail/'+ meeting._id}> {get(meeting, 'link')} </NavLink>*!/*/}

                                                    {/*    <button className="btn"*/}
                                                    {/*            type="submit" style={{display:'flex', justifyContent:'center',fontWeight:'bold'}}>*/}
                                                    {/*        <NavLink to={'../meeting/detail/'+ meeting._id}>JOIN</NavLink>*/}
                                                    {/*    </button>*/}
                                                    {/*</td>*/}


                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            }
                            <button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</button>


                            {
                                fetchState === 3 &&
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
    slotReducer: state.slotReducer
}))(ListSlots)
