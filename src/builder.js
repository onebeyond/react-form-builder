/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react'
import { jsx } from 'theme-ui'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

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
import QuestionMultipleCheckboxes from './Questions/MultipleCheckboxes'
import QuestionMarkdown from './Questions/Markdown'
import QuestionSelectImage from './Questions/SelectImage'
import QuestionCounty from './Questions/County'
import QuestionGender from './Questions/Genre'
import QuestionAge from './Questions/Age'
import QuestionAutocomplete from './Questions/Autocomplete'
import QuestionImageInput from './Questions/ImageInput'

import styles from './styles.js'

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

  const RECAPTCHA = {
    KEY: 'random',
    SECRET: 'random',
  }

  const recaptchaRef = React.createRef(null)

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return
    }

    recaptchaRef.current.reset()
    // onSubmitForm() // TODO: fix this call to pass the formatted data
  }

  useEffect(() => {
    if (formErrors && formErrors.length > 0) {
      formErrors.forEach((error) => {
        useFormObj.setError(error.field, { type: error.type })
      })
    }
  }, [formErrors, useFormObj])

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
      image_input: (
        <QuestionImageInput useForm={useFormObj} question={question} />
      ),
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
        <>
          <QuestionRadio
            useForm={useFormObj}
            question={question}
            onLinkOpen={onLinkOpen}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
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
      ),
      recaptcha: (
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={RECAPTCHA.KEY}
          onChange={onReCAPTCHAChange}
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

  const formatData = async (data) => {
    await Promise.all(
      Object.keys(data).map(async (key) => {
        if (data[key] instanceof Date) {
          data[key] = data[key].toISOString()
        }
        if (data[key] instanceof FileList) {
          const reader = new FileReader()
          try {
            const encodedFile = await new Promise((resolve, reject) => {
              reader.onload = (event) => {
                return resolve(event.target.result)
              }
              reader.onerror = (event) => {
                return reject(event)
              }

              reader.readAsDataURL(data[key][0])
            })
            data[key] = encodedFile
          } catch {
            useFormObj.setError(key, { type: 'encodingError' })
          }
        }
      })
    )
    return data
  }

  const onSubmit = async (data) => {
    if (isLoading) return
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef.current.execute()
    // TODO: put a conditional here
    onSubmitForm(await formatData(data))
  }

  return (
    <>
      <form
        id={idForm}
        sx={{
          variant:
            form && form.layout
              ? 'forms.container.' + (form && form.layout)
              : 'forms.container',
          pointerEvents: isLoading ? 'none' : 'auto'
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
                      display:
                        Object.keys(errors).length !== 0 ? 'flex' : 'none'
                    }}
                    aria-live='assertive'
                  >
                    {form.accessibilityError}
                  </div>
                )}
                <Button
                  sx={styles.fitContent}
                  key={cfa.caption}
                  disabled={isLoading}
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
      <DevTool control={useFormObj.control} />
    </>
  )
}

export default FormBuilder
