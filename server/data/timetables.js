const { Timetable } = require('../models/timetable')

const data = [
    {
        "_id":"5f33d1f5daa64e3d588bdca1",
        "subject":"5f33bd07daa64e3d588bdc8d",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b3c0daa64e3d588bdc89",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca2",
        "subject":"5f33bd07daa64e3d588bdc8e",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b41adaa64e3d588bdc8c",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca3",
        "subject":"5f33bd07daa64e3d588bdc8f",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b3fadaa64e3d588bdc8b",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca4",
        "subject":"5f33bd07daa64e3d588bdc9c",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b41adaa64e3d588bdc8c",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca5",
        "subject":"5f33bd07daa64e3d588bdc90",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33be9adaa64e3d588bdc96",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca6",
        "subject":"5f33bd07daa64e3d588bdc92",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33bed1daa64e3d588bdc98",
        "day":"Sunday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca7",
        "subject":"5f33bd07daa64e3d588bdc8d",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b3c0daa64e3d588bdc89",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca8",
        "subject":"5f33bd07daa64e3d588bdc8e",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b3eadaa64e3d588bdc8a",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdca9",
        "subject":"5f33bd07daa64e3d588bdc90",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3c0daa64e3d588bdc89",
        "day":"Tuesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdcaa",
        "subject":"5f33bd07daa64e3d588bdc8e",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3eadaa64e3d588bdc8a",
        "day":"Tuesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdcab",
        "subject":"5f290e4be0bf823ec00ede91",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3eadaa64e3d588bdc8a",
        "day":"Wednesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdcac",
        "subject":"5f33bd07daa64e3d588bdc90",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3c0daa64e3d588bdc89",
        "day":"Wednesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdcad",
        "subject":"5f33bd07daa64e3d588bdc90",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3c0daa64e3d588bdc89",
        "day":"Friday"
    },
    {
        "_id":"5f33d1ffdaa64e3d588bdcae",
        "subject":"5f33bd07daa64e3d588bdc8e",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b3eadaa64e3d588bdc8a",
        "day":"Friday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f3970007d4ad449e0cf5393",
        "subject":"5f33bd07daa64e3d588bdc8d",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b3fadaa64e3d588bdc8b",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f39724c86623f4698a354d6",
        "subject":"5f33bd07daa64e3d588bdc8d",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b41adaa64e3d588bdc8c",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f39724c86623f4698a354d7",
        "subject":"5f33bd07daa64e3d588bdc8d",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33b41adaa64e3d588bdc8c",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f39724c86623f4698a354d8",
        "subject":"5f33bd07daa64e3d588bdc8f",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206e",
        "slot":"5f33be9adaa64e3d588bdc96",
        "day":"Monday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f40c9ee721d74294082dfe2",
        "subject":"5f290e4be0bf823ec00ede91",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33b41adaa64e3d588bdc8c",
        "day":"Tuesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f40c9ee721d74294082dfe3",
        "subject":"5f33bd07daa64e3d588bdc8e",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33be9adaa64e3d588bdc96",
        "day":"Tuesday",
        "link":"8972893472983472"
    },
    {
        "_id":"5f40c9ee721d74294082dfe4",
        "subject":"5f33bd07daa64e3d588bdc90",
        "classroom":"5ee454d1e777062dd82ba898",
        "teacher":"5f16e39ce90c0a3ce036206d",
        "slot":"5f33beb0daa64e3d588bdc97",
        "day":"Monday",
        "link":"8972893472983472"
    }


]
exports.model = Timetable
exports.data = data
