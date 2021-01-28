import React from 'react';
import { Input } from 'react-form-builder'


export default {
  title: 'Form/Input',
  component: Input,
};

const Template = (args) => <Input {...args} ></Input>

export const Primary = Template.bind({});
Primary.args = { placeholder: 'placeholder', value:'' };
