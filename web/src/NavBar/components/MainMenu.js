import React, { Fragment } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SubMenu from './SubMenu'
import useGlobal from "../../NavBarController/store"
import logo from '../../img/logo.svg'
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar'
import { getUser } from '../../utils'
import { getUserById } from '../../User/actions'
import Paper from '@material-ui/core/Paper'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://Everestwalk.com/">
                EverestWalk Pvt.Ltd.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 188;

const useStyles = makeStyles((theme) => ({

    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(120% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        display:"flex",
        justifyContent:'center',
        color: 'blue',
        fontSize: 16,
        textAlign:"center",
        alignContent:"center"
    },

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: 'linear-gradient(to bottom,#9fa8da,#303f9f, #283593,#1a237e)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

        // [theme.breakpoints.down('sm')]: {
        //     width: theme.spacing(0),
        // },
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {

    const headerContent =()=>{
        if(open.toggle){
            return( <div className={classes.toolbarIcon}  style={{
                boxShadow: "0 0px 10px 0",
                backgroundColor: "#ffffff91"}}>

                <img  src={logo} style={{width: "27%", marginRight: "18%"}}></img>

                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>)
        }
        else{
            return (
                <div style={{height:"64px"}}>
                    <Typography component="h5" variant="h5" color="Black" style={{marginTop:"31%"}} noWrap className={classes.title}>
                      NP
                    </Typography>
                </div>)

        }
    }
    const id = getUser()._id
    const profile = getUserById(id)
    const classes = useStyles();
    const [open, setOpen] = useGlobal()
    const handleDrawerClose = () => {
        setOpen.handleDrawerClose(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
            <Drawer

                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open.toggle && classes.drawerPaperClose),
                }}
                open={open.toggle}
            >
                {
                    headerContent()
                }


                <Divider />


                <List><SubMenu /></List>
                <Divider />
            </Drawer>









    );
}
