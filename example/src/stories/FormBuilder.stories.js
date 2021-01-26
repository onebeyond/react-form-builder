import React from 'react';
import FormBuilder from './FormBuilder';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

export default {
  title: 'FormBuilder/FormBuilder',
  component: FormBuilder,
};

const Template = (args) => <FormBuilder {...args} />;

export const First = Template.bind({});
First.args = { json: 'Hello world form builder 😄' };
