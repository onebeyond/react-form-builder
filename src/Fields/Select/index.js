/** @jsxRuntime classic */

import React from 'react'
import { Controller } from 'react-hook-form'
import { useThemeUI } from 'theme-ui'
import ReactSelect from 'react-select'

const Select = ({
  register,
  control,
  setValue,
  name,
  onChange = undefined,
  unregister,
  defaultValue,
  registerConfig,
  label,
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

  const customStyles = {}

  Object.keys(selectStyles).map((property) => {
    if (theme && theme.select && theme.select[property]) {
      selectStyles[property] = theme.select[property]
      customStyles[property] = (provided, state) => {
        if (state.isDisabled) {
          return {
            ...provided,
            ...theme.select[property].isDisabled
          }
        }
        if (state.isSelected) {
          return {
            ...provided,
            ...theme.select[property].isSelected
          }
        }
        if (state.isFocused) {
          return {
            ...provided,
            ...theme.select[property].isFocused
          }
        }
        return {
          ...provided,
          ...theme.select[property]
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
    <Controller
      control={control}
      onChange={onChange}
      render={({ field: { onChange, value } }) => (
        <ReactSelect
          aria-label={label}
          onChange={onChange}
          styles={customStyles}
          value={value}
          {...props}
        />
      )}
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
