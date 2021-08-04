const Joi = require('joi')

const question = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required(),
  label: Joi.string().allow(''),
  placeholder: Joi.string().allow(''),
  errorMessages: Joi.object(),
  registerConfig: Joi.object()
})
export default question
