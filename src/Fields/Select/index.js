/** @jsxRuntime classic */

import React from 'react'

import { RHFInput } from 'react-hook-form-input'
import ReactSelect from 'react-select'

const Select = ({
  register,
  setValue,
  name,
  onChange = undefined,
  unregister,
  defaultValue,
  registerConfig,
  theme = {},
  label,
  ...props
}) => {
  // const { theme: themeUI } = useThemeUI()

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

  const customStyles = {}

  Object.keys(selectStyles).map((property) => {
    if (theme && theme[property]) {
      selectStyles[property] = theme[property]
      customStyles[property] = (provided, state) => {
        if (state.isDisabled) {
          return {
            ...provided,
            ...theme[property].isDisabled
          }
        }
        if (state.isSelected) {
          return {
            ...provided,
            ...theme[property].isSelected
          }
        }
        if (state.isFocused) {
          return {
            ...provided,
            ...theme[property].isFocused
          }
        }
        return {
          ...provided,
          ...theme[property]
        }
      }
    }
  })

  React.useEffect(() => {
    return () => {
      unregister(name)
    }
  }, [])

  return (
    <RHFInput
      onChange={onChange}
      as={<ReactSelect aria-label={label} styles={customStyles} {...props} />}
      rules={{
        ...registerConfig,
        validate: {
          noEmpty: (item) =>
            registerConfig && registerConfig.required ? item.value !== '' : true
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
