/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import countryRegionData from 'country-region-data/dist/data-umd';

import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

const buildOptionValue = (valueType, subdivision, selectedCountryCode) => {
  switch (valueType) {
    case SubdivisionValueType.FULL_ISO_CODE:
      return selectedCountryCode + '-' + subdivision.shortCode
    case SubdivisionValueType.NAME:
      return subdivision.name
    case SubdivisionValueType.ISO_CODE:
    default:
      return subdivision.shortCode
  }
}

const buildCountrySubdivisonOptions = (config, selectedCountryCode) => {
  const priorityOptions = config.priorityOptions?.[selectedCountryCode] || []
  const whitelist = config.whitelist?.[selectedCountryCode] || []
  const blacklist = config.blacklist?.[selectedCountryCode] || []
  const valueType = config.valueType

  let finalListOfSubdivisions =
    countryRegionData.find(country => country.countryShortCode === selectedCountryCode)?.regions || []

  // whitelist and blacklist are mutually exclusive
  if (whitelist.length > 0) {
    finalListOfSubdivisions = finalListOfSubdivisions.filter((subdivision) => whitelist.includes(subdivision.shortCode))
  } else if (blacklist.length > 0) {
    finalListOfSubdivisions = finalListOfSubdivisions.filter((subdivision) => !blacklist.includes(subdivision.shortCode))
  }

  // map to { value, label } and sort alphabetically
  finalListOfSubdivisions = finalListOfSubdivisions.map((subdivision) => ({
    value: buildOptionValue(valueType, subdivision, selectedCountryCode),
    label: subdivision.name
  })).sort((a, b) => a.label.localeCompare(b.label))


  // sort the subdivisions by priority
  if (priorityOptions.length > 0) {
    priorityOptions.toReversed().forEach((isoCode) => {
      const foundIndex =
        finalListOfSubdivisions.findIndex((subdivision) => subdivision.value.toLowerCase() === isoCode.toLowerCase())
      if (foundIndex !== -1) {
        const foundSubdivision = finalListOfSubdivisions[foundIndex]
        finalListOfSubdivisions.splice(foundIndex, 1);
        finalListOfSubdivisions.unshift(foundSubdivision)
      }
    })
  }

  return finalListOfSubdivisions
}

/**
 * @typedef {string} SubdivisionValueType
 **/

/**
 * Return value type for the country subdivision question.
 * @enum {SubdivisionValueType}
 * @readonly
 * @property {string} ISO_CODE - ISO 3166-2 code of the country subdivision without the country code.
 * @property {string} FULL_ISO_CODE - Full ISO 3166-2 code of the country subdivision (code of the country as prefix).
 * @property {string} NAME - Name of the country subdivision.
 */
const SubdivisionValueType = {
  ISO_CODE: "iso_code",
  FULL_ISO_CODE: "full_iso_code",
  NAME: "name"
}

/**
 * Question of type Country Subdivision
 * @param {Object} question - Question metadata.
 * @param {string} question.id - Question id.
 * @param {string} question.name - Question name.
 * @param {string} question.label - Question label.
 * @param {string} question.placeholder - Question placeholder.
 * @param {Object} question.registerConfig - Question register configuration.
 * @param {Object} question.errorMessages - Question error messages.
 * @param {Object} question.config - Question configuration.
 * @param {boolean} [question.config.search=false] - Whether to enable search in the select.
 * @param {Object} [question.config.priorityOptions={}] - Priority options object with the subdivisions to show first in the list for each country.
 * @param {Object} [question.config.whitelist={}] - Whitelist options object with the subdivisions to show for each country.
 * @param {Object} [question.config.blacklist={}] - Blacklist options object with the subdivisions to hide for each country.
 * @param {string} [question.config.countryIsoCode] - ISO code of the country to get the subdivisions from.
 *    If provided, it will take precedence over the `config.countryQuestionName` to get the selected country.
 * @param {string} [question.config.countryQuestionName] - Name of the country question in the same form to get the selected country ISO code from.
 *    If not provided, a hardcoded country ISO code must be provided in `config.countryIsoCode`.
 * @param {SubdivisionValueType} [question.config.valueType=iso_code] - Value type to return for the country subdivision.
 * @param {Object} props - Extra properties to pass to the component.
 * @returns React component of a country subdivision select.
 */
const QuestionCountrySubdivision = ({
  question,
  ...props
}) => {
  const {
    control,
    defaultValue,
    formState: { errors },
    trigger,
    unregister,
    watch
  } = useFormContext()

  const config = {
    search: question.config?.search || false,
    priorityOptions: question.config?.priorityOptions || {},
    whitelist: question.config?.whitelist || {},
    blacklist: question.config?.blacklist || {},
    valueType: question.config?.valueType || SubdivisionValueType.ISO_CODE
  }

  const countryIsoCode = question.config?.countryIsoCode || watch(question.config?.countryQuestionName)?.value || null

  const selectInputRef = useRef(null)

  useEffect(() => {
    if (selectInputRef.current) {
      selectInputRef.current.clearValue()
    }
  }, [countryIsoCode])

  return (
    <div
      data-testid='question-country-subdivision'
      sx={{
        variant: question.id
          ? 'forms.countrySubdivisionContainer.' + question.id
          : 'forms.countrySubdivisionContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='country-subdivision-label'>
          {question.label}
        </Label>
      )}
      <Select
        ref={selectInputRef}
        control={control}
        data-haserrors={!!errors[question.name]}
        defaultValue={defaultValue}
        id={question.name}
        isDisabled={!countryIsoCode}
        isSearchable={config.search}
        key={question.name}
        label={question.label}
        name={question.name}
        onChange={() => trigger(question.name)}
        options={buildCountrySubdivisonOptions(config, countryIsoCode)}
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

export default QuestionCountrySubdivision
