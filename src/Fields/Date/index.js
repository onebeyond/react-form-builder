/** @jsx jsx */
import { Flex, jsx } from 'theme-ui'
import React from 'react'
import { RHFInput } from 'react-hook-form-input'

import { differenceInYears, subYears, getDaysInMonth } from 'date-fns'
import formatDate from 'date-fns/format'
import deLocale from 'date-fns/locale/de'
import frLocale from 'date-fns/locale/fr'
import esLocale from 'date-fns/locale/es'
import enLocale from 'date-fns/locale/en-GB'
import seLocale from 'date-fns/locale/sv'
import styles from './styles'

import { useDateSelect } from 'react-ymd-date-select'

function CustomDateSelect({
  value,
  onChange,
  locale,
  yearFormat,
  monthFormat,
  dayFormat,
  firstYear,
  lastYear
}) {
  const dateSelect = useDateSelect(value, onChange, {
    firstYear,
    lastYear,
    locale,
    yearFormat,
    monthFormat,
    dayFormat
  })

  const range = (first, last) => {
    if (first > last) return range(last, first).reverse()

    const arr = []
    for (let i = first; i <= last; i++) {
      arr.push(i)
    }
    return arr
  }
  const selectedYear = new Date(dateSelect.dateValue).getFullYear()
  const selectedMonth = new Date(dateSelect.dateValue).getMonth()

  const dayOptions = React.useMemo(() => {
    const maxRange = getDaysInMonth(new Date(selectedYear, selectedMonth))
    return range(1, maxRange).map((day) => {
      const label = dayFormat
        ? formatDate(new Date(1960, 0, day), dayFormat, { locale })
        : day.toString()
      return { label, value: day.toString() }
    })
  }, [locale, dayFormat, selectedMonth])

  return (
    <>
      <select
        id='select-day'
        value={dateSelect.dayValue}
        onChange={dateSelect.onDayChange}
      >
        {dayOptions.map((dayOption) => (
          <option key={dayOption.value} value={dayOption.value}>
            {dayOption.label}
          </option>
        ))}
      </select>
      <select
        id='select-month'
        value={dateSelect.monthValue}
        onChange={dateSelect.onMonthChange}
      >
        {dateSelect.monthOptions.map((monthOption) => (
          <option key={monthOption.value} value={monthOption.value}>
            {monthOption.label}
          </option>
        ))}
      </select>
      <select
        id='select-year'
        value={dateSelect.yearValue}
        onChange={dateSelect.onYearChange}
      >
        {dateSelect.yearOptions.map((yearOption) => (
          <option key={yearOption.value} value={yearOption.value}>
            {yearOption.label}
          </option>
        ))}
      </select>
    </>
  )
}

const DatePicker = ({
  register,
  setValue,
  name,
  registerConfig,
  placeholder,
  language = 'en',
  dateFormat = {
    year: 'yyyy',
    month: 'MMMM',
    day: 'dd'
  },
  minAge = 0,
  selected,
  ...props
}) => {
  const getInitialDate = () => subYears(new Date(), minAge)
  const initialDate = getInitialDate().toString()

  const [selectedDate, setSelectedDate] = React.useState(initialDate)

  const mapLanguagues = {
    en: enLocale,
    fr: frLocale,
    de: deLocale,
    es: esLocale,
    se: seLocale
  }

  React.useEffect(() => {
    setValue(name, convertLocalToUTCDate(selectedDate))
  }, [selectedDate])

  const isOver18 = (date) => differenceInYears(new Date(), date) >= minAge

  const convertLocalToUTCDate = (date) => {
    if (!date) return date

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
          <CustomDateSelect
            value={selectedDate}
            onChange={setSelectedDate}
            locale={mapLanguagues[language]}
            yearFormat={dateFormat.year}
            monthFormat={dateFormat.month}
            dayFormat={dateFormat.day}
            firstYear={1900}
            lastYear={getInitialDate().getFullYear()}
          />
        </Flex>
      }
      rules={{
        ...registerConfig,
        validate: {
          underAge: minAge ? isOver18 : () => true
        }
      }}
      setValue={() => setValue(name, convertLocalToUTCDate(selectedDate))}
      name={name}
      register={register}
      selected={new Date(selectedDate)}
    />
  )
}

export default DatePicker
