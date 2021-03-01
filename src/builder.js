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
  form,
  idForm = '',
  isMobile,
  isoCode,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    watch,
    setValue,
    setError,
    clearErrors
  } = useForm()

  const QuestionsMap = (question) => {
    const CustomComponent = ({ component }) => component(question)

    return {
      box: props.customBox ? (
        <CustomComponent component={props.customBox} />
      ) : (
        <div sx={{ variant: 'forms.boxContainer' }}>
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
      input: props.customInput ? (
        <CustomComponent component={props.customInput} />
      ) : (
        <QuestionInput
          errors={errors}
          register={register}
          question={question}
        />
      ),
      select: props.customSelect ? (
        <CustomComponent component={props.customSelect} />
      ) : (
        <>
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
      country: props.customCountry ? (
        <CustomComponent component={props.customCountry} />
      ) : (
        <QuestionCountry
          watch={watch}
          errors={errors}
          register={register}
          question={question}
          setValue={setValue}
          isMobile={isMobile}
        />
      ),
      checkbox: props.customCheckbox ? (
        <CustomComponent component={props.customCheckbox} />
      ) : (
        <QuestionCheckbox
          errors={errors}
          register={register}
          question={question}
          form={form}
          currentPath={currentPath}
        />
      ),
      radio: props.customRadio ? (
        <CustomComponent component={props.customRadio} />
      ) : (
        <QuestionRadio
          errors={errors}
          register={register}
          question={question}
        />
      ),
      date: props.customDate ? (
        <CustomComponent component={props.customDate} />
      ) : (
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
      phone: props.customPhone ? (
        <CustomComponent component={props.customPhone} />
      ) : (
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
      multiple_checkboxes: props.customMultipleCheckboxes ? (
        <CustomComponent component={props.customMultipleCheckboxes} />
      ) : (
        <QuestionMultipleCheckboxes
          errors={errors}
          register={register}
          question={question}
          getValues={getValues}
          form={form}
        />
      ),
      multiple_images_checkboxes: props.customMultipleImageCheckboxes ? (
        <CustomComponent component={props.customMultipleImageCheckboxes} />
      ) : (
        <QuestionMultipleImageCheckboxes
          errors={errors}
          register={register}
          question={question}
          getValues={getValues}
          form={form}
        />
      ),
      markdown: props.customMarkdown ? (
        <CustomComponent component={props.customMarkdown} />
      ) : (
        <QuestionMarkdown
          question={question}
          form={form}
          currentPath={currentPath}
        />
      )
    }
  }

  function ConditionalQuestion(question) {
    return (dependentQuestion, i) => {
      const nestedQuestion = dependentQuestion && dependentQuestion.question

      const getConditions = () =>
        dependentQuestion.conditions || dependentQuestion.condition

      const conditionValue = watch(question.name)

      const getFormattedValue = () =>
        conditionValue && conditionValue.value
          ? conditionValue.value
          : conditionValue

      return (
        getConditions().includes(getFormattedValue()) && (
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
