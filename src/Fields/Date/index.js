/** @jsx jsx */
import { jsx } from 'theme-ui'

import React from 'react'
import { RHFInput } from 'react-hook-form-input'
import ReactDatePicker from 'react-datepicker'
import { differenceInYears, subYears } from 'date-fns'

const isOver18 = (dob) => {
  return differenceInYears(new Date(), dob) > 18
}

const getInitialDate = () => {
  return subYears(new Date(), 18)
}

const DatePicker = ({
  register,
  setValue,
  name,
  registerConfig,
  placeholder,
  isMobile,
  dateFormat,
  isBirthDate,
  ...props
}) => {
  const [date, setDate] = React.useState()

  const pickerRef = React.useRef(null)
  React.useEffect(() => {
    if (isMobile && pickerRef.current !== null) {
      pickerRef.current.input.readOnly = true
    }
  }, [isMobile, pickerRef])

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
          openToDate={date || isBirthDate ? getInitialDate() : new Date()}
          disabledKeyboardNavigation
          {...props}
        />
      }
      rules={{
        ...registerConfig,
        validate: {
          u18: isBirthDate ? isOver18 : ''
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
