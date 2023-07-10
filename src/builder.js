/** @jsxRuntime classic */
/** @jsx jsx */
import Button from './Fields/Button'
import Label from './Fields/Label'
import QuestionCheckbox from './Questions/Checkbox'
import QuestionRadio from './Questions/Radio'
import QuestionSelect from './Questions/Select'
import QuestionCountry from './Questions/Country'
import QuestionInput from './Questions/Input'
import QuestionTextarea from './Questions/Textarea'
import QuestionDate from './Questions/Date'
import QuestionPhone from './Questions/Phone'
import QuestionStatic from './Questions/Static'
import React, { useEffect } from 'react'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'
import QuestionMultipleCheckboxes from './Questions/MultipleCheckboxes'
import QuestionMarkdown from './Questions/Markdown'
import QuestionSelectImage from './Questions/SelectImage'
import QuestionCounty from './Questions/County'
import QuestionGender from './Questions/Genre'
import QuestionAge from './Questions/Age'
import QuestionAutocomplete from './Questions/Autocomplete'

const styles = {
  fitContent: {
    width: 'fit-content'
  },
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  }
}

const FormBuilder = ({
  onSubmit: onSubmitForm,
  currentPath,
  isLoading,
  form,
  idForm = '',
  isMobile,
  isoCode,
  onLinkOpen,
  countryAndRegionsData,
  language,
  formErrors = [],
  ...props
}) => {
  const useFormObj = useForm({ defaultValues: { formatDate: '' } })

  useEffect(() => {
    if (formErrors && formErrors.length > 0) {
      formErrors.forEach((error) => {
        useFormObj.setError(error.field, { type: error.type })
      })
    }
  }, [formErrors])

  const {
    formState: { errors }
  } = useFormObj

  const QuestionsMap = (question) => {
    return {
      box: (
        <div
          sx={{ variant: 'forms.boxContainer' }}
          data-testid='question-builder'
        >
          {question.label && <Label>{question.label}</Label>}
          {question &&
            Array.isArray(question.children) &&
            question.children.map((question, i) => {
              return (
                <React.Fragment key={i}>
                  {QuestionsMap(question)[question.type] ||
                    QuestionsMap(question).default}
                </React.Fragment>
              )
            })}
        </div>
      ),
      input: <QuestionInput useForm={useFormObj} question={question} />,
      password: <QuestionInput useForm={useFormObj} question={question} />,
      textarea: <QuestionTextarea useForm={useFormObj} question={question} />,
      select: (
        <>
          <QuestionSelect useForm={useFormObj} question={question} />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      select_images: (
        <>
          <QuestionSelectImage
            useForm={useFormObj}
            question={question}
            form={form}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      country: (
        <>
          <QuestionCountry
            useForm={useFormObj}
            question={question}
            countryAndRegionsData={countryAndRegionsData}
            language={language}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      county: <QuestionCounty useForm={useFormObj} question={question} />,
      gender: (
        <>
          <QuestionGender
            useForm={useFormObj}
            question={question}
            language={language}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      age: (
        <>
          <QuestionAge useForm={useFormObj} question={question} />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      autocomplete: (
        <>
          <QuestionAutocomplete useForm={useFormObj} question={question} />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      checkbox: (
        <QuestionCheckbox
          useForm={useFormObj}
          question={question}
          form={form}
          onLinkOpen={onLinkOpen}
        />
      ),
      static: (
        <QuestionStatic useForm={useFormObj} question={question} form={form} />
      ),
      radio: (
        <QuestionRadio
          useForm={useFormObj}
          question={question}
          onLinkOpen={onLinkOpen}
        />
      ),
      date: (
        <QuestionDate
          useForm={useFormObj}
          question={question}
          language={language}
          isMobile={isMobile}
        />
      ),
      phone: (
        <QuestionPhone
          useForm={useFormObj}
          question={question}
          isMobile={isMobile}
          isoCode={isoCode}
        />
      ),
      multiple_checkboxes: (
        <>
          <QuestionMultipleCheckboxes
            useForm={useFormObj}
            question={question}
            form={form}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(
                question.dependentQuestions,
                question.name,
                question.type
              )
            )}
        </>
      ),
      markdown: (
        <QuestionMarkdown
          useForm={useFormObj}
          question={question}
          form={form}
          currentPath={currentPath}
          onLinkOpen={onLinkOpen}
        />
      )
    }
  }

  function ConditionalQuestion(question, name, preQuestionType) {
    return (dependentQuestion, i) => {
      const nestedQuestion = dependentQuestion && dependentQuestion.question

      const getConditions = () =>
        dependentQuestion.conditions || dependentQuestion.condition

      const conditionValue = useFormObj.watch(name)
      const getFormattedValue = () =>
        conditionValue && conditionValue.value
          ? conditionValue.value
          : conditionValue

      const renderComponent = () => (
        <React.Fragment key={i}>
          {
            QuestionsMap(dependentQuestion.question)[
              dependentQuestion.question.type
            ]
          }

          {nestedQuestion.dependentQuestions
            ? nestedQuestion.dependentQuestions.map(
                ConditionalQuestion(
                  nestedQuestion.question,
                  dependentQuestion.name
                )
              )
            : null}
        </React.Fragment>
      )

      if (preQuestionType === 'multiple_checkboxes') {
        const getMultiFormattedValue = () =>
          conditionValue && conditionValue.value
            ? conditionValue.value
            : conditionValue || []

        return getMultiFormattedValue() &&
          getMultiFormattedValue().some((e) => getConditions().includes(e))
          ? renderComponent()
          : null
      }

      return getConditions().includes(getFormattedValue())
        ? renderComponent()
        : null
    }
  }

  const formatData = (data) => {
    Object.keys(data).map((key) => {
      if (data[key] instanceof Date) {
        data[key] = data[key].toISOString()
      }
    })
    return data
  }

  const onSubmit = (data) => {
    onSubmitForm(formatData(data))
  }

  return (
    <form
      id={idForm}
      sx={{
        variant:
          form && form.layout
            ? 'forms.container.' + (form && form.layout)
            : 'forms.container'
      }}
      onSubmit={useFormObj.handleSubmit(onSubmit)}
      {...props}
    >
      {form &&
        Array.isArray(form.questions) &&
        form.questions.map((question, i) => {
          return (
            <React.Fragment key={i}>
              {QuestionsMap(question)[question.type] ||
                QuestionsMap(question).default}
            </React.Fragment>
          )
        })}
      {form &&
        form.callForAction &&
        form.callForAction.map((cfa, key) => {
          return (
            <div sx={{ variant: 'forms.submitContainer' }} key={key}>
              {form.accessibilityError && (
                <div
                  className='visuallyhidden'
                  sx={{
                    variant: 'text.accessibilityError',
                    display: Object.keys(errors).length !== 0 ? 'flex' : 'none'
                  }}
                  aria-live='assertive'
                >
                  {form.accessibilityError}
                </div>
              )}
              <Button
                sx={styles.fitContent}
                key={cfa.caption}
                isLoading={isLoading}
                id={cfa.id}
                caption={cfa.caption}
                type={cfa.type}
                {...cfa}
              />
            </div>
          )
        })}
    </form>
  )
}

export default FormBuilder
