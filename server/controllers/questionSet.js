const { QuestionSet, validate, validateSearch } = require('../models/questionSet')

exports.createQuestionSet = async (req, res) => {
    const { error, value: questionSetReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    questionSet = new QuestionSet(questionSetReq)
    await questionSet.save()

    res.send(questionSet)
}


exports.getAllQuestionSets = async (req, res) => {
    const questionSets = await QuestionSet.find()
    res.send(questionSets)
}

exports.getQuestionSetById = async (req, res) => {
    const questionSet = await QuestionSet.findById(req.params.id)
    if (!questionSet) return res.status(400).send('Question Set with given ID not found')

    res.send(questionSet)
}
exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    questionSets = await QuestionSet.find(searchReq)
    res.send(questionSets)
}