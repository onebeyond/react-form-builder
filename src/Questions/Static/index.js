/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import Label from '../../Fields/Label'

const QuestionStatic = ({ question, useForm }) => {
  const { register } = useForm

  return (
    <div key={question.name} sx={{ display: 'none' }}>
      <Label htmlFor={question.name}>
        <Checkbox
          id={question.name}
          name={question.name}
          defaultChecked={question.defaultChecked}
          ref={register({
            ...question.registerConfig
          })}
        />
      </Label>
    </div>
  )
}

export default QuestionStatic
