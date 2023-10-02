import CountryAndRegionsData from './data/countryAndRegion'
import DeuschCountryData from './data/de'
import SpanishCountryData from './data/es'
import FrenchCountryData from './data/fr'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'

const prioritySort = (countries, order) => {
  const countryOrder = []

  order.filter((isoCountryCode) => {
    return countries.find((country) => {
      if (
        isoCountryCode.toString().toLowerCase() === country.cs.toLowerCase()
      ) {
        countryOrder.push(country)
      }
    })
  })

  const origin = countries.filter((item) => !order.includes(item.cs))

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
  const {
    formState: { errors },
    trigger,
    control,
    defaultValue,
    watch,
    unregister
  } = useForm

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
        value: (question.returnCountryName && country.value) || country.cs,
        label: country.cn
      }))
    )
  }

  const getRegionOptions = (country) => {
    const list =
      countryAndRegionsData.find((item) => item.cn === country) &&
      countryAndRegionsData
        .find((item) => item.cn === country)
        .regions.map((option) => {
          return {
            value: option.cn,
            label: option.cn
          }
        })

    return list
  }

  const renderCountryOptions = (items) => {
    return items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))
  }
  const options = question.region
    ? getRegionOptions(watch('Country').label)
    : getCountriesOptions(question.placeholder, countryAndRegions)

  return (
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
        control={control}
        defaultValue={defaultValue}
        unregister={unregister}
        onChange={() => {
          trigger(question.name)
        }}
        id={question.name}
        key={question.name}
        name={question.name}
        options={options}
        isSearchable={false}
        registerConfig={question.registerConfig}
        placeholder={question.placeholder}
        label={question.label}
        data-haserrors={!!errors[question.name]}
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
