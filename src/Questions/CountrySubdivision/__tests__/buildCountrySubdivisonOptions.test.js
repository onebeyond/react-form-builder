import countryRegionData from 'country-region-data/dist/data-umd';

import buildCountrySubdivisonOptions from "../buildCountrySubdivisonOptions"

const selectedCountryCode = 'ES'
const countrySubdivisions =
  countryRegionData.find(country => country.countryShortCode === selectedCountryCode)?.regions || []

test(`buildCountrySubdivisonOptions returns all the regions of a country in a {label, value} format
  with the region iso code as value`, () => {
  const config = {
    valueType: 'iso_code'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(countrySubdivisions.length)
  countrySubdivisions.forEach(element => {
    expect(result).toContainEqual({ "label": element.name, "value": element.shortCode })
  });
})

test(`buildCountrySubdivisonOptions returns all the regions of a country in a {label, value} format
  with the region name as value`, () => {
  const config = {
    valueType: 'name'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(countrySubdivisions.length)
  countrySubdivisions.forEach(element => {
    expect(result).toContainEqual({ "label": element.name, "value": element.name })
  });
})

test(`buildCountrySubdivisonOptions returns all the regions of a country in a {label, value} format
  with the region full iso code as value`, () => {
  const config = {
    valueType: 'full_iso_code'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(countrySubdivisions.length)
  countrySubdivisions.forEach(element => {
    expect(result).toContainEqual({ "label": element.name, "value": `${selectedCountryCode}-${element.shortCode}` })
  });
})

test(`buildCountrySubdivisonOptions returns all the regions of a country in a {label, value} format
  with the region full iso code as value and the region in the 'priorityOptions' array at the begining`, () => {
  const randomIndex = Math.floor(Math.random() * countrySubdivisions.length - 1)
  const priorityRegion = countrySubdivisions[randomIndex]
  const config = {
    priorityOptions: {
      [selectedCountryCode]: [priorityRegion.shortCode]
    },
    valueType: 'iso_code'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(countrySubdivisions.length)
  expect(result[0]).toEqual({ "label": priorityRegion.name, "value": priorityRegion.shortCode })
  countrySubdivisions.forEach(element => {
    expect(result).toContainEqual({ "label": element.name, "value": element.shortCode })
  });
})

test(`buildCountrySubdivisonOptions returns only the regions of a country in the whitelist in a {label, value} format
  with the region iso code as value`, () => {
  const randomIndex = Math.floor(Math.random() * countrySubdivisions.length - 1)
  const whitelistRegion = countrySubdivisions[randomIndex]
  const config = {
    whitelist: {
      [selectedCountryCode]: [whitelistRegion.shortCode]
    },
    valueType: 'iso_code'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(1)
  expect(result).toContainEqual({ "label": whitelistRegion.name, "value": whitelistRegion.shortCode })
})

test(`buildCountrySubdivisonOptions returns all the regions of a country in a {label, value} format
  with the region iso code as value except the regions in the blacklist`, () => {
  const randomIndex = Math.floor(Math.random() * countrySubdivisions.length - 1)
  const blacklistRegion = countrySubdivisions[randomIndex]
  const config = {
    blacklist: {
      [selectedCountryCode]: [blacklistRegion.shortCode]
    },
    valueType: 'iso_code'
  }
  const result = buildCountrySubdivisonOptions(config, selectedCountryCode)

  expect(result.length).toEqual(countrySubdivisions.length - config.blacklist[selectedCountryCode].length)
  expect(result).not.toContainEqual({ "label": blacklistRegion.name, "value": blacklistRegion.shortCode })
})
