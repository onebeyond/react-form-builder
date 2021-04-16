import CountryAndRegionsData from '../../forms/countryAndRegion'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const priorizeCountriesOrder = (countries, order) => {
  const filteredElements = countries.filter((country) => {
    return order.find(
      (isoCountryCode) =>
        isoCountryCode.toString().toLowerCase() ===
        country.countryName.toLowerCase()
    )
  })

  const origin = countries.filter(
    (item) => !order.includes(item.countryShortCode)
  )

  return [...filteredElements, ...origin]
}

const QuestionCountry = ({
  component,
  question,
  useForm,
  countryAndRegionsData = CountryAndRegionsData,
  ...props
}) => {
  const { errors, register, setValue } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const getCountriesOptions = (label, countries) => {
    let filteredCountries = countries
    if (question.priorityOptions) {
      filteredCountries = priorizeCountriesOrder(
        countries,
        question.priorityOptions
      )
    }
    return [].concat(
      [
        {
          value: '*',
          label: label
        }
      ],
      filteredCountries.map((country) => ({
        value: country.countryShortCode,
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
    countryAndRegionsData
  )

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      data-testid='question-country'
      sx={
        question.isFullWidth
          ? {
              ...(question.isFullWidth && styles.fullWidth),
              variant: 'forms.countryContainerFullWidth'
            }
          : {
              variant: 'forms.countryContainer'
            }
      }
    >
      {question.label && (
        <Label data-testid='country-label'>{question.label}</Label>
      )}
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
          getCountriesOptions(question.placeholder, countryAndRegionsData)
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
