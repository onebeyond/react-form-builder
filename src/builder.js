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
import React from 'react'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'
import QuestionMultipleCheckboxes from './Questions/MultipleCheckboxes'
import QuestionMultipleImageCheckboxes from './Questions/MultipleImageCheckboxes'

const styles = {
  fitContent: {
    width: 'fit-content'
  }
}

const FormBuilder = ({
  onSubmit: onSubmitForm,
  currentPath,
  form,
  idForm = '',
  isMobile,
  isoCode
}) => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    clearErrors
  } = useForm()

  const QuestionsMap = (question) => {
    return {
      input: (
        <QuestionInput
          errors={errors}
          register={register}
          question={question}
        />
      ),
      select: (
        <>
          <Label>{question.label}</Label>
          <QuestionSelect
            watch={watch}
            errors={errors}
            register={register}
            question={question}
            setValue={setValue}
          />
          {question.dependentQuestions &&
            question.dependentQuestions.map(ConditionalQuestion(question))}
        </>
      ),
      country: (
        <QuestionCountry
          watch={watch}
          errors={errors}
          register={register}
          question={question}
          setValue={setValue}
          isMobile={isMobile}
        />
      ),
      checkbox: (
        <QuestionCheckbox
          errors={errors}
          register={register}
          question={question}
          form={form}
          currentPath={currentPath}
        />
      ),
      radio: (
        <QuestionRadio
          errors={errors}
          register={register}
          question={question}
        />
      ),
      date: (
        <QuestionDate
          errors={errors}
          register={register}
          question={question}
          watch={watch}
          setValue={setValue}
          dateFormat='dd-MM-yyyy'
          isBirthDate={false}
          isMobile={isMobile}
        />
      ),
      phone: (
        <QuestionPhone
          errors={errors}
          register={register}
          question={question}
          watch={watch}
          setValue={setValue}
          isMobile={isMobile}
          setError={setError}
          clearErrors={clearErrors}
          isoCode={isoCode}
        />
      ),
      multiple_checkboxes: (
        <QuestionMultipleCheckboxes
          errors={errors}
          register={register}
          question={question}
          form={form}
        />
      ),
      multiple_images_checkboxes: (
        <QuestionMultipleImageCheckboxes
          errors={errors}
          register={register}
          question={question}
          form={form}
        />
      )
    }
  }

  function ConditionalQuestion(question) {
    return (dependentQuestion, i) => {
      const nestedQuestion = dependentQuestion && dependentQuestion.question

      const getConditions = () =>
        dependentQuestion.conditions || dependentQuestion.condition

      return (
        getConditions().includes(watch(question.name)) && (
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
                  ConditionalQuestion(nestedQuestion)
                )
              : null}
          </React.Fragment>
        )
      )
    }
  }

  const onSubmit = (data) => {
    onSubmitForm(data)
  }

  return (
    <form id={idForm} onSubmit={handleSubmit(onSubmit)}>
      <div sx={{ variant: 'forms.container.' + (form && form.layout) }}>
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
          form.callForAction.map((cfa) => {
            return (
              <Button
                sx={styles.fitContent}
                key={cfa.caption}
                caption={cfa.caption}
                type={cfa.type}
                {...cfa}
              />
            )
          })}
      </div>
    </form>
  )
}

export default FormBuilder
