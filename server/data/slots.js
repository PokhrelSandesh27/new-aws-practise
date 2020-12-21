const { Slot } = require('../models/slot')

const data = [
    {
        "_id":"5f33b3c0daa64e3d588bdc89",
        "name":"Period 01",
        "startTime": 900,
        "endTime": 1000,
    },
    {
        "_id":"5f33b3eadaa64e3d588bdc8a",
        "name":"Period 02",
        "startTime": 1000,
        "endTime": 1100,
    },
    {
        "_id":"5f33b3fadaa64e3d588bdc8b",
        "name":"Period 03",
        "startTime": 1100,
        "endTime": 1200,
    },
    {
        "_id":"5f33b41adaa64e3d588bdc8c",
        "name":"Period 04 (Lunch)",
        "startTime": 1200,
        "endTime": 1245,
    },
    {
        "_id":"5f33be9adaa64e3d588bdc96",
        "name":"Period 05 (Lunch)",
        "startTime": 1245,
        "endTime": 1335,
    },
    {
        "_id":"5f33beb0daa64e3d588bdc97",
        "name":"Period 06",
        "startTime": 1335,
        "endTime": 1425,
    },
    {
        "_id":"5f33bed1daa64e3d588bdc98",
        "name":"Period 07",
        "startTime": 225,
        "endTime": 315,
    }

]
exports.model = Slot
exports.data = data
