/** @jsxRuntime classic */

import React, { useId } from 'react'
import { useThemeUI } from 'theme-ui'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

const Select = ({
  control,
  name,
  onChange = undefined,
  unregister,
  defaultValue,
  placeholder,
  registerConfig,
  label,
  options,
  ...props
}) => {
  const { theme } = useThemeUI()
  const selectStyles = {
    option: {},
    clearIndicator: {},
    container: {},
    control: () => ({}),
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
    if (
      theme &&
      theme.forms &&
      theme.forms.select &&
      theme.forms.select[property]
    ) {
      selectStyles[property] =
        theme && theme.forms && theme.forms.select[property]
      customStyles[property] = (provided, state) => {
        if (state.isDisabled) {
          return {
            ...provided,
            ...theme.forms.select[property].isDisabled
          }
        }
        if (state.isSelected) {
          return {
            ...provided,
            ...theme.forms.select[property].isSelected
          }
        }
        if (state.isFocused) {
          return {
            ...provided,
            ...theme.forms.select[property].isFocused
          }
        }
        return {
          ...provided,
          ...theme.forms.select[property]
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
      render={({ field: { onChange } }) => {
        return (
          <ReactSelect
            id={useId()}
            aria-label={label}
            styles={customStyles}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            {...props}
          />
        )
      }}
      rules={{
        ...registerConfig,
        validate: {
          noEmpty: (item) =>
            registerConfig && registerConfig.required ? item.value !== '' : true
        }
      }}
      name={name}
      defaultValue={defaultValue}
    />
  )
}

export default Select
