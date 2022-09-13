/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import countryAndRegions from './data/countryAndCounties'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import ErrorMessage from '../../Fields/Error'

const QuestionCounty = ({ question, useForm, ...props }) => {
  const { errors, register, setValue, unregister, trigger } = useForm

  const getRegionOptions = (country) => {
    const list =
      countryAndRegions.find((item) => item.cs === country) &&
      countryAndRegions
        .find((item) => item.cs === country)
        .regions.map((option) => ({
          label: option.cn,
          value: option.cn.toLowerCase().replace(/ /g, '_')
        }))

    return list
  }

  const renderCountyOptions = (items) =>
    items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))
  const countrySelected = question?.country || 'GB'
  const options = getRegionOptions(countrySelected)

  return (
    <div
      data-testid='question-county'
      sx={{
        variant: question.id
          ? 'forms.countyContainer.' + question.id
          : 'forms.countyContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='county-label'>
          {question.label}
        </Label>
      )}
      <Select
        onChange={() => trigger(question.name)}
        id={question.name}
        key={question.name}
        name={question.name}
        options={options}
        isSearchable={false}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        placeholder={question.placeholder}
        unregister={unregister}
        label={question.label}
        {...props}
      >
        {renderCountyOptions(options)}
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

export default QuestionCounty
