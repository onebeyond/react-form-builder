/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from 'theme-ui'
import Input from '../Input'
import { RHFInput } from 'react-hook-form-input'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Phone = ({
  register,
  setValue,
  setError,
  clearErrors,
  defaultCountry,
  placeholder,
  registerConfig,
  name,
  ...props
}) => {
  return (
    <RHFInput
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
      register={register}
      name={name}
      defaultValue=''
      setValue={setValue}
      dir='ltr'
      as={
        <PhoneInput
          placeholder={placeholder}
          defaultCountry={defaultCountry}
          inputComponent={Input}
          {...props}
        />
      }
    />
  )
}

export default Phone
