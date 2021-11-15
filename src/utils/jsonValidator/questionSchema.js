import {
  inputSchema,
  checkBoxSchema,
  multipleCheckboxesSchema,
  selectSchema,
  dateSchema,
  countrySchema
} from './questionPerType'

const Joi = require('joi')

const questionsSchema = Joi.array().items(
  inputSchema,
  checkBoxSchema,
  multipleCheckboxesSchema,
  selectSchema,
  dateSchema,
  countrySchema
)

export default questionsSchema
