/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

import ReactMarkdown from 'react-markdown'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  selectOption: {
    background: 'bg',
    color: 'black'
  },
  checkbox: {
    width: '0px'
  },
  imageLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ['0px', '10px'],
    border: '1px solid #191a19',
    minHeight: '210px',
    width: '125px',
    cursor: 'pointer',
    p: {
      textAlign: 'center'
    }
  },
  border: { border: '1px solid #b70d21' },
  markDown: {
    fontFamily: 'regular',
    width: ['90%', '95%', '95%']
  }
}

const QuestionSelectImage = ({ component, form, question, useForm }) => {
  const { getValues, errors, register, watch, setValue } = useForm
  const CustomComponent = ({ component }) => component(question, useForm)

  const isInputChecked = (option) => {
    const values = getValues()[question.name]

    const findOption = values?.some((value) => value === option.value)
    return findOption
  }

  const onClickOption = (value) => {
    if (question.registerConfig.maximumLen === 1)
      return setValue([question.name], value)

    setValue((oldValues) => {
      if (oldValues.contains(value)) {
        return oldValues.filter((oldValue) => oldValue !== value)
      }
      return [...oldValues, value]
    })
  }

  return component ? (
    <CustomComponent component={component} />
  ) : (
    <div
      sx={{
        ...(question.isFullWidth && styles.fullWidth),
        variant: question.id
          ? 'forms.selectImagesContainer.' + question.id
          : 'forms.selectImagesContainer'
      }}
    >
      {question.label && <Label>{question.label}</Label>}
      <div
        sx={{
          variant: question.checkboxId
            ? 'forms.selectImages' + question.checkboxId
            : 'forms.selectImages'
        }}
      >
        {question.config &&
          question.config.options.map((option) => {
            watch(option.name)
            return (
              <div
                sx={{ variant: 'forms.selectImages.checksContainer' }}
                key={option.name}
              >
                <Label sx={{ variant: 'forms.selectImagesInput' }}>
                  <Checkbox
                    data-testid='question-singleCheckbox'
                    sx={styles.checkbox}
                    id={option.name}
                    name={question.name}
                    value={option.value}
                    onClick={(ev) => onClickOption(ev.target.value)}
                    ref={register({
                      ...question.registerConfig,
                      validate: {
                        maximumLen: question.registerConfig.maximumLen
                          ? () =>
                              getValues()[question.name] &&
                              getValues()[question.name].length <=
                                question.registerConfig.maximumLen
                          : () => true
                      }
                    })}
                  />
                  {option.src ? (
                    <div
                      sx={{
                        ...styles.imageLabel,
                        ...(isInputChecked(option) && styles.border)
                      }}
                    >
                      <img
                        src={option.src}
                        sx={{ variant: 'images.selectImages' }}
                      />
                      <ReactMarkdown
                        sx={styles.markDown}
                        source={option.label}
                        renderers={{
                          // eslint-disable-next-line react/display-name
                          link: ({ href, children }) => (
                            <Link href={href} target='_blank'>
                              {children}
                            </Link>
                          )
                        }}
                      />
                    </div>
                  ) : (
                    <ReactMarkdown
                      sx={styles.markDown}
                      source={option.label}
                      renderers={{
                        // eslint-disable-next-line react/display-name
                        link: ({ href, children }) => (
                          <Link href={href} target='_blank'>
                            {children}
                          </Link>
                        )
                      }}
                    />
                  )}
                </Label>
              </div>
            )
          })}
      </div>
      {errors[question.name] && errors[question.name].type && (
        <ErrorMessage
          sx={{
            gridColumn: 1
          }}
          name={question.name}
          message={
            question.errorMessages &&
            question.errorMessages[errors[question.name].type]
          }
        />
      )}
    </div>
  )
}

export default QuestionSelectImage
