import QuestionIcon from '../Icon/Icons/question-circle.svg'
import DefaultIcon from '../Icon/Icons/earlybirds.svg'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  iconStyle: {
    width: '23px',
    height: '17px'
  }
}
const renderIcon = (iconProperties) => {
  console.log(iconProperties)
  switch (iconProperties.name) {
    case 'question-circle':
      return (
        <QuestionIcon
          sx={styles.iconStyle}
          aria-label='logos'
          {...iconProperties}
        />
      )
    default:
      return (
        <DefaultIcon
          sx={styles.iconStyle}
          aria-label='logos'
          {...iconProperties}
        />
      )
  }
}

const Logo = (props) => {
  return (
    <div data-event='click focus' data-tip='custom show'>
      {renderIcon(props.icon)}
    </div>
  )
}

export default Logo
