import React, { Component, Fragment, useEffect, useState } from 'react'
import '../static/css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../NavBar/components/Footer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import en from '../../img/uni.webp'
import ii from '../../img/cal.png'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import IconButton from '@material-ui/core/IconButton'
import CreateInformation from '../../Information/Components/Popup/CreateInformation'
import ShowTopInformation from '../../Information/Components/Popup/ShowTopInformation'
import LatestNews from '../../Information/Components/LatestNews'
import EventCalender from '../../Event/Components/EventCalender'
import { isManagement } from '../../utils'
import { searchInformation } from '../../Information/actions'
import { kCategory } from '../../Information/konstants'
import { connect } from 'react-redux'
import { StyleWrapper } from '../../styleWrapper'


Modal.setAppElement('#root')
toast.configure()

class homePage extends Component {
    state = {
        date: new Date(),
        showCreateNoticeBox: false,
        showTopInformationBox: false

    }

    isManagement = isManagement()

    refreshList = () => {
        this.props.dispatch(searchInformation({ 'category': kCategory }))
    }

    componentDidMount () {
        this.refreshList()
    }

    showCreateNoticeBox = () => {
        this.setState({ showCreateNoticeBox: true })
    }

    hideCreateNoticeBox = (e, status = false) => {
        if (status)
            this.refreshList()
        this.setState({ showCreateNoticeBox: false })
    }

    hideTopInformationBox = () => {
        this.setState({ showTopInformationBox: false })
    }

    showTopInformationBox = () => {
        this.setState({ showTopInformationBox: true })
    }
    onChange = date => this.setState({ date })

    render () {

        const { informations: info, searchState } = this.props.informationReducer

        const informations = info.reverse()

        const first = (searchState === 2) ? informations[0] || undefined : undefined
        const latest = (searchState === 2) ? informations.slice(1, 4) : []

        const { classes } = this.props
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <div className="article">

                            <img className="logo" src={en} style={{ width: '100%' }}></img>
                            <div className="content" style={{ position: 'absolute', color: 'white' }}>
                                <h1 style={{ color: 'white' }}>Welcome</h1>
                                <h3>University Of Northampton
                                </h3>
                                <p style={{ color: 'white' }}>"Implementation is great</p>
                                <p style={{ color: 'white' }}>It's Life itself"</p>
                            </div>


                        </div>
                        <div className="grid" style={{ marginTop: '2%' }}>
                            <TableContainer component={Paper} style={{ backgroundColor: '#f0f1f6' }}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    {/* TODO This can be extracted*/}
                                    <Card className="CardIn">
                                        <CardActionArea>
                                            <CardMedia className={classes.media}>

                                                <CardContent>
                                                        <h3>Notice Our Rahul bro
                                                            {
                                                                this.isManagement &&
                                                                <FontAwesomeIcon
                                                                    icon={faPlusCircle}
                                                                    style={
                                                                        {
                                                                            width: '100%',
                                                                            color: '#4caf50',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    onClick={this.showCreateNoticeBox}
                                                                />
                                                            }
                                                        </h3>
                                                        <Divider orientation="vertical" flexItem/>
                                                        <hr></hr>
                                                        &nbsp;
                                                        {
                                                            searchState === 2 &&
                                                            <h4>
                                                                {first.summary}</h4>
                                                        }
                                                        {
                                                            searchState === 1 &&
                                                            <p>Loading</p>
                                                        }


                                                </CardContent>
                                                <IconButton
                                                    onClick={this.showTopInformationBox}
                                                    aria-label="show more">
                                                    <ExpandMoreIcon/>
                                                </IconButton>
                                            </CardMedia>
                                        </CardActionArea>
                                    </Card>
                                    <br></br>

                                    <LatestNews/>
                                </Table>
                            </TableContainer>
                            <StyleWrapper>
                            <EventCalender/>
                            </StyleWrapper>

                        </div>
                    </div>
                    <article>

                    </article>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                    {
                        this.isManagement &&
                        <CreateInformation showModal={this.state.showCreateNoticeBox}
                                           closeModal={this.hideCreateNoticeBox}/>
                    }

                    <ShowTopInformation showModal={this.state.showTopInformationBox}
                                        closeModal={this.hideTopInformationBox}/>


                </Container>
            </main>

        )
    }
}

export default connect(state => ({
    informationReducer: state.informationReducer,
}))(withStyles(useStyles)(homePage))
