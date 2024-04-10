import countryRegionData from 'country-region-data/dist/data-umd'; 
import { CountrySubdivisionValueType } from './constants.js';

const buildOptionValue = (valueType, subdivision, selectedCountryCode) => {
  switch (valueType) {
    case CountrySubdivisionValueType.FULL_ISO_CODE:
      return selectedCountryCode + '-' + subdivision.shortCode
    case CountrySubdivisionValueType.NAME:
      return subdivision.name
    case CountrySubdivisionValueType.ISO_CODE:
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
    const priorityOptionsReversed = [...priorityOptions].reverse()
    priorityOptionsReversed.forEach((isoCode) => {
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

export default buildCountrySubdivisonOptions
