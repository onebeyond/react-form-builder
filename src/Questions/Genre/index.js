/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'
import GenderData from './data/gender'
import DeuschGenderData from './data/de'
import SpanishGenderData from './data/es'
import FrenchGenderData from './data/fr'
import SwedishGenderData from './data/se'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import ErrorMessage from '../../Fields/Error'

const gendersMapData = {
  es: SpanishGenderData,
  fr: FrenchGenderData,
  de: DeuschGenderData,
  se: SwedishGenderData
}

const QuestionGender = ({ question, useForm, language, ...props }) => {
  const { errors, register, setValue, unregister, trigger } = useForm

  const getOptions = (question) =>
    question.config.options.map((option) => ({
      value: option.value,
      label: option.label
    }))

  const genderData =
    question.config && question.config.options
      ? getOptions(question)
      : language && gendersMapData[language]
      ? gendersMapData[language]
      : GenderData

  const renderGenderOptions = (items) =>
    items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))

  return (
    <div
      data-testid='question-gender'
      sx={{
        variant: question.id
          ? 'forms.genderContainer.' + question.id
          : 'forms.genderContainer'
      }}
    >
      {question.label && (
        <Label htmlFor={question.name} data-testid='gender-label'>
          {question.label}
        </Label>
      )}
      <Select
        onChange={() => trigger(question.name)}
        id={question.name}
        key={question.name}
        name={question.name}
        options={genderData}
        isSearchable={false}
        register={register}
        registerConfig={question.registerConfig}
        setValue={setValue}
        placeholder={question.placeholder}
        unregister={unregister}
        label={question.label}
        {...props}
      >
        {renderGenderOptions(genderData)}
      </Select>
      {errors[question.name] &&
        (errors[question.name].type === 'required' ||
          errors[question.name].type === 'noEmpty') && (
          <ErrorMessage
            name={question.name}
            message={question.errorMessages && question.errorMessages.required}
          />
        )}
    </div>
  )
}

export default QuestionGender
