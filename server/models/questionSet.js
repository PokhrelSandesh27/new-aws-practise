const Joi = require('joi')
const mongoose = require('mongoose')

let QuestionSetSchema= new mongoose.Schema({
  questionSet: Array
  }, {
  timestamps: true
  });

function validateQuestionSet (questionSet) {
    const schema = {
        questionSet: Joi.array().required()
    }

    return Joi.validate(questionSet, schema)
}

function validateSearch (questionSet) {
  const schema = {
      questionSet: Joi.array()
  }

  return Joi.validate(questionSet, schema)
}

const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema)

exports.QuestionSet = QuestionSet
exports.validate = validateQuestionSet
exports.validateSearch = validateSearch
