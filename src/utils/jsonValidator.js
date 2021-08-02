const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(3).max(30).required(),
  layout: Joi.string().min(3).max(30).required(),
  caption: Joi.string().min(3).max(30).required(),
  enabled: Joi.boolean().required(),
  subCaption: Joi.string().min(3),
  questions: Joi.array()
    .required()
    .items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        label: Joi.string().required(),
        placeholder: Joi.string().required(),
        icon: Joi.object().required().keys({
          name: Joi.string(),
          fill: Joi.string()
        }),
        tooltip: Joi.object()
          .required()
          .keys({
            text: Joi.string(),
            config: Joi.string().keys({
              backgroundColor: Joi.string()
            })
          }),
        errorMessages: Joi.object().required().keys({
          required: Joi.string(),
          pattern: Joi.string()
        }),
        registerConfig: Joi.object().required().keys({
          required: Joi.boolean()
        })
      })
    ),
  question: Joi.array(),
  refrigeratorQuestions: Joi.array(),
  textToShow: Joi.object().required(),
  callForAction: Joi.array().required(),
  id: Joi.string().required()
})

export default schema
