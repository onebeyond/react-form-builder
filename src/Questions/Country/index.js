import CountryAndRegionsData from './data/countryAndRegion'
import DeuschCountryData from './data/de'
import SpanishCountryData from './data/es'
import FrenchCountryData from './data/fr'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const prioritySort = (countries, order) => {
  const countryOrder = []

  order.filter((isoCountryCode) => {
    return countries.find((country) => {
      if (
        isoCountryCode.toString().toLowerCase() ===
        country.countryShortCode.toLowerCase()
      ) {
        countryOrder.push(country)
      }
    })
  })

  const origin = countries.filter(
    (item) => !order.includes(item.countryShortCode)
  )

  return [...countryOrder, ...origin]
}

const countriesMapData = {
  es: SpanishCountryData,
  fr: FrenchCountryData,
  de: DeuschCountryData
}

const QuestionCountry = ({
  component,
  question,
  useForm,
  countryAndRegionsData,
  language,
  ...props
}) => {
  const { errors, register, setValue, unregister } = useForm

  const CustomComponent = ({ component }) => component(question, useForm)

  const countryAndRegions =
    language && countriesMapData[language]
      ? countriesMapData[language]
      : countryAndRegionsData || CountryAndRegionsData

  const getCountriesOptions = (label, countries) => {
    const filteredCountries = prioritySort(
      countries,
      question.priorityOptions || []
    )

    return [].concat(
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

  const options = getCountriesOptions(question.placeholder, countryAndRegions)

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      data-testid='question-country'
      sx={{
        variant: question.id
          ? 'forms.countryContainer.' + question.id
          : 'forms.countryContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='country-label'>
          {question.label}
        </Label>
      )}
      <Select
        id={question.name}
        aria-describedby={'error_message_' + question.name}
        aria-required={
          question.registerConfig && question.registerConfig.required
        }
        key={question.name}
        name={question.name}
        options={options}
        isSearchable={false}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        placeholder={question.placeholder}
        unregister={unregister}
        {...props}
      >
        {renderCountryOptions(
          getCountriesOptions(question.placeholder, countryAndRegions)
        )}
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

export default QuestionCountry
