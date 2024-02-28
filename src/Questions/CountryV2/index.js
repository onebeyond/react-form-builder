/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { getCountryDataList } from 'countries-list'
import countriesTools from 'i18n-iso-countries'

import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

// TODO: import all languages
countriesTools.registerLocale(require('i18n-iso-countries/langs/en.json'))
countriesTools.registerLocale(require('i18n-iso-countries/langs/es.json'))
countriesTools.registerLocale(require('i18n-iso-countries/langs/fr.json'))

const QuestionCountryV2 = ({
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
    unregister
  } = useForm

  const buildCountryOptions = (config) => {
    const priorityOptions = config?.priorityOptions || []
    const whitelist = config?.whitelist || []
    const blacklist = config?.blacklist || []

    let finalListOfCountries = getCountryDataList()

    // whitelist and blacklist are mutually exclusive
    if (whitelist.length > 0) {
      finalListOfCountries = finalListOfCountries.filter((country) => whitelist.includes(country.iso2))
    } else if (blacklist.length > 0) {
      finalListOfCountries = finalListOfCountries.filter((country) => !blacklist.includes(country.iso2))
    }

    // translate the country names and sort them by translated name
    finalListOfCountries = finalListOfCountries.map((country) => ({
      value: country.iso2,
      label: countriesTools.getName(country.iso2, language) || country.name
    })).sort((a, b) => a.label.localeCompare(b.label))

    // sort the countries by priority
    if (priorityOptions.length > 0) {
      priorityOptions.toReversed().forEach((isoCountryCode) => {
        const foundIndex = finalListOfCountries.findIndex((country) => country.value.toLowerCase() === isoCountryCode.toLowerCase())
        if (foundIndex !== -1) {
          const foundCountry = finalListOfCountries[foundIndex]
          finalListOfCountries.splice(foundIndex, 1);
          finalListOfCountries.unshift(foundCountry)
        }
      })
    }

    return finalListOfCountries
  }

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
        onChange={() => trigger(question.name)}
        id={question.name}
        key={question.name}
        name={question.name}
        options={buildCountryOptions(question.config || {})}
        isSearchable={question.config?.search === true}
        registerConfig={question.registerConfig}
        placeholder={question.placeholder}
        label={question.label}
        data-haserrors={!!errors[question.name]}
        {...props}
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

export default QuestionCountryV2
