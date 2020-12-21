const { Alumni, validate, validateSearch} = require('../models/alumni')
exports.createAlumni = async (req, res) => {
    const { error, value: alumniReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    alumni = new Alumni(alumniReq)
    await alumni.save()

    res.send(alumni)
}

exports.uploadPhoto = async (req, res) => {
    const { error, value: alumniReq } = req.body
    if (error) res.status(400).send(error.details[0].message)

    const alumni = await Alumni.findById(req.params.id)
    if (!alumni) return res.status(400).send('Alumni with given ID not found')
    
    await Alumni.findByIdAndUpdate(req.params.id, { photo: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedPhoto = await Alumni.findById(req.params.id)
    res.send(uploadedPhoto)
}

exports.getAllAlumni = async (req, res) => {
    const alumni = await Alumni.find()
    res.send(alumni)
}

exports.getAlumniById = async (req, res) => {
    const alumni = await Alumni.findById(req.params.id)
    if (!alumni) return res.status(400).send('Alumni with given ID not found')

    res.send(alumni)
}

exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const {firstName,lastName} = searchReq
    if(firstName && lastName){
        alumni = await Alumni.find({...searchReq,firstName:{ $regex: firstName, $options: 'i' },lastName:{ $regex: lastName, $options: 'i' }})
    }
    else if(firstName){
        alumni = await Alumni.find({...searchReq,firstName:{ $regex: firstName, $options: 'i' }})
    }
    if(lastName){
        alumni = await Alumni.find({...searchReq,lastName:{ $regex: lastName, $options: 'i' }})
    }
    else{
        alumni = await Alumni.find({...searchReq})
    }
    res.send(alumni)
}