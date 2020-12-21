import AppBar from '@material-ui/core/AppBar'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { getUserById } from '../../User/actions'
import { getUser } from '../../utils'
import React, { Fragment } from 'react'
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles'
import useGlobal from '../../NavBarController/store'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AccountCircle} from "@material-ui/icons";
import logo from "../../img/logo.svg";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
const drawerWidth = 188

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        backgroundColor: 'white',
        height: 25
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        backgroundColor: 'blue',
        ...theme.mixins.toolbar,
    },
    appBar: {
        marginLeft: '72px',
        width: `calc(100% - 72px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),
        [theme.breakpoints.down('sm')]: {
            width:'100%',
        }
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // [theme.breakpoints.down('sm')]: {
        //     width: '260px',
        // },

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontFamily:"script style",
        fontSize: '1.5rem',
        textAlign:'center',
        fontWeight: 500,

        [theme.breakpoints.down('sm')]: {
            display:'none'

        },


    },
    titleHide: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 500,
        [theme.breakpoints.up('sm')]: {

            fontSize: '1.5rem',
            fontWeight: 500,
            textAlign:'center'
        },

    },

//     title: {
//         flexGrow: 1,
//         fontFamily:"script style",
//         [theme.breakpoints.down('sm')]: {
//             fontSize: '1rem',
//             marginLeft: '-42px',
// }
//     },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(9),
        },
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(9),
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(0),
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
        height: 230,
    },
    customHoverFocus: {
        '&:hover, &.Mui-focusVisible': { backgroundColor: 'Black' }
    },
}))

export default function Dashboard () {

    // const headerContent =()=>{
    //     if(open.toggle){
    //         return( <div className={classes.toolbarIcon}  style={{
    //             boxShadow: "0 0px 10px 0",
    //             backgroundColor: "#ffffff91"}}>
    //
    //             <img  src={logo} style={{width: "27%", marginRight: "18%"}}></img>
    //
    //             <IconButton onClick={handleDrawerOpen}>
    //                 <ChevronLeftIcon />
    //             </IconButton>
    //         </div>)
    //     }
    //     else{
    //         return (
    //             <div style={{height:"64px"}}>
    //                 <Typography component="h5" variant="h5" color="Black" style={{marginTop:"31%"}} noWrap className={classes.title}>
    //                     NP
    //                 </Typography>
    //             </div>)
    //
    //     }
    // }

    const id = getUser()._id
    const profile = getUserById(id)
    const classes = useStyles()
    const [open, setOpen] = useGlobal()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const opens = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerOpen = () => {

        setOpen.handleDrawerOpen(true)
    }
    const _logout = () => {
        localStorage.clear()
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (

        <AppBar position="absolute" className={clsx(classes.appBar, open.toggle && classes.appBarShift)}
                >
            <Toolbar className={classes.toolbar} style={{backgroundColor:"rgb(237, 238, 243)"}}>
                <IconButton
                    edge="start"
                    color="Blue"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open.toggle && classes.menuButtonHidden)}

                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h5" variant="h7" color="primary"   className={clsx( open.toggle? classes.title: classes.titleHide)}>
                    Nepal Academy
                    <AccountBalanceIcon viewBox="0 0 23.2 23.2" style={{marginTop:"2%"}}/>


                </Typography>

                <NavLink to={'/home/homePage'}>
                <IconButton>
                    <Tooltip title="Home" aria-label="add" arrow>
                            <HomeIcon color={'primary'}  fill={'blueBright'}/>
                        </Tooltip>
                </IconButton>
                </NavLink>

                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    {/*{*/}

                    {/*    !profile.photo ? <Fragment>*/}
                    {/*            <Avatar>*/}
                    {/*                <img src="https://everestwalk-photos.s3.amazonaws.com/1599542773652.jpg"/>*/}
                    {/*            </Avatar>*/}
                    {/*        </Fragment> :*/}
                    {/*        <Avatar>*/}
                    {/*            /!*<img src="https://everestwalk-photos.s3.amazonaws.com/1599542773652.jpg"/>*!/*/}
                    {/*            <img src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"/>*/}
                    {/*        </Avatar>*/}

                    {/*}*/}
                        <Tooltip title="Account" aria-label="add" arrow>
                            <AccountCircle color={'primary'}  fill={'blueBright'}/>
                        </Tooltip>

                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    style={{ top:"42px"}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',

                    }}
                    open={opens}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/user/view" onClick={handleClose}>
                        <Button

                            className={classes.button}
                            startIcon={<PersonIcon />}
                        >

                        </Button>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={_logout} component={Link} to="/login" >
                        <Button

                            className={classes.button}
                            startIcon={<ExitToAppIcon />}
                        >

                        </Button>
                        Logout
                    </MenuItem>
                </Menu>



            </Toolbar>
        </AppBar>

    )
}
//
//
// // import React from 'react';
// import { fade,  } from '@material-ui/core/styles';
// // import AppBar from '@material-ui/core/AppBar';
// // import Toolbar from '@material-ui/core/Toolbar';
// // import IconButton from '@material-ui/core/IconButton';
// // import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// // import MenuItem from '@material-ui/core/MenuItem';
// // import Menu from '@material-ui/core/Menu';
// // import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
//
// const useStyle = makeStyles((theme) => ({
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing(2),
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing(3),
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         padding: theme.spacing(0, 2),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: '20ch',
//         },
//     },
//     sectionDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('md')]: {
//             display: 'flex',
//         },
//     },
//     sectionMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
// }));
//
// export default function PrimarySearchAppBar() {
//     const classes = useStyles();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//
//     const isMenuOpen = Boolean(anchorEl);
//     const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//
//     const handleProfileMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleMobileMenuClose = () => {
//         setMobileMoreAnchorEl(null);
//     };
//
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         handleMobileMenuClose();
//     };
//
//     const handleMobileMenuOpen = (event) => {
//         setMobileMoreAnchorEl(event.currentTarget);
//     };
//
//     const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//         </Menu>
//     );
//
//     const mobileMenuId = 'primary-search-account-menu-mobile';
//     const renderMobileMenu = (
//         <Menu
//             anchorEl={mobileMoreAnchorEl}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             id={mobileMenuId}
//             keepMounted
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={isMobileMenuOpen}
//             onClose={handleMobileMenuClose}
//         >
//             <MenuItem>
//                 <IconButton aria-label="show 4 new mails" color="inherit">
//                     <Badge badgeContent={4} color="secondary">
//                         <MailIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Messages</p>
//             </MenuItem>
//             <MenuItem>
//                 <IconButton aria-label="show 11 new notifications" color="inherit">
//                     <Badge badgeContent={11} color="secondary">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <p>Notifications</p>
//             </MenuItem>
//             <MenuItem onClick={handleProfileMenuOpen}>
//                 <IconButton
//                     aria-label="account of current user"
//                     aria-controls="primary-search-account-menu"
//                     aria-haspopup="true"
//                     color="inherit"
//                 >
//                     <AccountCircle />
//                 </IconButton>
//                 <p>Profile</p>
//             </MenuItem>
//         </Menu>
//     );
//
//     return (
//         <div className={classes.grow}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="open drawer"
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography className={classes.title} variant="h6" noWrap>
//                         Material-UI
//                     </Typography>
//                     <div className={classes.grow} />
//                     <div className={classes.sectionDesktop}>
//                         <IconButton aria-label="show 4 new mails" color="inherit">
//                             <Badge badgeContent={4} color="secondary">
//                                 <MailIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton aria-label="show 17 new notifications" color="inherit">
//                             <Badge badgeContent={17} color="secondary">
//                                 <NotificationsIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton
//                             edge="end"
//                             aria-label="account of current user"
//                             aria-controls={menuId}
//                             aria-haspopup="true"
//                             onClick={handleProfileMenuOpen}
//                             color="inherit"
//                         >
//                             <AccountCircle />
//                         </IconButton>
//                     </div>
//                     <div className={classes.sectionMobile}>
//                         <IconButton
//                             aria-label="show more"
//                             aria-controls={mobileMenuId}
//                             aria-haspopup="true"
//                             onClick={handleMobileMenuOpen}
//                             color="inherit"
//                         >
//                             <MoreIcon />
//                         </IconButton>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             {renderMobileMenu}
//             {renderMenu}
//         </div>
//     );
// }
