const { Assignment, validate, validateSearch } = require('../models/assignment')

const { Classroom } = require('../models/classroom')
const { Subject } = require('../models/subject')
const { User } = require('../models/user')

exports.createAssignment = async (req, res) => {
    const { error, value: assignmentReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { subject: subjectId, teacher: teacherId, classroom: classroomId } = assignmentReq

    const teacher = await User.findById(teacherId)
    if (!teacher) return res.status(400).send('Teacher with given ID is not found')

    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Classroom with given ID is not found')

    const subject = await Subject.findById(subjectId)
    if (!subject) return res.status(400).send('Subject with given ID is not found')

    assignment = new Assignment(assignmentReq)
    await assignment.save()

    res.send(assignment)
}

exports.uploadAssignment = async (req, res) => {
    const { error, value: assignmentReq } = req.body
    if (error) res.status(400).send(error.details[0].message)
    const assignment = await Assignment.findById(req.params.id).populate('teacher classroom subject')
    if (!assignment) return res.status(400).send('Assignment with given ID not found')
    await Assignment.findByIdAndUpdate(req.params.id, { link: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedAssignment = await Assignment.findById(req.params.id)
    res.send(uploadedAssignment)
}

exports.getAllAssignments = async (req, res) => {
    const assignments = await Assignment.find().populate('teacher classroom subject')
    res.send(assignments)
}

exports.getAssignmentById = async (req, res) => {
    const assignment = await Assignment.findById(req.params.id).populate('teacher classroom subject')
    if (!assignment) return res.status(400).send('Assignment with given ID not found')

    res.send(assignment)
}

exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    
    const {topic} = searchReq
    if(topic){
        assignments = await Assignment.find({...searchReq,topic:{ $regex: topic, $options: 'i' }})
    }
    else{
        assignments = await Assignment.find(searchReq).populate('teacher classroom subject')
    }
    res.send(assignments)
}