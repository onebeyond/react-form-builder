/* eslint-disable no-console */
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
  textToShow: Joi.object(),
  callForAction: Joi.array().required(),
  id: Joi.string().required()
})

const validate = (json) => {
  const result = schema.validate(json)
  if (result.error) {
    console.log('JSON validation returned an error: ', result.error.details)
  }
}

export default validate
