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
  ...props
}) => {
  const [date, setDate] = React.useState()

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
          openToDate={isBirthDate ? getInitialDate() : date || new Date()}
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
      setValue={setValue}
      selected={date}
      onChange={setDate}
    />
  )
}

export default DatePicker
