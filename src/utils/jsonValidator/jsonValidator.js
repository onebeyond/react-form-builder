import questionsSchema from './questionSchema'

const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(3).max(30).required(),
  layout: Joi.string().min(3).max(30).required(),
  caption: Joi.string().min(3).required(),
  enabled: Joi.boolean().required(),
  subCaption: Joi.string().min(3),
  questions: questionsSchema.required(),
  question: Joi.array(),
  refrigeratorQuestions: questionsSchema,
  textToShow: Joi.object(),
  callForAction: Joi.array().required(),
  id: Joi.string().required()
})

export default schema
