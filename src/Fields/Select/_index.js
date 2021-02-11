/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import { RHFInput } from 'react-hook-form-input'
import ReactSelect from 'react-select'

const Select = ({
  register,
  setValue,
  name,
  defaultValue,
  registerConfig,
  ...props
}) => (
  <RHFInput
    as={<ReactSelect {...props} />}
    rules={{
      ...registerConfig,
      validate: {
        noEmpty: (item) =>
          registerConfig && registerConfig.required ? item.value !== '*' : true
      }
    }}
    name={name}
    defaultValue={defaultValue}
    register={register}
    setValue={setValue}
  />
)

export default Select
