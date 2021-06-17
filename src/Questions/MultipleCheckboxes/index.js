/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

import ReactMarkdown from 'react-markdown'

const QuestionMultipleCheckboxes = ({ component, form, question, useForm }) => {
  const { getValues, errors, register } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={{
        variant: question.id
          ? 'forms.multipleCheckboxesContainer.' + question.id
          : 'forms.multipleCheckboxesContainer'
      }}
    >
      {question.label && <Label>{question.label}</Label>}
      <div
        sx={{
          variant: question.checkboxId
            ? 'forms.multipleCheckboxes' + question.checkboxId
            : 'forms.multipleCheckboxes'
        }}
      >
        {question.config &&
          question.config.options.map((option) => {
            return (
              <div
                sx={{
                  variant: 'forms.multipleCheckboxes.checksContainer'
                }}
                key={option.name}
              >
                <Label sx={{ alignItems: 'center' }}>
                  <Checkbox
                    name={question.name}
                    value={option.value}
                    ref={register({
                      ...question.registerConfig,
                      validate: {
                        minimumLen: question.registerConfig.minimumLen
                          ? () =>
                              getValues()[question.name] &&
                              getValues()[question.name].length >=
                                question.registerConfig.minimumLen
                          : () => true,
                        maximumLen: question.registerConfig.maximumLen
                          ? () =>
                              getValues()[question.name] &&
                              getValues()[question.name].length <=
                                question.registerConfig.maximumLen
                          : () => true
                      }
                    })}
                  />
                  {option.src ? (
                    <img src={option.src} />
                  ) : (
                    <ReactMarkdown
                      source={option.label}
                      renderers={{
                        // eslint-disable-next-line react/display-name
                        link: ({ href, children }) => (
                          <Link href={href} target='_blank'>
                            {children}
                          </Link>
                        )
                      }}
                    />
                  )}
                </Label>
              </div>
            )
          })}
        {errors[question.name] && errors[question.name].type === 'required' && (
          <ErrorMessage
            sx={{
              gridColumn: 1
            }}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
        {errors[question.name] && errors[question.name].type === 'minimumLen' && (
          <ErrorMessage
            sx={{
              gridColumn: 1
            }}
            message={
              question.errorMessages && question.errorMessages.minimumLen
            }
          />
        )}
        {errors[question.name] && errors[question.name].type === 'maximumLen' && (
          <ErrorMessage
            sx={{
              gridColumn: 1
            }}
            message={
              question.errorMessages && question.errorMessages.maximumLen
            }
          />
        )}
      </div>
    </div>
  )
}

export default QuestionMultipleCheckboxes
