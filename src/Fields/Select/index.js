/** @jsxRuntime classic */

import React from 'react'
import { Image, useThemeUI } from 'theme-ui'
import { Controller } from 'react-hook-form'
import ReactSelect, { components } from 'react-select'

const DropdownIndicator = (props) => {
  const { menuIsOpen, arrows } = props.selectProps

  if (arrows && (arrows.up || arrows.down)) {
    const { up, down, width, height } = arrows

    return (
      <components.DropdownIndicator {...props}>
        {menuIsOpen ? (
          <Image
            alt='Select arrow up'
            src={up || down}
            width={width || 16}
            height={height || 16}
          />
        ) : (
          <Image
            alt='Select arrow up'
            src={down || up}
            width={width || 16}
            height={height || 16}
          />
        )}
      </components.DropdownIndicator>
    )
  }

  return <components.DropdownIndicator {...props} />
}

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
  arrows,
  'data-haserrors': haserrors,
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

  Object.keys(selectStyles).forEach((property) => {
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
  }, [unregister, name])

  return (
    <Controller
      control={control}
      render={({ field: { onChange } }) => {
        return (
          <ReactSelect
            aria-label={label}
            className={haserrors ? 'error-select' : ''}
            styles={customStyles}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            arrows={arrows}
            components={{ DropdownIndicator }}
            defaultValue={defaultValue}
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
