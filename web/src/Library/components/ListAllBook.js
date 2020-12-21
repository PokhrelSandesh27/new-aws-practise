import React, { Component, Fragment } from 'react'
import { getAllBooks, searchBookAwait } from '../actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import libraryReducer from '../reducer'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import cover from '../../img/data.jpg'
import { cleanObject } from '../../utils'
import { get } from 'lodash'
import Grid from "@material-ui/core/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import MyTextField from "../../components/TextField";
import Paper from "@material-ui/core/Paper";
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import Modal from "react-modal";
import {toast} from "react-toastify";
import ShowMoreText from 'react-show-more-text';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Dialogbox from "../../Dialogbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
Modal.setAppElement('#root')
toast.configure();

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

class ListAllBook extends Component {

    state = {
        sortValue: '',
        inputValue: '',
        search: {
            name: '',
            subtitle: '',
            author: '',
        },
        showModalState: false,
        showSnackbar: false,
        scroll:'paper'
    }
    searchOnchange = (event) => {
        const { search } = this.state
        search[event.target.name] = event.target.value

        this.setState({ search })

        // var searchText = evt.target.value // this is the search text
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
    executeOnClick=(isExpanded)=> {
        console.log(isExpanded);
    }
    modal=(book, scrollType)=> {
        this.openModal();

        console.log('mess',  book)
        this.setState({book, scroll:scrollType})
    }
    openSnack  =()=> {
        this.setState({ showSnackbar: true })


    }

    handleClose = (event, reason)=> {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({showSnackbar: false})
    }

    openModal () {
        this.setState({ showModalState: true })
    }

    closeModal= () =>{
        this.setState({ showModalState: false })
    }

    componentDidMount () {
        this.props.dispatch(getAllBooks())
        this.openSnack();
    }

    render () {
        const { classes } = this.props
        const { books, searchState } = this.props.libraryReducer
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Books List</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <Button onClick={this.props.history.goBack}
                                        style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                                >⬅ Go back</Button>

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
                                    to={'../../library/create'}>
                                    {
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<LibraryBooksOutlinedIcon />}
                                        >
                                            ADD book
                                        </Button>

                                    }
                                </NavLink>


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
                                <Snackbar open={this.state.showSnackbar} autoHideDuration={6000} onClose={this.handleClose}>
                                    <Alert onClose={this.handleClose}  variant={'filled'} severity="success">
                                        Book Details Loaded!
                                    </Alert>
                                </Snackbar>
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
    libraryReducer: state.libraryReducer
}))(withStyles(useStyles)(ListAllBook))
