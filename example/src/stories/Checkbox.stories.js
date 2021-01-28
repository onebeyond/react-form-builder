import React from 'react';
import { Checkbox } from 'react-form-builder'


export default {
  title: 'Form/Checkbox',
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} ></Checkbox>

export const Primary = Template.bind({});
Primary.args = { checked: true };
