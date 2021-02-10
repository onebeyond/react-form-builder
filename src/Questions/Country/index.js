import CountryAndRegionsData from '../../forms/countryAndRegion'
// import { StyleTypeMap } from '../../utils/styleTypeMap'
import ErrorMessage from '../../Fields/Error'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'

/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

// const styles = {
//   desktop: {
//     input: {
//       bg: 'background',
//       padding: '15 16px',
//       height: '44px',
//       fontSize: '16px',
//       mb: '8px',
//       border: 'solid 1px #ccc',
//       borderRadius: '22px'
//     },
//     label: {
//       color: 'text',
//       alignItems: 'center',
//       textAlign: 'center',
//       fontSize: '16px',
//       mt: '10px',
//       justifyContent: 'center'
//     }
//   },
//   mobile: {
//     input: {
//       bg: 'background',
//       padding: '15 16px',
//       height: '44px',
//       fontSize: '16px',
//       mb: '8px',
//       border: 'solid 1px #ccc',
//       borderRadius: '22px'
//     },
//     label: {
//       color: 'text',
//       alignItems: 'center',
//       textAlign: 'center',
//       fontSize: '16px',
//       mt: '10px',
//       justifyContent: 'center'
//     }
//   },
//   fullWidth: {
//     gridColumnStart: '1',
//     gridColumnEnd: '3'
//   }
// }

const QuestionCountry = ({
  question,
  register,
  errors,
  isMobile = false,
  setValue,
  ...props
}) => {
  const getCountriesOptions = (label, countries) => {
    return [].concat(
      [
        {
          value: '*',
          label: label
        }
      ],
      countries.map((country) => ({
        value: country.countryName,
        label: country.countryName
      }))
    )
  }

  const renderCountryOptions = (items) => {
    return items.map((item) => (
      // <option key={item.value} value={item.value} sx={styles.selectOption}>
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))
  }

  return (
    <div
    // sx={{
    //   ...(question.isFullWidth && styles.fullWidth)
    // }}
    >
      {question.label && (
        // <Label sx={styles[StyleTypeMap[isMobile]].label}>
        <Label>{question.label}</Label>
      )}
      <Select
        // sx={styles[StyleTypeMap[isMobile]].input}
        key={question.name}
        name={question.name}
        options={getCountriesOptions(
          question.placeholder,
          CountryAndRegionsData
        )}
        isSearchable={false}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        {...props}
      >
        {renderCountryOptions(
          getCountriesOptions(question.placeholder, CountryAndRegionsData)
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
