/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx, useThemeUI } from 'theme-ui'
import { RHFInput } from 'react-hook-form-input'
import ReactSelect from 'react-select'

const Select = ({
  register,
  setValue,
  name,
  defaultValue,
  registerConfig,
  ...props
}) => {
  const { theme } = useThemeUI()
  const selectStyles = {
    option: {},
    clearIndicator: {},
    container: {},
    control: {},
    dropdownIndicator: {},
    group: {},
    groupHeading: {},
    indicatorsContainer: {},
    indicatorSeparator: {},
    input: {},
    loadingIndicator: {},
    loadingMessage: {},
    menu: {},
    menuList: {},
    menuPortal: {},
    multiValue: {},
    multiValueLabel: {},
    multiValueRemove: {},
    noOptionsMessage: {},
    placeholder: {},
    singleValue: {},
    valueContainer: {}
  }

  Object.keys(selectStyles).map((property) => {
    if (theme.select && theme.select[property]) {
      selectStyles[property] = theme.select[property]
    }
  })

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      ...selectStyles.option
    }),
    input: (provided, state) => ({
      ...provided,
      ...selectStyles.input
    }),
    control: (provided, state) => ({
      ...provided,
      ...selectStyles.control
    })
  }

  return (
    <RHFInput
      as={<ReactSelect styles={customStyles} {...props} />}
      rules={{
        ...registerConfig,
        validate: {
          noEmpty: (item) =>
            registerConfig && registerConfig.required
              ? item.value !== '*'
              : true
        }
      }}
      name={name}
      defaultValue={defaultValue}
      register={register}
      setValue={setValue}
    />
  )
}

export default Select
