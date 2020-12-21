import React, { Component, Fragment } from 'react'
import { getAllBooks } from '../../Library/actions'
import { connect } from 'react-redux'

import libraryReducer from '../../Library/reducer'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import { searchBookAwait } from '../../Library/actions'
import { cleanObject } from '../../utils'
import { get } from 'lodash'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import cover from '../../img/student.svg'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import MyTextField from "../../components/TextField";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ShowMoreText from "react-show-more-text";
import CardActions from "@material-ui/core/CardActions";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import {getAllAlumini} from "../action";
import aliuminiReducer from "../reducer";

class ListAlumini extends Component {

    state = {
        search: {
            name: '',
            subtitle: '',
            author: '',
        }
    }

    componentDidMount () {
        this.props.dispatch(getAllAlumini())
    }




    render () {
        const { aluminis, fetchState } = this.props.aliuminiReducer
        const { classes } = this.props


        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>List Library</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">
                                    <Button onClick={this.props.history.goBack}
                                            style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                                    >⬅ Go back</Button>
                                    <div className="panel-body">
                                        <Paper>
                                            <Grid container justify="flex-start" style={{ margin:"0%"}}>
                                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                        style={{
                                                            marginLeft:"2%",
                                                            marginRight:"3%"
                                                        }}
                                                    />
                                                    <input

                                                        type="text"
                                                        style={{ width: '86.8%',  marginTop:"2%"}}
                                                        className="inputBook"
                                                        id="text"
                                                        name="text"
                                                        data-action="filter"
                                                        data-filters="#dev-table"
                                                        placeholder="Searching Keyword here..."

                                                    />
                                                </div>



                                                    <div style={{border: "1px solid #ccc", width:"33%"}}>
                                                        <FontAwesomeIcon
                                                            icon={faFilter}
                                                            style={{
                                                                marginLeft:"2%",
                                                                marginRight:"3%"
                                                            }}
                                                        />
                                                        <input

                                                            type="text"
                                                            style={{ width: '86.8%',  marginTop:"2%"}}
                                                            className="inputBook"
                                                            id="text"
                                                            name="text"
                                                            data-action="filter"
                                                            data-filters="#dev-table"
                                                            placeholder="Searching Keyword here..."

                                                        />


                                                </div>
                                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                        style={{
                                                            marginLeft:"2%",
                                                            marginRight:"3%"
                                                        }}
                                                    />
                                                    <input

                                                        type="text"
                                                        style={{ width: '86.8%',  marginTop:"2%"}}
                                                        className="inputBook"
                                                        id="text"
                                                        name="text"
                                                        data-action="filter"
                                                        data-filters="#dev-table"
                                                        placeholder="Searching Keyword here..."

                                                    />
                                                </div>


                                            </Grid>

                                        </Paper>
                                    </div>
                                    <div style={{
                                        margin: '1rem 0.5rem',
                                        display: 'flex',
                                        flexFlow: 'column wrap',
                                        alignItems: 'center'
                                    }}>
                                        {/*{*/}
                                        {/*    fetchState === 1 &&*/}
                                        {/*    <div>Searching</div>*/}
                                        {/*}*/}
                                        {/*{*/}
                                        {/*    fetchState === 3 &&*/}
                                        {/*    <div>{this.state.error}</div>*/}
                                        {/*}*/}
                                        {/*/!*{*!/*/}
                                        {/*/!*    fetchState === 2 && !.length &&*!/*/}
                                        {/*/!*    <div>No Records found</div>*!/*/}
                                        {/*/!*}*!/*/}
                                    </div>

                                    <br/>
                                    <br/>


                                    <div className="contin">
                                        {aluminis.map((aluimi, index) => {
                                    return(
                                        <Card className={classes.card}>
                                            <div className={classes.details}>
                                                <CardMedia
                                                    style={{height: 0, paddingTop: '56.25%'}}
                                                    image={aluimi.photo ? aluimi.photo : cover}
                                                    title={aluimi.firstName}
                                                    height="140"
                                                />
                                                <CardContent >
                                                    <Typography component="h5" variant="h5">
                                                        {aluimi.firstName} {aluimi.lastName}
                                                    </Typography>

                                                    <Typography variant="subtitle1" color="textSecondary">
                                                        <ShowMoreText
                                                            lines={1}
                                                            more=''
                                                            less='Show less'
                                                            anchorClass=''
                                                            onClick={this.executeOnClick}
                                                            expanded={false}
                                                            width={390}
                                                            style={{ backgroundImage: 'linear-gradient(to bottom, transparent, black)'}}

                                                        >{aluimi.description || 'NA'}

                                                        </ShowMoreText>

                                                    </Typography>
                                                </CardContent>
                                            </div>
                                        </Card>
                                        )

                                    })
                                        }


                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    aliuminiReducer: state.aliuminiReducer
}))(withStyles(useStyles)(ListAlumini))
