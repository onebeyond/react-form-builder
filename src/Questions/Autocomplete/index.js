import React from 'react'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  selectOption: {
    background: 'bg',
    color: 'black'
  }
}

const QuestionAutocomplete = ({ question, useForm }) => {
  const { register, errors, trigger, setValue, unregister } = useForm
  const getOptions = (question) =>
    question.config &&
    question.config.options.map((option) => {
      return {
        value: option.value,
        label: option.label
      }
    })

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
        onChange={() => trigger(question.name)}
        id={question.name}
        aria-describedby={'error_message_' + question.name}
        options={getOptions(question)}
        isSearchable
        placeholder={question.placeholder}
        key={question.name}
        name={question.name}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        unregister={unregister}
        label={question.label}
      >
        {question.config &&
          question.config.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              sx={styles.selectOption}
            >
              {option.label}
            </option>
          ))}
      </Select>
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
