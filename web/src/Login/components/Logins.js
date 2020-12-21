import React, { Component, Fragment, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'

import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MyInput from 'my-input-react'
import { connect, useDispatch } from 'react-redux'
import { getAccessToken } from '../../utils'
import { login } from '../actions'
import { updateToken } from '../../request'
import { Redirect } from 'react-router-dom'
import page from '../../img/cover.png'
import MyTextField from '../../components/TextField'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { kCategory } from '../../Information/konstants'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        background: `url(${page})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Logins = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { loginState, loginError } = props.loginReducer
    const [localStore, setLocalStore] = useState({})
    const [loginStatelocal, setLoginState] = useState({ username: '', password: '' })
    const [state, setState] = useState({}, [])

    useEffect(() => {
        if (getAccessToken())
            setState({
                redirect: '/home',
            })
        // props.history.push('/class-room')
    })

    const _login = async () => {
        const res = await dispatch(login(localStore))
        const status = get(res, 'value.request.status', get(res, 'response.status'))
        if (status === 200) {
            updateToken(res.value.data.token)
            setState({
                redirect: '/',
            })
        }

    }

    const handler = (me, value) => {
        localStore[me] = value
        setLocalStore(localStore)
    }

    const handleEnter = (key) => {
        if (key === 'Enter') _login()
    }
    if (state.redirect)
        return <Redirect to={state.redirect}/>

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={7} md={7} className={classes.image}>
                {/*<img src={cover} />*/}
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <form className={classes.form} noValidate>
                        <MyTextField
                            me='username'
                            id="outlined-primary"
                            variant="outlined"
                            label="Username"
                            color="primary"
                            required
                            fullWidth
                            margin={'10%'}
                            handler={handler}

                        />
                        <br></br>
                        <MyTextField
                            id="outlined-primary"
                            variant="outlined"
                            label="Password"
                            color="primary"
                            required
                            fullWidth
                            me='password'
                            type='password'
                            handler={handler}/>
                        <br></br>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        {
                            loginState === 1 &&
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        <br></br>
                        {
                            loginState !== 1 &&
                            <Button
                                type="submit"
                                onClick={_login}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Login
                            </Button>
                        }

                        {
                            loginState === 3 &&
                            <div className="alert alert-danger alert-dismissible fade show mt-1" role="alert"
                                 style={{ padding: '10%' }}>
                                {loginError}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }


                    </form>
                </div>
            </Grid>
        </Grid>

    )
}
export default connect(state => ({
    loginReducer: state.loginReducer
}))(Logins)
