import React, { Component } from 'react'
import { getAllClassroom } from '../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../utils'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { get } from 'lodash'
import TableContainer from '@material-ui/core/TableContainer'

class ListAllClassroom extends Component {

    state = {
        type: this.props.type || 'list'
    }

    componentDidMount () {
        // this.setState({ type : })
        this.props.dispatch(getAllClassroom())
    }
    createRecepit(){
        this.props.history.push("../../receipts/generate")
    }

    render () {
        const { classrooms } = this.props.classroomReducer
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <h2>List of classrooms for paying receipts</h2>
                <div className="py-5 text-center">
                    {
                        this.props.location.msg && this.state.type === 'create' &&
                        `\n Info:  ${this.props.location.msg}`
                    }


                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>
                        <div className="panel panel-primary">
                            <NavLink
                                to={'../../receipts/generate'}>
                                {
                                    this.state.type === 'list' &&
                                    <button onClick={this.createRecepit.bind(this)}
                                            style={{margin:'3%', backgroundColor: "dimgrey"}}>
                                        Generate Receipt
                                    </button>
                                    ||
                                    this.state.type === 'create' &&
                                    ''

                                }
                            </NavLink>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>ClassRoom</b></TableCell>
                                            <TableCell align="center"><b>Actions</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {  classrooms &&
                                        classrooms.map((classroom, i) => {
                                                return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{classroom.grade}{classroom.section}</TableCell>
                                                        <TableCell align="center"> <NavLink className = "navlink"
                                                                                            to={{
                                                                                                pathname: `/receipts/${this.state.type}/classroom/${classroom._id}`,
                                                                                            }}>
                                                            {
                                                                this.state.type === 'list' &&
                                                                'View/Pay Receipts'
                                                            }
                                                        </NavLink></TableCell>

                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListAllClassroom))
