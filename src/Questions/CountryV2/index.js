/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useFormContext } from 'react-hook-form'
import { getCountryDataList, getEmojiFlag } from 'countries-list'
import countriesTools from 'i18n-iso-countries'

import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import { useState } from 'react'

countriesTools.registerLocale(require('i18n-iso-countries/langs/en.json'))

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
    formState: { errors },
    trigger,
    control,
    defaultValue,
    unregister
  } = useFormContext()

  useState(() => {
    try {
      countriesTools.registerLocale(require(`i18n-iso-countries/langs/${language}.json`))
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('@onebeyond/react-form-builder: language not supported for country names. Using English.')
    }
  }, [language])

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
        options={buildCountryOptions(question.config || {}, language || 'en')}
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
