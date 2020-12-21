const { Presentation, validate, validateSearch } = require('../models/presentation')

const { Classroom } = require('../models/classroom')
const { Subject } = require('../models/subject')
const { User } = require('../models/user')

exports.createPresentation = async (req, res) => {
    const { error, value: presentationReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { subject: subjectId, teacher: teacherId, classroom: classroomId } = presentationReq

    const teacher = await User.findById(teacherId)
    if (!teacher) return res.status(400).send('Teacher with given ID is not found')

    const classroom = await Classroom.findById(classroomId)
    if (!classroom) return res.status(400).send('Classroom with given ID is not found')

    const subject = await Subject.findById(subjectId)
    if (!subject) return res.status(400).send('Subject with given ID is not found')

    presentation = new Presentation(presentationReq)
    await presentation.save()

    res.send(presentation)
}

exports.uploadPresentation = async (req, res) => {
    const { error, value: presentationReq } = req.body
    if (error) res.status(400).send(error.details[0].message)

    const presentation = await Presentation.findById(req.params.id).populate('teacher classroom subject')
    if (!presentation) return res.status(400).send('Presentation with given ID not found')
    
    await Presentation.findByIdAndUpdate(req.params.id, { link: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedPresentation = await Presentation.findById(req.params.id)
    res.send(uploadedPresentation)
}

exports.getAllPresentations = async (req, res) => {
    const presentations = await Presentation.find().populate('teacher classroom subject')
    res.send(presentations)
}

exports.getPresentationById = async (req, res) => {
    const presentation = await Presentation.findById(req.params.id).populate('teacher classroom subject')
    if (!presentation) return res.status(400).send('Presentation with given ID not found')

    res.send(presentation)
}
exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    
    const {topic} = searchReq
    let presentations;
    if(topic){
         presentations = await Presentation.find({...searchReq,topic:{ $regex: topic, $options: 'i' }}).populate('teacher classroom subject')
    }
    else{
         presentations = await Presentation.find(searchReq).populate('teacher classroom subject')
    }
    res.send(presentations)
}