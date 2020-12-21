import {request} from '../request'

export const loginUser = auth => {
    return request.post('auth', auth)
}
