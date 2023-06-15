/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Input from '../Input'
import { Controller } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Phone = ({
  control,
  setError,
  clearErrors,
  defaultCountry,
  placeholder,
  registerConfig,
  setValue,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      rules={{
        ...registerConfig,
        validate: {
          isValidPhoneNumber: (phone) => {
            const shouldSetError = () => {
              return registerConfig &&
                registerConfig.required &&
                !isValidPhoneNumber(phone)
                ? setError(name, {
                    type: 'isValidPhoneNumber'
                  })
                : clearErrors(name)
            }
            shouldSetError()

            return phone ? isValidPhoneNumber(phone) : null
          }
        }
      }}
      name={name}
      render={({ field: { onChange } }) => (
        <PhoneInput
          defaultValue=''
          onChange={onChange}
          dir='ltr'
          placeholder={placeholder}
          defaultCountry={defaultCountry}
          inputComponent={Input}
          {...props}
        />
      )}
    />
  )
}

export default Phone
