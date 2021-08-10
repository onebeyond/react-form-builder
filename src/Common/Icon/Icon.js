/** @jsx jsx */
/** @jsxRuntime classic */
import QuestionIcon from './Icons/QuestionIcon'
import { jsx } from 'theme-ui'
import style from './icon.module.css'
const styles = {
  tooltipArrow: {
    content: '""',
    position: 'absolute',
    width: '12px',
    height: '12px',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    boxShadow: ' 0 1px 8px rgba(0, 0, 0, 0.5)'
  }
}
const Icon = ({ icon, tooltip, ...props }) => {
  const { name, ...iconProperties } = icon
  const { config, textStyle, text } = tooltip

  return (
    <div className={style.tooltip}>
      {{
        'question-circle': <QuestionIcon {...iconProperties} />
      }[name] || <p>Icon Not found</p>}
      <div className={style.top} style={{ ...config }}>
        <p sx={{ ...textStyle }}>{text}</p>
        <i
          sx={{
            '::after': {
              ...styles.tooltipArrow,
              backgroundColor: config.backgroundColor || 'black'
            }
          }}
        />
      </div>
    </div>
  )
}

export default Icon
