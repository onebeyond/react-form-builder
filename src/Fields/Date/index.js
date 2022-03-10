/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { RHFInput } from 'react-hook-form-input'
import { registerLocale } from 'react-datepicker'

import { differenceInYears } from 'date-fns'
import de from 'date-fns/locale/de'
import fr from 'date-fns/locale/fr'
import es from 'date-fns/locale/es'
import { DropdownDate, DropdownComponent } from 'react-dropdown-date'
import styles from './styles'

const DatePicker = ({
  register,
  setValue,
  name,
  registerConfig,
  placeholder,
  isMobile,
  language,
  dateFormat,
  minAge = 0,
  selected,
  openToDate = '',
  ...props
}) => {
  const [selectedDate, setSelectedDate] = React.useState(selected)
  const pickerRef = React.useRef(null)
  const mapLanguagues = { de, fr, es }
  let datepickerLanguage = 'en'
  if (language && mapLanguagues[language.toLowerCase()]) {
    datepickerLanguage = mapLanguagues[language.toLowerCase()]
    registerLocale(datepickerLanguage.code, datepickerLanguage)
  }

  React.useEffect(() => {
    if (isMobile && pickerRef.current !== null) {
      pickerRef.current.input.readOnly = true
    }
  }, [isMobile, pickerRef])

  React.useEffect(() => {
    setValue(name, convertLocalToUTCDate(selectedDate))
  }, [selectedDate])

  const isOver18 = (date) => {
    return differenceInYears(new Date(), date) >= minAge
  }

  // const getInitialDate = () => {
  //   return subYears(new Date(), minAge)
  // }

  const convertLocalToUTCDate = (date) => {
    if (!date) {
      return date
    }
    date = new Date(date)
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    return date
  }

  return (
    <RHFInput
      as={
        <DropdownDate
          selectedDate={selectedDate}
          order={[
            DropdownComponent.day,
            DropdownComponent.month,
            DropdownComponent.year
          ]}
          onDateChange={(date) => {
            setSelectedDate(date)
          }}
          ids={{
            year: 'select-year',
            month: 'select-month',
            day: 'select-day'
          }}
          names={{
            year: 'year',
            month: 'month',
            day: 'day'
          }}
          classes={{
            dateContainer: styles.dateContainer
          }}
          defaultValues={{
            year: 'select year',
            month: 'select month',
            day: 'select day'
          }}
          options={{
            yearReverse: true
          }}
        />
      }
      rules={{
        ...registerConfig,
        validate: {
          underAge: minAge ? isOver18 : () => true
        }
      }}
      name={name}
      register={register}
      selected={new Date(selectedDate)}
    />
  )
}

export default DatePicker
