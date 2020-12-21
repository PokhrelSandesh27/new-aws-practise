export const getDate = (date, name) => {
    const ret = {}
    ret[`${name}Year`] = date.get('y')
    ret[`${name}Month`] = date.get('M') + 1
    ret[`${name}Date`] = date.get('D')
    ret[`${name}Time`] = date.toDate().getTime().toString()
    return ret
}
