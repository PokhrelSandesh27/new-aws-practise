const { getArr } = require('../utils')

// after auth
module.exports = function auth (req, res, next) {
    // 401 Unauthorized - allow retry // 403 Forbidden

    if (!getArr(req, 'user.groups').includes('ADMIN')) return res.status(403).send('Access denied.')
    next()
}
