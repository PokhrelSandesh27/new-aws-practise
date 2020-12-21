const { AssignmentSubmission, validate , validateSearch } = require('../models/assignmentSubmission')

const { Assignment } = require('../models/assignment')
const { User } = require('../models/user')

exports.createAssignmentSubmission = async (req, res) => {
    const { error, value: assignmentSubmissionReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { assignment: assignmentId, student: studentId} = assignmentSubmissionReq

    const student = await User.findById(studentId)
    if (!student) return res.status(400).send('Student with given ID is not found')

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) return res.status(400).send('Assignment with given ID is not found')

    assignmentSubmission = new AssignmentSubmission(assignmentSubmissionReq)
    await assignmentSubmission.save()
    res.send(assignmentSubmission)
}

exports.uploadAssignmentSubmission = async (req, res) => {
    const { error, value: assignmentSubmissionReq } = req.body
    if (error) res.status(400).send(error.details[0].message)

    const assignmentSubmission = await AssignmentSubmission.findById(req.params.id).populate('assignment student')
    if (!assignmentSubmission) return res.status(400).send('Assignment Submission with given ID not found')

    await AssignmentSubmission.findByIdAndUpdate(req.params.id, { link: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedAssignmentSubmission = await AssignmentSubmission.findById(req.params.id)
    res.send(uploadedAssignmentSubmission)
}

exports.getAllAssignmentSubmissions = async (req, res) => {
    const assignmentSubmissions = await AssignmentSubmission.find().populate('assignment student')
    res.send(assignmentSubmissions)
}

exports.getAssignmentSubmissionById = async (req, res) => {
    const assignmentSubmission = await AssignmentSubmission.findById(req.params.id).populate('assignment student')
    if (!assignmentSubmission) return res.status(400).send('Assignment Submission with given ID not found')

    res.send(assignmentSubmission)
}
exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const assignmentSubmissions = await AssignmentSubmission.find(searchReq).populate('assignment student')

    res.send(assignmentSubmissions)
}