import React from 'react'

import { Button, Input, Label, Checkbox, Select } from 'react-form-builder'

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
      <Select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </Select>
    </>
  )
}

export default App
