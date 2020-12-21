import axios from 'axios'
import { getAccessToken } from './utils'

const accessToken = getAccessToken()
const url = {
    //base: 'http://localhost:8080/api/',
    base: 'https://api.ams.everestwalk.com/api/',
}

const headers = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        token: accessToken,
    },
}

const axiosFormDataConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'token': accessToken
    }
}

const updateToken = (token) => headers.headers.token = token

function getConfig (header = {}) { // To add custom header for some request
    const config = headers
    config.headers = { ...config.headers, ...header }
    return config
}

const request = {
    get: (path, header = {}) => axios.get(url.base + path, getConfig(header)),
    delete: (path, header = {}) => axios.delete(url.base + path, getConfig(header)),
    post: (path, data, header = {}) => axios.post(url.base + path, data, getConfig(header)),
    put: (path, data, header = {}) => axios.put(url.base + path, data, getConfig(header)),
    // postFormData: function (url, data) { return axios.post(`${config.apiEndpoint + url}`, data, axiosFormDataConfig)},
    putFormData: function (path, data) { return axios.put(url.base + path, data, axiosFormDataConfig)}
}

export {
    request
    , updateToken
}
