/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import AgeData from './data/age'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import ErrorMessage from '../../Fields/Error'

const QuestionAge = ({ question, useForm, language, ...props }) => {
  const {
    formState: { errors },
    setValue,
    trigger,
    unregister,
    defaultValue,
    control
  } = useForm
  const getOptions = (question) =>
    question.config &&
    question.config.options.map((option) => ({
      value: option.value,
      label: option.label
    }))

  const ageData = getOptions(question) || AgeData

  const renderAgeOptions = (items) =>
    items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))

  return (
    <div
      data-testid='question-age'
      sx={{
        variant: question.id
          ? 'forms.ageContainer.' + question.id
          : 'forms.ageContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='age-label'>
          {question.label}
        </Label>
      )}
      <Select
        control={control}
        setValue={setValue}
        defaultValue={defaultValue}
        unregister={unregister}
        onChange={() => trigger(question.name)}
        id={question.name}
        key={question.name}
        name={question.name}
        options={ageData}
        isSearchable={false}
        registerConfig={question.registerConfig}
        placeholder={question.placeholder}
        label={question.label}
        data-haserrors={!!errors[question.name]}
        {...props}
      >
        {renderAgeOptions(ageData)}
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

export default QuestionAge
