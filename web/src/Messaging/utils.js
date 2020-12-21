import React from 'react'
import { getUser } from '../utils'
import { searchMessagesAwait } from './actions'

export const updateMessages = (receiver) => {

    const user = getUser()
    return searchMessagesAwait({
        sender: user._id,
        receiver: receiver._id,
    })
}
