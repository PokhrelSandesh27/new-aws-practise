import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import canvas from '../../../img/canvas.png'
import Button from '@material-ui/core/Button'
import { NavLink, Redirect } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Link from '@material-ui/core/Link'

toast.configure()

class SelectionPage extends React.Component {


    state = {
        redirect: 'false'
    }

    handleClick =() =>{
        this.props.history.push("./../question/teacher/create");
    }


    render () {
        const { classes } = this.props

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Click your choice.</h2>

                        <div>
                            <paper>
                                <button onClick={this.handleClick} type="button">
                                    Check this </button>
                                <Button variant="contained"
                                        style={{backgroundColor:"yellowgreen", gap:"3%"}

                                        }>
                                    Create Questions

                                </Button>


                                <Button  variant="contained"
                                        style={{backgroundColor:"rgb(252,153,142)", marginLeft:"3%"}}>
                                    List Question
                                </Button>


                            </paper>
                        </div>




                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(SelectionPage))
