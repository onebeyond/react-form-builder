/** @jsx jsx */
import { jsx } from 'theme-ui'
import Input from '../Input'
import PhoneInput from 'react-phone-number-input'
import { RHFInput } from 'react-hook-form-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

const Phone = ({
  register,
  setValue,
  setError,
  clearErrors,
  defaultCountry,
  placeholder,
}) => {
  return (
    <RHFInput
      rules={{
        required: true,
        validate: {
          isPossiblePhoneNumber,
        },
      }}
      register={register}
      name={'phone'}
      setValue={(name, value) => {
        setValue(name, value)
        !isPossiblePhoneNumber(value)
          ? setError(name, {
              type: 'isPossiblePhoneNumber',
            })
          : clearErrors('phone')
      }}
      as={
        <PhoneInput
          placeholder={placeholder}
          defaultCountry={defaultCountry}
          inputComponent={Input}
        />
      }
    />
  )
}

export default Phone
