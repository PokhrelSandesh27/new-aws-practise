const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const data = ['assignments', 'assignmentSubmissions','books','bookIssues','presentations','classrooms', 'slots', 'timetables', 'students', 'users', 'exams', 'examDetails', 'examReports','marksheets', 'subjects','paymentCategories','paymentConfigurations','scholarshipConfigurations','informations','events','questionSets','attendances','alumni']

async function test () {
    await mongoose.connect('mongodb+srv://ams:database@mycluster.d3wpu.mongodb.net/ams?retryWrites=true&w=majority')

    for (d of data) {
        const { model, data } = require('./data/' + d)
        await model.deleteMany()
        for (item of data) {
            await new model({ ...item }).save()
        }
    }

    const { model: User, data: userData } = require('./data/users')
    await User.deleteMany({})

    for (user of userData) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)

        await new User({ ...user, password: hashedPassword }).save()
    }

    mongoose.disconnect()
    console.info('Done!')
}

test()
