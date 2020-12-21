import React, { Component, Fragment } from 'react'
import { getAllBooks } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import libraryReducer from '../reducer'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import { searchBookAwait } from '../actions'
import { cleanObject } from '../../utils'
import { get } from 'lodash'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import cover from '../../img/data.jpg'
import ShowMoreText from 'react-show-more-text';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import {toast} from "react-toastify";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import moment from "moment";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


Modal.setAppElement('#root')
toast.configure();
const customStyles = {
    content: {
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: '25%',
    }
}

class ListAllBook extends Component {

    state = {
        search: {
            name: '',
            subtitle: '',
            author: '',
        },
        showModalState: false,
        scroll:'paper'
    }

    componentDidMount () {
        this.props.dispatch(getAllBooks())
    }
    executeOnClick=(isExpanded)=> {
        console.log(isExpanded);
    }
    modal=(book)=> {
       this.openModal();
        console.log('mess',  book)
       this.setState({book})
    }
    openModal () {
        this.setState({ showModalState: true })
    }

    closeModal =()=> {
        this.setState({ showModalState: false })
    }


    searchOnchange = (event) => {
        const { search } = this.state
        search[event.target.name] = event.target.value
        this.setState({ search })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => this.search(), 300)
    }

    search = async () => {
        const book = await this.props.dispatch(searchBookAwait(cleanObject(this.state.search)))
        const status = get(book, 'response.status')
        if (status === 400) {
            this.setState({
                error: get(book, 'response.data')
            })
        }
    }

    render () {
        const { books, searchState } = this.props.libraryReducer
        const { classes } = this.props
        console.log('log class rooms', books)

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <Breadcrumbs aria-label="breadcrumb"
                                     style={{float: 'right'}}>
                            <StyledBreadcrumb onClick={this.props.history.goBack}
                                              component="a"
                                              label="Back"
                                              icon={<ArrowBackIosIcon fontSize="small" />}>

                            </StyledBreadcrumb>
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>

                            <Typography variant={"inherit"} color="secondary">Library</Typography>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>
                        <br/>
                        <br/>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">


                                    <div className="panel-body">

                                        <Paper>
                                            <Grid container justify="flex-start" style={{ margin:"0%"}}>
                                                <div style={{border: "1px solid lightgrey", width:"34%"}}>
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                        style={{
                                                            marginLeft:"2%",
                                                            marginRight:"3%"
                                                        }}
                                                    />
                                                    <input
                                                        value={this.state.search.name}
                                                        type="text"
                                                        style={{ width: '90.8%',  marginTop:"1%"}}
                                                        className="inputBook"
                                                        id="name"
                                                        name="name"
                                                        data-action="filter"
                                                        data-filters="#dev-table"
                                                        placeholder="Type Name"
                                                        onInput={this.searchOnchange}
                                                    />
                                                </div>

                                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                        style={{
                                                            fill:"blue",
                                                            marginLeft:"2%",
                                                            marginRight:"3%"
                                                        }}
                                                    />

                                                    <input
                                                        value={this.state.search.subtitle}
                                                        type="text"
                                                        style={{ width: '90.8%',  marginTop:"1%"}}
                                                        className="inputBook"
                                                        id="subtitle"
                                                        name="subtitle"
                                                        data-action="filter"
                                                        data-filters="#dev-table"
                                                        placeholder="Type Subtitle"
                                                        onInput={this.searchOnchange}
                                                    />

                                                </div>
                                                <div style={{border: "1px solid #ccc", width:"33%"}}>
                                                    {/*<IconButton color="secondary" aria-label="add an alarm">*/}
                                                    {/*    <FilterIcon />*/}
                                                    {/*</IconButton>*/}
                                                    <FontAwesomeIcon
                                                        icon={faFilter}
                                                        style={{
                                                            marginLeft:"2%",
                                                            marginRight:"3%"
                                                        }}
                                                    />
                                                    <input
                                                        value={this.state.search.author}
                                                        type="text"
                                                        style={{ width: '90.8%',  marginTop:"1%"}}
                                                        className="inputBook"
                                                        id="author"
                                                        name="author"
                                                        data-action="filter"
                                                        data-filters="#dev-table"
                                                        placeholder="Type Author"
                                                        onInput={this.searchOnchange}
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
                                        {
                                            searchState === 1 &&
                                            <div>Searching</div>
                                        }
                                        {
                                            searchState === 3 &&
                                            <div>{this.state.error}</div>
                                        }
                                        {
                                            searchState === 2 && !books.length &&
                                            <div>No Records found</div>
                                        }
                                    </div>
                                    <NavLink
                                        to={{
                                            pathname: `../../list/mybook`,
                                        }} >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<FormatListBulletedIcon />}
                                        >
                                           My books
                                        </Button>
                                    </NavLink>
                                    <a href="https://pustakalaya.org/en/?fbclid=IwAR3Y0i3xa2NKWjoX2JoIRvhPYmw56q3g8J3y_mifWdeHTj8Pkol7SOTSDxw" >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{marginLeft:"1%"}}
                                            className={classes.button}
                                            startIcon={<MenuBookIcon />}
                                        >
                                           Pustakalaya
                                        </Button>
                                    </a>

                                    <div className="contin">
                                        {
                                            books.map((book, index) => {
                                                const downloadble = !!book.link
                                                return (

                                                    <Card className={classes.card}>
                                                        <div className={classes.details}>
                                                            <CardMedia
                                                                style={{height: 0, paddingTop: '56.25%'}}
                                                                image={book.coverLink ? book.coverLink : cover}
                                                                title={book.name}
                                                                height="140"
                                                            />
                                                            <CardContent >
                                                                <Typography component="h5" variant="h5">
                                                                    {book.name || 'NA'}
                                                                </Typography>
                                                                <Typography component="h7" variant="h7" color={ "secondary"}>
                                                                    <b>{book.author || 'NA'}</b>
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

                                                                            >{book.description || 'NA'}

                                                                            </ShowMoreText>
                                                                    <Button onClick={this.modal.bind(this, book)}>
                                                                        View more
                                                                    </Button>
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                            <Button
                                                                variant="contained"

                                                                className={classes.button}
                                                                startIcon={<GetAppOutlinedIcon />}>

                                                                {
                                                                    downloadble ? <Fragment>
                                                                            <div className='' >
                                                                                <a href={book.link}
                                                                                   download={book.name}>Download</a></div>
                                                                        </Fragment>
                                                                        : <span>Will Available soon..</span>
                                                                }
                                                            </Button>
                                                        </CardActions>
                                                        </div>
                                                    </Card>
                                                )
                                            })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dialog
                        scroll={'paper'}
                        onClose={this.closeModal}
                        aria-labelledby="customized-dialog-title" open={this.state.showModalState}>
                        <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>
                            {get(this.state.book, 'name')}
                            <p style={{color:'lightcoral'}}>
                                {get(this.state.book, 'author')}
                            </p>
                        </DialogTitles>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                {get(this.state.book, 'description')}
                            </Typography>

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.closeModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    libraryReducer: state.libraryReducer
}))(withStyles(useStyles)(ListAllBook))
