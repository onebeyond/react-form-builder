# react-form-builder

> React form builder using json schema

[![NPM](https://img.shields.io/npm/v/react-form-builder.svg)](https://www.npmjs.com/package/@guidesmiths/react-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
## Install

```bash
npm install --save @guidesmiths/react-form-builder
```

## Usage

```jsx
import React, { useEffect, useState } from 'react'
import forms from './forms.json'
import FormBuilder from 'react-form-builder'

const onSubmitForm = (data) => {
    !isLoading &&
      alert(
        `You have submitted your form correctly Data: ${'\n'} ${JSON.stringify(
          data,
          null,
          2
        )}`
      )
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

const Example = () => {
  render() {
   <FormBuilder
        idForm={forms.contact.id}
        form={forms.contact}
        onSubmit={onSubmitForm}
        isoCode='ES'
        onLinkOpen={onLinkOpen}
        isLoading={isLoading}
      />
  }
}
```

# Live Playground

For examples of react-form-builder in action go to:

http://guidesmiths-react-form-builder.s3-website.eu-central-1.amazonaws.com/


# Formbuilder options

| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   idForm*	|  Id for the form  	|  string 	|  '' 	|
|   form*	|  The json with the questions to create 	|  json  	|   -	|
|   onSubmit*    |   Action to be realised "onSubmit" form    |    function       |   -    |
|   language	| Shortcut with the language  to render components in multiple languages (`country`,`date`) <br /> <br /> Available laguages: `es`,`de`,`fr`,`en`  	| string   	|   en	|
|  isoCode      |   Isocode of the country to show as default in phone input |  string     | GB
|  isMobile      |   A boolean toggle is assigned to check if we are from a mobile port view | boolean    | false
|  countryAndRegionsData    |  Array of objects with the acronym(s) and the names of the countries that you want to display in the `countrySelect` (see example)   |   Array of objects    | -
|  onLinkOpen       |  function to be executed when there is a custom link  |  function     | -



##### CountryAndRegionsData example:
```yaml
[
  { "cn": "MyOwnCountry1", "cs": "MC1" },
  { "cn": "MyOwnCountry2", "cs": "MC2" },
  { "cn": "MyOwnCountry3", "cs": "MC3" },
  { "cn": "MyOwnCountry4", "cs": "MC4" }
]
```

# Questions

## Checkbox

| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Checkbox name  	|  string 	|  - 	|
|   type*   | Must be `checkbox`| string | - |
|   label	|  Text shown next to the checkbox. This text can be written in markdown style 	|  string  	|   ''	|
|   isFullWidth   |   Define if the field takes all the available width in the grid or not   |    boolean       |   false   |
|   defaultChecked    |   Checked component by default    |    boolean       |   false   |
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the checkbox is required  |  boolean  | false

Reminder: A custom link it will be indicated by the start of a '#' in the markdown label. This link will execute the action that you had sent in the onLinkOpen param in the ReactFormBuilder component.

#### Checkbox example

```yaml
    {
          "name": "terms_and_conditions",
          "label": "This is the label of the checkbox with a [customLink](#customLink) and [normalLink](https://www.dcsl.com/careers/)",
          "type": "checkbox",
          "defaultChecked": false,
          "errorMessages": {
            "required": "This field is required"
          },
          "registerConfig": {
            "required": true
          }
        }

```

https://user-images.githubusercontent.com/79102959/134894112-e4f38ced-0992-428c-95c3-bcdce20cd858.mp4



## Country
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Country component name  	|  string 	|  - 	|
|   type*   | Must be `country` | string | - |
|   label	|  Text shown over the coutnry list|  string  	|   ''	|
|   language	| An string with the language shortcode in which you want to display the country names opt:  <br /> Available laguages: `es`,`de`,`fr`,`en`  	| string   	|   en	|
|   placeholder    |   Placeholder displayed in the select    |    string       |   ''   |
|   priorityOptions    |   Array of strings with shortcode(s) of the countries that want to be displayed first in the countries list. Ex: ['GB', 'ES']    |    string       |   '' |
|   returnCountryName	|  Returns the country name (in English) as each option value, instead of the country code  	|  boolean 	|  false	|
|   **countryAndRegionsData**	| An object or array of objects with the acronym(s) and the names of the countries that you want to be shown in the select.  	| json   	|  [] 	|
|  countryName     |   The name of the country |  string     | ''
|  countryShortCode     |   To display the short code(s) for the countries Ex: ['GB', 'ES']  |  string     | ''
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if there is no country selected |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the country select is required  |  boolean  | false

Reminder: the 'countryAndRegions' prop that can be sent in the ReactFormBuilder will be rendered in this component and will replace the default list.

### Country example:
```yaml
{
  "name": "country_of_residence",
  "type": "country",
  "label": "This is the label of the country select",
  "placeholder": "Please select an option ^^",
  "priorityOptions": ["GB", "ES"],
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  }
}
```

### Custom list country example:
```yaml
{
  {
      countryName: 'MyOwnCountry1',
      countryShortCode: 'MC1'
    },
    {
      countryName: 'MyOwnCountry2',
      countryShortCode: 'MC2'
    },
    {
      countryName: 'MyOwnCountry3',
      countryShortCode: 'MC3'
    },
    {
      countryName: 'MyOwnCountry4',
      countryShortCode: 'MC4'
    }
}

{
  "name": "country_of_residence",
  "type": "country",
  "label": "This is the label of the country select",
  "placeholder": "Please select an option ^^",
  "priorityOptions": ["GB", "ES"],
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  }
}
```


https://user-images.githubusercontent.com/79102959/134897712-95e4391c-cfbb-42cd-b813-06596d9b7096.mov



## Date
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Date name component  	|  string 	|  - 	|
|   type*   | Must be `date`| string | - |
|   label	|  Text shown over the  date input 	|  string  	|   ''	|
|   placeholder    |   Text to be displayed as placeholder in the date input     |    string       |   ''   |
|   minAge    |   Minimun age that user should have to make the submit    |    int       |   ''   |
|   dateFormat    |   Format to be applied in the date input    |    string       |   dd/MM/yyyy   |
|   openToDate    |   Date in which the calendar will be opened. If this attribute is empty and we have a `minAge` attribute, the calendar will be opened -- `minAge` years ago since today to improve make it easier for the user. If we dont use this attribute the calendar will be opened in todays date   |    string       |   dd/MM/yyyy   |
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the date hasn't be selected and  is required |  string     | ''
|  underAge      |   Error message to display on submit if it is chosen a date  that represents a user younger than the minAge attribute |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the date is required or not |  boolean  | false

### Date examples
Basic date example
```yaml
{
  "name": "dob",
  "type": "date",
  "label": "Date of birth",
  "placeholder": "dd/mm/yyyy",
  "openToDate": "1/1/2000",
  "errorMessages": {
    "required": "This field is required",
  },
  "registerConfig": {
    "required": true
  }
}
```
Under age date example
```yaml
{
  "name": "dob",
  "type": "date",
  "label": "Date of birth",
  "placeholder": "dd/mm/yyyy",
  "minAge": 18,
  "errorMessages": {
    "required": "This field is required",
    "underAge": "You must be 18 years old or above"
  },
  "registerConfig": {
    "required": true
  }
}

```

https://user-images.githubusercontent.com/79102959/134897303-817957ba-12d1-4c0c-a64f-6ab0c99d72fd.mp4



## Input
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Input name  	|  string 	|  - 	|
|   type*   | Must be `input`| string | - |
|   label	|  Text shown with the input |  string  	|   ''	|
|   placeholder    |   Placeholder text to be displayed   |    string       |   ''   |
| **icon**  |   |  json  |   |
| name  | Name of the icon that we want to be displayed Opt: ['question-circle'] | string  |    -
|  fill  | Icon color  | string  | black
| **tooltip**  |   |  json  |   |
|  text |  Text to be displayed on icon hover | string  | ''
| **config**  | inside this json we could define any typical theme UI property to style the tooltip  |  json  |   |
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
| pattern  | Error message to display if there is an error pattern in the input text  |  boolean  | false
|  **registerConfig**       |    |  json     |
| required  | Define if the checkbox is required  |  boolean  | false
| pattern  | Define the pattern to check the input  |  string  | ""

### Input examples
Basic input example
```yaml
{
  "name": "email",
  "type": "input",
  "label": "",
  "placeholder": "Email Address*",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  }
}

```
Input with pattern control example
```yaml
{
  "name": "email",
  "type": "input",
  "label": "",
  "placeholder": "Email Address*",
  "errorMessages": {
    "required": "This field is required",
    "pattern": "Invalid email"
  },
  "registerConfig": {
    "required": true,
    "pattern": "/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/"
  }
}

```
Input with styled icon
```yaml
{
  name: 'inputName',
  type: 'input',
  label: 'input label',
  placeholder: 'input placeholder',
  icon: {
    name: 'question-circle',
    fill: 'red'
  },
  tooltip: {
    text: 'tooltip text example',
    config: {
      backgroundColor: 'green'
    }
  },
  errorMessages: {
    required: 'This field is required',
    pattern: 'This is not the right pattern'
  },
  registerConfig: {
    required: true
  }
}
```

https://user-images.githubusercontent.com/79102959/134945983-c0c38274-05c7-42b7-8ad3-c80b33db6611.mov


### Markdown
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  markdown component name  	|  string 	|  - 	|
|   type*   | must be **markdown**| string | - |
|   label	|  Text to be displayed, it will be formatted with markdown style	|  string  	|   ''	|

#### Markdown examples
Markdown example

```yaml
{
    name: "Markdown component",
    type: "markdown",
    label: "El texto a **mostar** en el markdown [exmaple]()"
}

```
![Markdown](https://user-images.githubusercontent.com/79102959/134945571-e04941d1-7972-4271-8139-4be1815ed644.png)


### MultipleCheckbox
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	| MultipleCheckBox name  |  string 	|  - 	|
|   type*   | must be **multiple_checkboxes** | string | - |
|   label	|  Text to show like the question text |  string  	|   ''	|
| **config**  |   | json  |   |
|  **options** |  |  json |     |
| options | It contains all the options to be rendered in the multicheckbox component |  Object Array | -
|  label or src |  The label displayed with the option (can use markdown format) or the src of the image to be rendered |  string  |  ''  |
|  value |  The value of the option |  string  |  ''  |
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the multiplecheckbox is not checked and is required |  string     | ''
| minimumLen  | Text to be displayed in case not minimunLen items has been selected  |  string  | ''  |
| maximumLen  | Text to be displayed in case that more than maximumLen items has been selected  |  string  | ''  |
|  **registerConfig**       |    |  json     |
| minimumLen | Minimum number of options that user must select  | int  | 0
| maximumLen | Maximum number of options that user can select  | int  | -
| required  | Define if the multiplecheckbox is required  |  boolean  | false

#### Multiplecheckbox examples
Basic multiplecheckbox
```yaml
{
  "name": "multiplecheckbox_name",
  "type": "multiple_checkboxes",
  "placeholder": "Please select all that apply",
  "label": "What option do you prefer?",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  },

  "config": {
    "options": [
      {
        "value": "option1",
        "label": "LabelOption1"
      },
      {
        "value": "option2",
        "label": "LabelOption2"
      },
      {
        "value": "option3",
        "label": "LabelOption3"
      }
    ]
  }
}
```
Multiplecheckbox with images and labels

```yaml
{
  "name": "multiplecheckbox_name",
  "type": "multiple_checkboxes",
  "placeholder": "Please select all that apply",
  "label": "What option do you prefer?",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  },

  "config": {
    "options": [
      {
        "value": "option1",
        "src": "/src/assets/image1"
      },
      {
        "value": "option2",
        "label": "LabelOption2"
      },
      {
        "value": "option3",
        "src": "/src/assets/image3"
      }
    ]
  }
}

```

Multiplecheckbox with minimumLen
```yaml
{
  "name": "multiplecheckbox_name",
  "type": "multiple_checkboxes",
  "placeholder": "Please select all that apply",
  "label": "What option do you prefer?",
  "errorMessages": {
    "required": "This field is required",
    "minimumLen": "You must choose at least two options"
  },
  "registerConfig": {
    "minimumLen": 2,
    "required": false
  },
  "config": {
    "options": [
      {
        "value": "option1",
        "label": "LabelOption1"
      },
      {
        "value": "option2",
        "label": "LabelOption2"
      },
      {
        "value": "option3",
        "label": "LabelOption3"
      }
    ]
  }
}
```


https://user-images.githubusercontent.com/79102959/134945855-52577cab-9b16-4df5-8978-b269be0ffce9.mov




### Phone
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Phone component name  	|  string 	|  - 	|
|   type*   | must be `phone` | string | - |
|   label	|  Text to show over the input 	|  string  	|   ''	|
|   placeholder	| Placeholder text to be displayed in the select 	|  string  	|   ''	|
|   defaultCountry	| Country to show by default  	|  string  	|   GB	|
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the phone input is not filled and is required |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the phone input is required  |  boolean  | false

Reminder: The isoCode prop that can also be sent in the ReactFormBuilder component will define the default country displayed in the phone field.

Basic phone

```yaml
{
  "name": "phone",
  "type": "phone",
  "label": "",
  "registerConfig": {
    "required": true
  },
  "defaultCountry":"GB",
  "placeholder": "Phone",
  "errorMessages": {
    "required": "This field is required"
  }
}
```


https://user-images.githubusercontent.com/79102959/134948115-4f461d76-8d06-4cb8-adc0-e2bef5f9d16f.mov



### RadioButton
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  RadioButton name  	|  string 	|  - 	|
|   type*   | must be `radio`| string | - |
|   label	|  Text to show like the question text. This text can be written in markdown 	|  string  	|   ''	|
|   **options**	|  Object array that will contain all the options that you want in the radio buttons component  	| array 	|   	|
| value  | the value of the option  |  string  | -
| label  | the label displayed with the option  |  string  | -
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the radioButton is required  |  boolean  | false

#### RadioButton example
Basic radiobutton
```yaml
{
  "name": "radio_name",
  "label": "este es el texto de la pregunta",
  "type": "radio",
  "options": [
    {
      "value": true,
      "label": "YES"
    },
    {
      "value": false,
      "label": "NOP"
    }
  ],
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  }
}

```



https://user-images.githubusercontent.com/79102959/134948337-03618f4c-6cc7-409a-b95b-c3737ade9130.mov



### Select
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Checkbox name  	|  string 	|  - 	|
|   type*   | must be `select`| string | - |
|   label	|  Text shown over the select question 	|  string  	|   ''	|
|   placeholder	| Placeholder text to be displayed in the select 	|  string  	|   ''	|
| **config**  |   | json  |   |
|  **options** |  |  json |     |
| options | It contains all the options to be rendered in the select component |  Object Array | -
|  label |  The label displayed in select option |  string  |  ''  |
|  value |  The value of the select option |  string  |  ''  |
|  **arrows** |  |  json |     |
| up | Path of the arrow up icon. If none is provided, it'll pick the `down` value.|  string | -
| down | Path of the arrow down icon. If none is provided, it'll pick the `up` value. |  string | -
| width | Path of the arrow down icon |  number | 16
| height | Path of the arrow down icon |  number | 16
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if there is no selection and it is required |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the select is required  |  boolean  | false

#### Select examples

Select basic example:

```yaml
{
  "name": "color",
  "type": "select",
  "placeholder": "Please choose an option",
  "label": "What is your favorite color?",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  },
  "config": {
    "options": [
      {
        "value": "red",
        "label": "Red"
      },
      {
        "value": "black",
        "label": "Black"
      },
      {
        "value": "prefer_not_say",
        "label": "prefer not to say"
      }
    ]
  }
}

```

Select example with custom arrows in the `public/icons` folder:

```yaml
{
  "name": "color",
  "type": "select",
  "placeholder": "Please choose an option",
  "label": "What is your favorite color?",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  },
  "config": {
    "arrows": {
      "up": "icons/ArrowUp.svg",
      "down": "icons/ArrowDown.svg",
      "width": 18,
      "height": 18
    },
    "options": [
      {
        "value": "red",
        "label": "Red"
      },
      {
        "value": "black",
        "label": "Black"
      },
      {
        "value": "prefer_not_say",
        "label": "prefer not to say"
      }
    ]
  }
}

```

https://user-images.githubusercontent.com/79102959/134949537-3647437e-0330-4692-bd30-ef6aa319bd7b.mov

### Autocomplete
| Option  	| Description  	| Type |   Default	|
|---	|---	|:---:	|:---:	|
|   name*	|  Checkbox name  	|  string 	|  - 	|
|   type*   | must be `select`| string | - |
|   label	|  Text shown over the select question 	|  string  	|   ''	|
|   placeholder	| Placeholder text to be displayed in the select 	|  string  	|   ''	|
| **config**  |   | json  |   |
|  **options** |  |  json |     |
| options | It contains all the options to be rendered in the select component |  Object Array | -
|  label |  The label displayed in select option |  string  |  ''  |
|  value |  The value of the select option |  string  |  ''  |
|   **errorMessages**	|    	| json   	|   	|
|  required      |   Error message to display on submit if there is no selection and it is required |  string     | ''
|  **registerConfig**       |    |  json     |
| required  | Define if the select is required  |  boolean  | false

It works the same as select field, but searchable option is available.

#### Autocomplete examples 

Autocomplete basic example

```yaml
{
  "name": "color",
  "type": "autocomplete",
  "placeholder": "Please choose an option",
  "label": "What is your favorite color?",
  "errorMessages": {
    "required": "This field is required"
  },
  "registerConfig": {
    "required": true
  },
  "config": {
    "options": [
      {
        "value": "red",
        "label": "Red"
      },
      {
        "value": "black",
        "label": "Black"
      },
      {
        "value": "prefer_not_say",
        "label": "prefer not to say"
      }
    ]
  }
}

```

# Accessibility

The accessibility requirements for all the form tags are already configured in the library. For components (input, checkbox, select, radio…) different attributes have been introduced that can be configured through props. 

Next, we can see different attributes and tags to adjust the accessibility of the form and how to configure them: 

| Attribute/Tag  	| Description  	
|---	   |---	|
|   Aria-describedby	  |  To configure that, it's necessary to pass “name form” as a prop |
|   Fieldset / Legend	|  Tags that are being used to group and associate related form controls (you can see in the multiple checkbox example given below) |
|   Required    |   To indicate if the field is necessary to fill or not while completing the form |
|   Placeholder	| Used to guide and help the user to describe the format and expected value for the field |
|   Type      |  To specify the type of elements to display |
|  Accessibility  |  In radio button needs to pass as a props `"accessibility": true` | 
|  AccessibilityError |  the main form also needs to have `"accessibilityError"`: true as a props | 

* To define the style for the fields, as we use theme-ui, we can either do inline-styling using style=”” or instead sx=”” where you pass the style accordingly. Also, we can include an “id” attribute for input that needs a unique style.

* For the markdown component, we can add the corresponding tag to the text or title. To illustrate that, if the title is an h2, it will include “##” before text, or, if the title is an h3, it will include “###”, and so on. 

### Following are the few code examples to see how we use each component:


### Main form

```yaml
{
  "en": {
    "contact": {
      "name": "Contact Form",
      "enabled": true,
      "accessibilityError": true,
      "questions": [...]
    }
  }
}
```
### Input tag

```jsx
<div class="form-group">
    <label for="first_name">First name*</label>
    <input
        type="text"
        class="form-control"
        placeholder=""
        id="first_name"
        name="first_name"
        aria-describedby="error_message_first_name"
        required>
    <span class="invalid-feedback"
          style="display:block;"
          id="error_message_first_name">This field is required</span>
</div>
```

### Dropdown fields

```jsx
<div class="form-group">
    <label for="age">Age Range</label>
    <select class="form-control"
            autocomplete="off"
            id="age"
            name="age"
            aria-describedby="error_message_age"
            required
    >
        <option value="" disabled>Please make a selection</option>
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
    </select>
    <span class="invalid-feedback"
          style="display:block;"
          id="error_message_age">Please make a selection</span>
</div>
```

### Multiple checkbox

```jsx
<div class="form-group" ref="what_sport_interested_in">
    <fieldset>
        <legend for="what_sport_interested_in">Are you interested in any of the sports below?</legend>
        <span class="invalid-feedback"
          style="display:block;"
          id="error_message_what_sport_interested_in">Please make a selection</span>
        <div class="form-group container">
            <div class="row">
                <div class="form-check col-12 col-md-6">
                    <input type="checkbox" 
                      class="form-check-input"
                      value="Tennis"
                      id="what_sport_interested_in_tennis"
                      name="what_sport_interested_in_tennis"
                      aria-describedby="error_message_what_sport_interested_in">
                    <label class="form-check-label" for="what_sport_interested_in_tennis">Tennis</label>
                </div>
                <div class="form-check col-12 col-md-6">
                    <input type="checkbox" 
                      class="form-check-input"
                      value="Football"
                      id="what_sport_interested_in_football"
                      name="what_sport_interested_in_football"
                      aria-describedby="error_message_what_sport_interested_in">
                    <label class="form-check-label" for="what_sport_interested_in_football">Football</label>
                </div>
            </div>
        </div>
    </fieldset>
</div>
```

### Checkbox fields

```jsx
<div class="form-group">
    <label for=”privacy_policy">Privacy policy*</label>
    <input
        type="checkbox"
        class="form-control"
        id="privacy_policy"
        name="privacy_policy"
        aria-describedby="error_message_privacy_policy"
        required>
    <span class="invalid-feedback"
          style="display:block;"
          id="error_message_first_name">This field is required</span>
    <div>
         <p> I confirm I am aged 18 years or older, a resident of the United Kingdom and have read and agree to the competition terms and condition and privacy policy</p>
   </div>

```


# To contribute

1. `npm install`
2. `npm start`
3. Open another tab and do `cd example`
4. `npm install`
5. `npm start`

See `localhost:3000`

Any change on the root src library will be reflected on the usage in the example folder.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
 <td align="center"><a href="https://github.com/pablo-albaladejo"><img src="https://avatars.githubusercontent.com/u/7994467?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pablo Albaladejo</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=pablo-albaladejo" title="Code">💻</a> <a href="https://github.com/guidesmiths/react-form-builder/commits?author=pablo-albaladejo"title="Mentoring">🧑‍🏫</a>

<td align="center"><a href="https://github.com/ismaelocaramelo"><img src="https://avatars.githubusercontent.com/u/21059277?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ismael Bakkali</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=ismaelocaramelo" title="Code">💻</a>
<a href="https://github.com/guidesmiths/react-form-builder/issues?q=-reviewed-by%3Aismaelocaramelo" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/guidesmiths/react-form-builder/issues/created_by/ismaelocaramelo" title="Bug">🐛 </a></td>
</td>

<td align="center"><a href="https://github.com/FranciscoValdesoiro"><img src="https://avatars.githubusercontent.com/u/45309269?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Francisco Valdesoiro</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=FranciscoValdesoiro" title="Code">💻</a> <a href="https://github.com/guidesmiths/react-form-builder/commits?author=FranciscoValdesoiro" title="storyBooks">📓</a> <a href="https://github.com/guidesmiths/react-form-builder/issues/created_by/FranciscoValdesoiro" title="Bug">🐛 </a></td>

<td align="center"><a href="https://github.com/ars1096"><img src="https://avatars.githubusercontent.com/u/79102959?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrián Rodríguez</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=ardguezsoc" title="Code">💻</a> <a href="https://github.com/guidesmiths/react-form-builder/commits?author=ardguezsoc"
title="Documentation">📖</a> <a href="https://github.com/guidesmiths/react-form-builder/commits?author=ardguezsoc"
title="Test">⚠️</a> </td>

<td align="center"><a href="https://github.com/sofisdev"><img src="https://avatars.githubusercontent.com/u/63403532?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sofía Sánchez</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=sofisdev" title="Code">💻</a> <a href="https://github.com/guidesmiths/react-form-builder/commits?author=sofisdev"
title="Test">⚠️</a> </td>

<td align="center"><a href="https://github.com/Donivanes"><img src="https://avatars.githubusercontent.com/u/22077321?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Iván Esteban</b></sub></a><br /><a href="https://github.com/guidesmiths/react-form-builder/commits?author=Donivanes" title="Code">💻</a> <a href="https://github.com/guidesmiths/react-form-builder/issues/created_by/Donivanes" title="Bug">🐛 </a></td>


  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Guidesmiths](https://github.com/Guidesmiths)