import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
//import 'bootstrap/dist/js/bootstrap.min'

//import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import reducers from './reducers'
import middleware from './middleware'
import Routes from './routes'

const store = createStore(reducers, middleware)

const provider = <Provider store={store}><Routes/></Provider>

ReactDOM.render(provider, document.getElementById('root'))
