import React from 'react';
import { Radio } from 'react-form-builder'


export default {
  title: 'Form/Radio',
  component: Radio,
};

const Template = (args) => <Radio {...args} ></Radio>

export const Primary = Template.bind({});
Primary.args = { checked: false };
