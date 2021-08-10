/** @jsx jsx */
/** @jsxRuntime classic */
import QuestionIcon from './Icons/QuestionIcon'
import { jsx } from 'theme-ui'

const styles = {
  tooltipArrow: {
    content: '""',
    position: 'absolute',
    width: '12px',
    height: '12px',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    boxShadow: ' 0 1px 8px rgba(0, 0, 0, 0.5)'
  },
  tooltip: {
    display: 'inline-block',
    position: 'relative',
    textAlign: 'left',
    '&:hover': {
      div: {
        display: 'block'
      }
    },
    div: {
      minWidth: '250px',
      top: '-20px',
      left: '50%',
      transform: 'translate(-50%, -100%)',
      padding: '10px 20px',
      color: 'white',
      backgroundColor: 'black',
      fontWeight: 'normal',
      fontSize: '13px',
      borderRadius: '8px',
      position: 'absolute',
      zIndex: '99999999',
      boxSizing: 'border-box',
      boxShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
      display: 'none'
    },
    i: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-12px',
      width: '24px',
      height: '12px',
      overflow: 'hidden',
      '::after': {
        content: "''",
        position: 'absolute',
        width: '12px',
        height: '12px',
        left: '50%',
        transform: 'translate(-50%,-50%) rotate(45deg)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.5)'
      }
    }
  }
}

const Icon = ({ icon, tooltip, ...props }) => {
  const { name, ...iconProperties } = icon
  const { config, textStyle, text } = tooltip

  return (
    <div
      sx={{
        ...styles.tooltip
      }}
    >
      {{
        'question-circle': <QuestionIcon {...iconProperties} />
      }[name] || <p>Icon Not found</p>}
      <div style={{ ...config }}>
        <p sx={{ ...textStyle }}>{text}</p>
        <i
          sx={{
            '::after': {
              backgroundColor: (config && config.backgroundColor) || 'black'
            }
          }}
        />
      </div>
    </div>
  )
}

export default Icon
