/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useFormContext } from 'react-hook-form'
import { getCountryDataList, getEmojiFlag } from 'countries-list'
import countriesTools from 'i18n-iso-countries'

import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

// FIXME: be able to dynamicaly import the language file
import enLocale from 'i18n-iso-countries/langs/en.json'
import frLocale from 'i18n-iso-countries/langs/fr.json'
import esLocale from 'i18n-iso-countries/langs/es.json'
import deLocale from 'i18n-iso-countries/langs/de.json'
countriesTools.registerLocale(enLocale)
countriesTools.registerLocale(frLocale)
countriesTools.registerLocale(esLocale)
countriesTools.registerLocale(deLocale)

const buildCountryOptions = (config, language) => {
  const priorityOptions = config?.priorityOptions || []
  const whitelist = config?.whitelist || []
  const blacklist = config?.blacklist || []
  const flag = config?.flag || false

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

  if (flag) {
    finalListOfCountries = finalListOfCountries.map((country) => {
      const emoji = getEmojiFlag(country.value)
      return {
        ...country,
        label: emoji + ' ' + country.label
      }
    })
  }

  return finalListOfCountries
}

/**
 * Question of type CountryV2
 * @param {props} question Question metadata
 * @param {props} language Language to display the country names
 * @returns React component of a country select
 */
const QuestionCountryV2 = ({
  question,
  language,
  ...props
}) => {
  const {
    control,
    defaultValue,
    formState: { errors },
    trigger,
    unregister
  } = useFormContext()

  // This dynamic import is not working when using the library in a project
  // useState(() => {
  //   try {
  //     // countriesTools.registerLocale(require(`i18n-iso-countries/langs/${language}.json`))

  //   //   import(`./node_modules/i18n-iso-countries/langs/${language}.json`).then((module) => {
  //   //     console.log(module)
  //   //     countriesTools.registerLocale(module.default)
  //   //     // do something with the translations
  //   //   });
  //   } catch (e) {
  //     // eslint-disable-next-line no-console
  //     console.error(`@onebeyond/react-form-builder: language '${language}' not supported for country names. Using English.`)
  //   }
  // }, [language])

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
        data-haserrors={!!errors[question.name]}
        defaultValue={defaultValue}
        id={question.name}
        isSearchable={question.config?.search === true}
        key={question.name}
        label={question.label}
        name={question.name}
        onChange={() => trigger(question.name)}
        options={buildCountryOptions(question.config || {}, language || 'en')}
        placeholder={question.placeholder}
        registerConfig={question.registerConfig}
        unregister={unregister}
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
