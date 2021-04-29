import React from 'react'
import ReactTooltip from 'react-tooltip'

const FBtooltip = (props) => {
  return (
    <ReactTooltip
      globalEventOff='click'
      effect='solid'
      {...props.tooltip.config}
    >
      <p>{props.tooltip.text}</p>
    </ReactTooltip>
  )
}

export default FBtooltip
