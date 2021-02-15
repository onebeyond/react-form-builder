import CountryAndRegionsData from '../../forms/countryAndRegion'
// import { StyleTypeMap } from '../../utils/styleTypeMap'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const QuestionCountry = ({
  question,
  register,
  errors,
  isMobile = false,
  setValue,
  ...props
}) => {
  const getCountriesOptions = (label, countries) => {
    return [].concat(
      [
        {
          value: '*',
          label: label
        }
      ],
      countries.map((country) => ({
        value: country.countryName,
        label: country.countryName
      }))
    )
  }

  const renderCountryOptions = (items) => {
    return items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))
  }

  const options = getCountriesOptions(
    question.placeholder,
    CountryAndRegionsData
  )

  return (
    <div sx={{ variant: 'forms.countryContainer' }}>
      {question.label && <Label>{question.label}</Label>}
      <Select
        key={question.name}
        name={question.name}
        options={options}
        isSearchable={false}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        defaultValue={options[0]}
        {...props}
      >
        {renderCountryOptions(
          getCountriesOptions(question.placeholder, CountryAndRegionsData)
        )}
      </Select>
      {errors[question.name] &&
        (errors[question.name].type === 'required' ||
          errors[question.name].type === 'noEmpty') && (
          <ErrorMessage
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
    </div>
  )
}

export default QuestionCountry
