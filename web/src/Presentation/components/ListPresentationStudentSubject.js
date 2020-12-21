import React, { Component } from 'react'
import { connect } from 'react-redux'
// import '../static/css/style.css'
import { getGroups, getUser } from '../../utils'
import { NavLink } from 'react-router-dom'
import { getAllSubjects } from '../../Subject/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'


class ListPresentationStudentSubject extends Component {

    type = this.props.type || 'presentation'

    async componentDidMount () {

        const query = {}
        const d = getGroups()
        const user = getUser()
        if (d.includes('STUDENT')) {
            query.classroom = user.classroom
        }
        this.props.dispatch(getAllSubjects())
    }

    render () {
        const { classes } = this.props;
        const { subjects } = this.props.subjectReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <div className="py-5 text-center">
                    {
                        this.props.location.msg &&
                        `\n Info:  ${this.props.location.msg}`
                    }
                    <h2>Presentations{(this.type !== 'presentation') ? ` for ${this.type}` : ''}.</h2>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <Button onClick={this.props.history.goBack}
                                    style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                            >⬅ Go back</Button>


                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Subject</b></TableCell>
                                            <TableCell align="center"><b>Action</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            subjects &&
                                            subjects.map((subject, i) => {

                                                return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{subject.name}</TableCell>
                                                        <TableCell align="center"><NavLink className = "navlink"
                                                                                           to={{

                                                                                               pathname: `/presentation/list/student/view/subject/${subject._id}`,
                                                                                               data: {
                                                                                               }
                                                                                           }}>
                                                            View
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
    presentationReducer: state.presentationReducer,
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListPresentationStudentSubject))
