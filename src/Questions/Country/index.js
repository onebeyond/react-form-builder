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

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const sorter = (a, b, arr) => {
  if (arr.includes(a.countryShortCode.toUpperCase())) {
    return -1
  }
  if (arr.includes(b.countryShortCode.toUpperCase())) {
    return 1
  }
  return a.countryShortCode.toUpperCase() - b.countryShortCode.toUpperCase()
}
const prioritySort = (arr1, arr2) => arr1.sort((a, b) => sorter(a, b, arr2))

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
  const { errors, register, setValue } = useForm

  const CustomComponent = ({ component }) => component(question, useForm)

  const countryAndRegions =
    language && countriesMapData[language]
      ? countriesMapData[language]
      : countryAndRegionsData || CountryAndRegionsData

  const getCountriesOptions = (label, countries) => {
    let filteredCountries = countries
    if (question.priorityOptions) {
      filteredCountries = prioritySort(countries, question.priorityOptions)
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

  const options = getCountriesOptions(question.placeholder, countryAndRegions)

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
          getCountriesOptions(question.placeholder, countryAndRegions)
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
