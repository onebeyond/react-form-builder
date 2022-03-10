/** @jsx jsx */
import { Flex, jsx } from 'theme-ui'
import React, { useEffect } from 'react'
import { RHFInput } from 'react-hook-form-input'
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { differenceInYears, subYears, yearsToMonths, format } from 'date-fns'
import de from 'date-fns/locale/de'
import fr from 'date-fns/locale/fr'
import es from 'date-fns/locale/es'
import { DropdownDate, DropdownComponent } from 'react-dropdown-date'
import styles from './styles'
import { daysInWeek } from 'date-fns/fp'

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
  const [date, setDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState(selected)
  const [isSelectedDate, setIsSelectedDate] = React.useState(false)
  const [sendingValue, setSendingValue] = React.useState(selected)
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
    if (isSelectedDate) {
      setValue(name, convertLocalToUTCDate(selectedDate))
    }
  }, [selectedDate])

  const isOver18 = (date) => {
    return differenceInYears(new Date(), date) >= minAge
  }

  const getInitialDate = () => {
    return subYears(new Date(), minAge)
  }

  const convertLocalToUTCDate = (date) => {
    if (!date) {
      return date
    }
    console.log('converted date', date)
    date = new Date(date)
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    return date
  }

  return (
    <RHFInput
      as={
        <Flex sx={styles.dateContainer}>
          <DropdownDate
            selectedDate={
              selectedDate // 'yyyy-mm-dd' format only
            }
            order={[
              DropdownComponent.month,
              DropdownComponent.year, // Order of the dropdowns
              DropdownComponent.day
            ]}
            onMonthChange={(month) => {
              // optional
              console.log(month)
            }}
            onDayChange={(day) => {
              // optional
              console.log(daysInWeek)
            }}
            onYearChange={(year) => {
              // optional
              console.log(year)
            }}
            onDateChange={(date) => {
              console.log('innerDate', date)
              //setDate(date)
              setSelectedDate(date)
              setIsSelectedDate(!isSelectedDate)
              setSendingValue(date)
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
              yearReverse: true // false by default
            }}
          />
        </Flex>
      }
      rules={{
        ...registerConfig,
        validate: {
          underAge: minAge ? isOver18 : () => true
        }
      }}
      name={name}
      register={register}
      // setValue={(name) => {
      //   console.log('name', name)
      //   setValue(name, sendingValue)
      //   // setTimeout(
      //   //   () => setValue(name, convertLocalToUTCDate(selectedDate)),
      //   //   7000
      //   // )
      // }}
      selected={new Date(selectedDate)}
    />
  )
}

export default DatePicker
