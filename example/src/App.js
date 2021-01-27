import React from 'react'

import { Button, Input, Label, Checkbox } from 'react-form-builder'

const App = () => {
  return (
    <>
      <Button caption='Button example'></Button>
      <Input></Input>
      <Label>An important title field here *</Label>
      <Label>
        <Checkbox />
        Select an option
      </Label>
    </>
  )
}

export default App
