import React from 'react';
import { Button } from 'react-form-builder'


export default {
  title: 'Form/Button',
  component: Button,
};

const Template = (args) => <Button {...args} ></Button>

export const Primary = Template.bind({});
Primary.args = { caption: 'Click me!' };
