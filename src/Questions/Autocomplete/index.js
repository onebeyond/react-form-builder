/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import debounce from 'debounce-promise'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'
import Select from '../../Fields/AsyncReactSelect'

const QuestionAutocomplete = ({ question, useForm }) => {
  const {
    formState: { errors },
    defaultValue,
    control,
    unregister
  } = useForm
  const minCharactersToSearch = 3

  const promiseOptions = debounce(async (inputValue) => {
    if (inputValue.length < minCharactersToSearch) return []

    const url =
      question.config.url +
      '?' +
      new URLSearchParams(
        question.config.params.map((param) => {
          if (param.type === 'fixed') return [param.key, param.value]
          else if (param.type === 'input') return [param.key, inputValue]
        })
      )
    const response = await fetch(url, {
      headers: question.config.headers
    })
    return await response.json()
  }, 350)

  return (
    <div
      data-testid='question-autocomplete'
      sx={{
        variant: question.id
          ? 'forms.autoCompleteContainer.' + question.id
          : 'forms.autoCompleteContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='autocomplete-label'>
          {question.label}
        </Label>
      )}
      <Select
        control={control}
        defaultValue={defaultValue}
        id={question.name}
        aria-describedby={'error_message_' + question.name}
        isSearchable
        unregister={unregister}
        placeholder={question.placeholder}
        key={question.name}
        name={question.name}
        registerConfig={question.registerConfig}
        label={question.label}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
      />
      {errors[question.name] &&
        (errors[question.name].type === 'required' ||
          errors[question.name].type === 'noEmpty') && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
    </div>
  )
}

export default QuestionAutocomplete
