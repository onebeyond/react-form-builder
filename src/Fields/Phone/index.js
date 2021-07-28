/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from 'theme-ui'
import Input from '../Input'
import { Controller } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Phone = ({
  register,
  setValue,
  setError,
  clearErrors,
  control,
  defaultCountry,
  placeholder,
  registerConfig,
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
      register={register}
      name={name}
      defaultValue=''
      setValue={setValue}
      render={({ field: { onChange } }) => (
        <PhoneInput
          onChange={onChange}
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
