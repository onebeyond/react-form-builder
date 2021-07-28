/** @jsx jsx */
import { jsx } from 'theme-ui'

import React from 'react'
import { Controller } from 'react-hook-form'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { differenceInYears, subYears } from 'date-fns'
import de from 'date-fns/locale/de'
import fr from 'date-fns/locale/fr'
import es from 'date-fns/locale/es'
import en from 'date-fns/locale/en-GB'

const DatePicker = ({
  register,
  setValue,
  name,
  registerConfig,
  placeholder,
  isMobile,
  control,
  language,
  dateFormat,
  minAge = 0,
  openToDate = '',
  ...props
}) => {
  const pickerRef = React.useRef(null)
  const mapLanguagues = { de, fr, es, en }
  const datepickerLanguage =
    language && mapLanguagues[language.toLowerCase()]
      ? mapLanguagues[language.toLowerCase()]
      : mapLanguagues.en

  registerLocale(datepickerLanguage.code, datepickerLanguage)
  React.useEffect(() => {
    if (isMobile && pickerRef.current !== null) {
      pickerRef.current.input.readOnly = true
    }
  }, [isMobile, pickerRef])

  const isOver18 = (date) => {
    return differenceInYears(new Date(), date) >= minAge
  }

  const getInitialDate = () => {
    return subYears(new Date(), minAge)
  }

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <ReactDatePicker
          ref={pickerRef}
          portalId='root-portal'
          locale={datepickerLanguage.code}
          withPortal={isMobile}
          placeholderText={placeholder}
          dateFormat={dateFormat || 'dd/MM/yyyy'}
          showYearDropdown
          dropdownMode={isMobile ? 'select' : 'scroll'}
          openToDate={openToDate ? new Date(openToDate) : getInitialDate()}
          disabledKeyboardNavigation
          {...props}
          onChange={onChange}
          selected={value}
        />
      )}
      rules={{
        ...registerConfig,
        validate: {
          underAge: minAge ? isOver18 : () => true
        }
      }}
      name={name}
      register={register}
    />
  )
}

export default DatePicker
