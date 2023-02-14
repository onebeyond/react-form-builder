/** @jsxRuntime classic */

import React from 'react'

import { useThemeUI } from 'theme-ui'
import { RHFInput } from 'react-hook-form-input'
import ReactSelect from 'react-select'
import AsyncSelect from 'react-select/async';

const Select = ({
  register,
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
    <RHFInput
      onChange={onChange}
      as={<AsyncSelect aria-label={label} styles={customStyles} {...props} />}
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
