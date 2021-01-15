/** @jsx jsx */
import { jsx } from 'theme-ui'

export { default as ExampleTheme } from './theme'

export const ExampleComponent = ({ text }) => {
  return (
    <div
      sx={{
        fontWeight: 'bold',
        fontSize: 4,
        color: 'primary'
      }}
    >
      Example Component: {text}
    </div>
  )
}
