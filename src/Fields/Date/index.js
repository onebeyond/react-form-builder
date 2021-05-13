/** @jsx jsx */
import { jsx } from 'theme-ui'

import React from 'react'
import { RHFInput } from 'react-hook-form-input'
import ReactDatePicker from 'react-datepicker'
import { differenceInYears, subYears } from 'date-fns'

const DatePicker = ({
  register,
  setValue,
  name,
  registerConfig,
  placeholder,
  isMobile,
  dateFormat,
  isBirthDate,
  minAge,
  openToDate = '',
  ...props
}) => {
  const [date, setDate] = React.useState(new Date())
  const pickerRef = React.useRef(null)
  React.useEffect(() => {
    if (isMobile && pickerRef.current !== null) {
      pickerRef.current.input.readOnly = true
    }
  }, [isMobile, pickerRef])

  const isOver18 = (date) => {
    return differenceInYears(new Date(), date) >= (minAge || 18)
  }

  const getInitialDate = () => {
    return subYears(new Date(), minAge || 18)
  }

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

  const [day, month, year] = openToDate.split('-')

  return (
    <RHFInput
      as={
        <ReactDatePicker
          ref={pickerRef}
          portalId='root-portal'
          withPortal={isMobile}
          placeholderText={placeholder}
          dateFormat={dateFormat || 'dd/MM/yyyy'}
          showYearDropdown
          dropdownMode={isMobile ? 'select' : 'scroll'}
          openToDate={
            openToDate.split('-').length === 3
              ? new Date(year, month - 1, day)
              : isBirthDate
              ? getInitialDate()
              : date || new Date()
          }
          disabledKeyboardNavigation
          {...props}
        />
      }
      rules={{
        ...registerConfig,
        validate: {
          u18: isBirthDate ? isOver18 : () => true
        }
      }}
      name={name}
      register={register}
      setValue={(name, value) => {
        setValue(name, convertLocalToUTCDate(value))
      }}
      selected={new Date(date)}
      onChange={setDate}
    />
  )
}

export default DatePicker
