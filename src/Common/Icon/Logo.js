import QuestionIcon from '../Icon/Icons/question-circle.svg'
import DefaultIcon from '../Icon/Icons/early-birds.svg'
/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

const styles = {
  iconStyle: {
    width: '23px',
    height: '17px'
  }
}
const Icon = ({ name, properties }) => {
  switch (name) {
    case 'question-circle':
      return (
        <QuestionIcon
          data-testid='iconId'
          sx={styles.iconStyle}
          aria-label='logos'
          {...properties}
        />
      )
    default:
      return (
        <DefaultIcon
          data-testid='defaultIconId'
          sx={styles.iconStyle}
          aria-label='logos'
          {...properties}
        />
      )
  }
}

const Logo = (props) => {
  const { name, ...iconProperties } = props.icon

  return (
    <div data-event='click focus' data-tip='custom show'>
      <Icon name={name} properties={iconProperties} />
    </div>
  )
}

export default Logo
