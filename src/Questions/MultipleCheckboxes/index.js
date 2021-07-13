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
      <fieldset sx={{ border: '0' }}>
        {question.label && (
          <legend htmlFor={question.name}>{question.label}</legend>
        )}
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
                  <Label htmlFor={option.name} sx={{ alignItems: 'center' }}>
                    <Checkbox
                      data-testid='question-singleCheckbox'
                      id={option.name}
                      aria-describedby={'error_message_' + question.name}
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
              name={question.name}
              sx={{
                gridColumn: 1
              }}
              message={
                question.errorMessages && question.errorMessages.required
              }
            />
          )}
          {errors[question.name] &&
            errors[question.name].type === 'minimumLen' && (
              <ErrorMessage
                name={question.name}
                sx={{
                  gridColumn: 1
                }}
                message={
                  question.errorMessages && question.errorMessages.minimumLen
                }
              />
            )}
          {errors[question.name] &&
            errors[question.name].type === 'maximumLen' && (
              <ErrorMessage
                name={question.name}
                sx={{
                  gridColumn: 1
                }}
                message={
                  question.errorMessages && question.errorMessages.maximumLen
                }
              />
            )}
        </div>
      </fieldset>
    </div>
  )
}

export default QuestionMultipleCheckboxes
