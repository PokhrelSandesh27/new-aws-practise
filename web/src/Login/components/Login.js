import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import MyInput from 'my-input-react'
import { getAccessToken, /*updateAccessToken*/ } from '../../utils'
import { login } from '../actions'
//import '../static/css/styles'
import '../static/css/style.css'
import { updateToken } from '../../request'
import { Redirect } from 'react-router-dom'

const Login = props => {
    const dispatch = useDispatch()
    const { loginState, loginError } = props.loginReducer
    const [localStore, setLocalStore] = useState({})

    const [state, setState] = useState({}, [])

    useEffect(() => {
        if(getAccessToken())
        setState({
                redirect: '/home',
            })
        // props.history.push('/class-room')
    })

    const _login = async () => {
        const res = await dispatch(login(localStore))

        // Updating the token in the header which is being sent for every request,
        // Before logging in the access token is null
        // console.log(res)
        updateToken(res.value.data.token)
        // updateAccessToken();
        // Cannot use the utils updateAccessToken()
        // ReferenceError: can't access lexical declaration 'getAccessToken' before initialization
        // It occurs

        if (res.value.status === 200) {
            setState({
                redirect: '/',
            })
            // props.history.push('/')

        }
    }

    const handler = (me, value) => {
        localStore[me] = value
        setLocalStore(localStore)
    }

    const handleEnter = (key) => {
        if (key === 'Enter') _login()
    }
    if(state.redirect)
        return <Redirect to={state.redirect}/>

    return (
        <div className='Content'>
            <div className="row " style={{ paddingTop: '10vh' , width:'65%', paddingLeft:'22%'}}>
                <div className="col-4 offset-4" style={{paddingTop: '1%'}}>
                    <div className="card">

                    <div className="row" style={{paddingTop:'2%'}}>
                        <div className="col-12 text-center">
                            <h1 className='display-3'>Login</h1>
                        </div>
                    </div>

                    <div className="row mt-2" style={{paddingTop:'5%'}}>
                        <MyInput
                            me='username'
                            handler={handler}
                            placeHolder='Username'
                            className="form-control mt-1"/>
                    </div>

                    <div className="row" style={{paddingTop:'5%'}}>
                        <MyInput
                            me='password'
                            type='password'
                            handler={handler}
                            placeHolder='Password'
                            onKeyPress={handleEnter}
                            className="form-control mt-2"/>
                    </div>

                    <div className="row" style={{paddingTop:'5%'}}>
                        <div className="col-12 text-center mt-4">
                            {
                                loginState === 1 &&
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }

                            {
                                loginState !== 1 &&
                                <button
                                    onClick={_login}
                                    className='btn btn-outline-success btn-block'>
                                    Login
                                </button>
                            }

                            {
                                loginState === 3 &&
                                <div className="alert alert-danger alert-dismissible fade show mt-1" role="alert" style={{padding:'10%'}}>
                                    {loginError}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                        <div className="row" style={{paddingTop: '15%'}}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    loginReducer: state.loginReducer
}))(Login)
