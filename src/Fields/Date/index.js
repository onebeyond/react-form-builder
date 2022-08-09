/** @jsx jsx */
import { Flex, jsx } from 'theme-ui'
import React from 'react'
import { RHFInput } from 'react-hook-form-input'

import { differenceInYears, subYears } from 'date-fns'
import deLocale from 'date-fns/locale/de'
import frLocale from 'date-fns/locale/fr'
import esLocale from 'date-fns/locale/es'
import enLocale from 'date-fns/locale/en-GB'
import seLocale from 'date-fns/locale/sv'
import { DateSelect } from 'react-ymd-date-select/dist/cjs/presets/vanilla'

import styles from './styles'

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
          <DateSelect
            value={selectedDate}
            onChange={setSelectedDate}
            locale={mapLanguagues[language]}
            yearFormat={dateFormat?.year}
            monthFormat={dateFormat?.month}
            dayFormat={dateFormat?.day}
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
