const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(3).max(30).required(),
  layout: Joi.string().min(3).max(30).required(),
  caption: Joi.string().min(3).max(30).required(),
  enabled: Joi.boolean().required(),
  subCaption: Joi.string().min(3),
  questions: Joi.array().required(),
  question: Joi.array(),
  refrigeratorQuestions: Joi.array(),
  textToShow: Joi.object().required(),
  callForAction: Joi.array().required(),
  id: Joi.string().required()
})

export default schema
