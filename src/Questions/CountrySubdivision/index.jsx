/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useFormContext } from 'react-hook-form'
import countryRegionData from 'country-region-data/dist/data-umd';

import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

const buildCountrySubdivisonOptions = (config, selectedCountryCode) => {
  const priorityOptions = config?.priorityOptions?.selectedCountryCode || []
  const whitelist = config?.whitelist?.selectedCountryCode || []
  const blacklist = config?.blacklist?.selectedCountryCode || []

  let finalListOfSubdivisions =
    countryRegionData.find(country => country.countryShortCode === selectedCountryCode)?.regions || []

  // whitelist and blacklist are mutually exclusive
  if (whitelist.length > 0) {
    finalListOfSubdivisions = finalListOfSubdivisions.filter((subdivision) => whitelist.includes(subdivision.shortCode))
  } else if (blacklist.length > 0) {
    finalListOfSubdivisions = finalListOfSubdivisions.filter((subdivision) => !blacklist.includes(subdivision.shortCode))
  }

  // sort the subdivisions by priority
  if (priorityOptions.length > 0) {
    priorityOptions.toReversed().forEach((isoCode) => {
      const foundIndex =
        finalListOfSubdivisions.findIndex((subdivision) => subdivision.shortCode === isoCode)
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
 * Question of type Country Subdivision
 * @param {props} question Question metadata
 * @returns React component of a country subdivision select
 */
const QuestionCountrySubdivision = ({
  question,
  countryIsoCode,
  ...props
}) => {
  const {
    formState: { errors },
    trigger,
    control,
    defaultValue,
    unregister
  } = useFormContext()

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
        control={control}
        defaultValue={defaultValue}
        unregister={unregister}
        onChange={() => trigger(question.name)}
        id={question.name}
        key={question.name}
        name={question.name}
        options={buildCountrySubdivisonOptions(question.config || {}, countryIsoCode)}
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

export default QuestionCountrySubdivision
