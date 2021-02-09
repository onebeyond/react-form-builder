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
  markDown: {
    fontFamily: 'regular',
    width: ['90%', '95%', '95%'],
    p: {
      margin: 0
    },
    a: {
      color: '#31b112'
    }
  }
}

const QuestionCheckbox = ({
  question,
  errors,
  form,
  currentPath,
  register
}) => {
  return (
    <div
        sx={{
        ...(question.isFullWidth && styles.fullWidth),
        }}
    >
        {question.label && <Label>{question.label}</Label>}
        <div sx={{ variant: 'forms.checkbox.' + form.layout }}>
        {question.config &&
            question.config.options.map((option) => {
            return (
                <div sx={styles.centerStyle} key={option.name}>
                <Label sx={styles.centerStyle}>
                    <Checkbox
                    sx={styles.checkboxMinWidth}
                    name={question.name}
                    value={option.name}
                    ref={register({
                        ...question.registerConfig,
                        validate: {
                        minimumLen: () =>
                            getValues()[question.name] &&
                            getValues()[question.name].length >=
                            question.registerConfig.minimumLen,
                        },
                    })}
                    ></Checkbox>
                    <ReactMarkdown
                    sx={styles.markDown}
                    source={option.label}
                    renderers={{
                        // eslint-disable-next-line react/display-name
                        link: ({ href, children }) => (
                        <Link href={href} target="_blank">
                            {children}
                        </Link>
                        ),
                    }}
                    />
                </Label>
                </div>
            )
            })}
        {errors[question.name] &&
            errors[question.name].type === 'required' && (
            <ErrorMessage
                sx={{
                gridColumn: 1,
                }}
                message={
                question.errorMessages &&
                question.errorMessages.required
                }
            ></ErrorMessage>
            )}
        {errors[question.name] &&
            errors[question.name].type === 'minimumLen' && (
            <ErrorMessage
                sx={{
                gridColumn: 1,
                }}
                message={
                question.errorMessages &&
                question.errorMessages.minimumLen
                }
            ></ErrorMessage>
            )}
        </div>
    </div>
  )
}

export default QuestionCheckbox


