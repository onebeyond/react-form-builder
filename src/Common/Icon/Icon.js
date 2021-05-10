import QuestionIcon from './Icons/QuestionIcon'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const Icon = (props) => {
  const { name, ...iconProperties } = props.icon

  return (
    <div data-event='click focus' data-tip='custom show'>
      {{
        'question-circle': <QuestionIcon {...iconProperties} />
      }[name] || <p>Icon Not found</p>}
    </div>
  )
}

export default Icon
