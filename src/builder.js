/** @jsx jsx */
/** @jsxRuntime classic */
import Button from './Fields/Button'
import Label from './Fields/Label'
import QuestionCheckbox from './Questions/Checkbox'
import QuestionRadio from './Questions/Radio'
import QuestionSelect from './Questions/Select'
import QuestionCountry from './Questions/Country'
import QuestionInput from './Questions/Input'
import QuestionDate from './Questions/Date'
import QuestionPhone from './Questions/Phone'
import QuestionStatic from './Questions/Static'
import React from 'react'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'
import QuestionMultipleCheckboxes from './Questions/MultipleCheckboxes'
import QuestionMarkdown from './Questions/Markdown'

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
  ...props
}) => {
  const useFormObj = useForm({ defaultValues: { formatDate: '' } })
  const { errors } = useFormObj

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
      input: (
        <QuestionInput
          useForm={useFormObj}
          question={question}
          component={props.customInput}
        />
      ),
      select: (
        <>
          <QuestionSelect
            useForm={useFormObj}
            question={question}
            component={props.customSelect}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(
              ConditionalQuestion(question.dependentQuestions, question.name)
            )}
        </>
      ),
      country: (
        <QuestionCountry
          useForm={useFormObj}
          question={question}
          countryAndRegionsData={props.countryAndRegionsData}
          component={props.customCountry}
          language={props.language}
        />
      ),
      checkbox: (
        <QuestionCheckbox
          useForm={useFormObj}
          question={question}
          form={form}
          component={props.customCheckbox}
          onLinkOpen={props.onLinkOpen}
        />
      ),
      static: (
        <QuestionStatic useForm={useFormObj} question={question} form={form} />
      ),
      radio: (
        <QuestionRadio
          useForm={useFormObj}
          question={question}
          component={props.customRadio}
          onLinkOpen={props.onLinkOpen}
        />
      ),
      date: (
        <QuestionDate
          useForm={useFormObj}
          question={question}
          language={props.language}
          isMobile={isMobile}
          component={props.customDate}
        />
      ),
      phone: (
        <QuestionPhone
          useForm={useFormObj}
          question={question}
          isMobile={isMobile}
          isoCode={isoCode}
          component={props.customPhone}
        />
      ),
      multiple_checkboxes: (
        <QuestionMultipleCheckboxes
          useForm={useFormObj}
          question={question}
          form={form}
          component={props.customMultipleCheckboxes}
        />
      ),
      markdown: (
        <QuestionMarkdown
          useForm={useFormObj}
          question={question}
          form={form}
          currentPath={currentPath}
          component={props.customMarkdown}
          onLinkOpen={props.onLinkOpen}
        />
      )
    }
  }

  function ConditionalQuestion(question, name) {
    return (dependentQuestion, i) => {
      const nestedQuestion = dependentQuestion && dependentQuestion.question

      const getConditions = () =>
        dependentQuestion.conditions || dependentQuestion.condition

      const conditionValue = useFormObj.watch(name)
      const getFormattedValue = () =>
        conditionValue && conditionValue.value
          ? conditionValue.value
          : conditionValue

      return getConditions().includes(getFormattedValue()) ? (
        <React.Fragment key={i}>
          <div
            sx={{
              ...(dependentQuestion.question.isFullWidth && styles.fullWidth)
            }}
          >
            {
              QuestionsMap(dependentQuestion.question)[
                dependentQuestion.question.type
              ]
            }
          </div>

          {nestedQuestion.dependentQuestions
            ? nestedQuestion.dependentQuestions.map(
                ConditionalQuestion(
                  nestedQuestion.question,
                  dependentQuestion.name
                )
              )
            : null}
        </React.Fragment>
      ) : null
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
    <form id={idForm} onSubmit={useFormObj.handleSubmit(onSubmit)}>
      <div
        sx={{
          variant: form.layout
            ? 'forms.container.' + (form && form.layout)
            : 'forms.container'
        }}
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
                  isLoading={isLoading}
                  id={cfa.id}
                  caption={cfa.caption}
                  type={cfa.type}
                  {...cfa}
                />
              </div>
            )
          })}
      </div>
    </form>
  )
}

export default FormBuilder
