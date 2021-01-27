/** @jsx jsx */
/** @jsxRuntime classic */
import Button from './Fields/Button'
import QuestionCheckbox from './Questions/Checkbox'

import QuestionRadio from './Questions/Radio'
import QuestionSelect from './Questions/Select'
import QuestionInput from './Questions/Input'

import React from 'react'
import { jsx } from 'theme-ui'
import { useForm } from 'react-hook-form'

const styles = {
  fitContent: {
    width: 'fit-content'
  }
}

const FormBuilder = ({
  onSubmit: onSubmitForm,
  idForm = '',
  form,
  currentPath
}) => {
  const { register, handleSubmit, errors, watch } = useForm()

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
        <QuestionSelect
          watch={watch}
          errors={errors}
          register={register}
          question={question}
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
