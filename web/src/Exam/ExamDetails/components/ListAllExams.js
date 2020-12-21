import React, { Component } from 'react'
import { getExams } from '../../Exam/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import { Paper } from '@material-ui/core'

class ListAllExams extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({ type : this.props.type || 'list'})
        const { _id } = getUser()
        this.props.dispatch(getExams())
    }
    createExamDetails(){
        this.props.history.push("../../examdetails/create")
    }

    render () {
        const { classes } = this.props;
        const { exams } = this.props.examReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                {
                    this.state.type === 'list' &&
                    <h2>List of exams for</h2>
                    ||
                    this.state.type === 'create' &&
                    <h2>Create exams for Classroom</h2>
                }


                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>
                        <div className="panel panel-primary">

                            <NavLink
                                to={'../../exam/create'}>
                                {
                                    this.state.type === 'list' &&
                                    <button onClick={this.createExamDetails.bind(this)}
                                            style={{
                                                margin:'3%',
                                                width: '10%',
                                                backgroundColor: "dimgrey"
                                            }}>
                                        Post Exam
                                    </button>
                                    ||
                                    this.state.type === 'create' &&
                                    ''

                                }
                            </NavLink>

                            {
                                exams &&
                                exams.map((exam, i) => {
                                    return (
                                        <div className='container'>
                                            <div className='card flex-row open' style={{marginLeft: '5%', width:"50%"}}>
                                                <TableContainer component={Paper}>
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
                                                        <div className='author'style={{color:"darkgrey", fontSize:"1.2em"}}>{exam.startDate|| 'NA'}&nbsp; - &nbsp;{exam.endDate|| 'NA'} </div>

                                                    </div>
                                                    <div className='flex-column info' style={{padding:"1px"}}>
                                                        <div className='title' style={{color:"darkgrey"}}>Exam Type : {exam.type|| 'NA'}</div>

                                                    </div>

                                                    <div className='flex-column info' style={{padding:"1px" , backgroundColor:"#9db7d2"}}>
                                                        <NavLink className="navlink" to={`/examdetails/${this.state.type}/exam/${exam._id}`}>
                                                            <b>  View Classrooms</b>
                                                        </NavLink>

                                                    </div>

                                                </div>
                                                </TableContainer>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    examReducer: state.examReducer,
}))(withStyles(useStyles)(ListAllExams))
