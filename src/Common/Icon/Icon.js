/** @jsx jsx */
/** @jsxRuntime classic */
import QuestionIcon from './Icons/QuestionIcon'
import { jsx } from 'theme-ui'
import style from './icon.module.css'

const Icon = (props) => {
  const { name, ...iconProperties } = props.icon
  const { config, textStyle } = props.tooltip

  return (
    <div className={style.tooltip}>
      {{
        'question-circle': <QuestionIcon {...iconProperties} />
      }[name] || <p>Icon Not found</p>}
      <div className={style.top} style={{ ...config }}>
        <p sx={{ ...textStyle }}>{props.tooltip.text}</p>
      </div>
    </div>
  )
}

export default Icon
