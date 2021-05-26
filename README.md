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
import React, { Component } from 'react'

import MyComponent from 'react-form-builder'
import 'react-form-builder/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```
# Formbuilder Options 
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|---	|:---:	|	
|   idForm*	|  Id for the form  	|  string 	|  '' 	|   	
|   form*	|  The json with the questions to create 	|  json  	|   -	|   	
|   onSubmit*    |   Action to be realized "onSubmit" form    |    function       |   -    |  
|   language	| Shortcut with the language  to render components in multiple languages (country,date) <br /> Available laguages: es,de,fr,en  	| string   	|   en	|   
|  isoCode      |   Isocode of the country to show as default in phone input |  string     | GB
|  onLinkOpen       |  function to be executed when there is a custom link. Ej: [privacy] (#privacy)"  |  function     | - 

| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   idForm*	|  Id for the form  	|  string 	|  '' 	|   	
|   form*	|  The json with the questions to create 	|  json  	|   -	|   	
|   onSubmit*    |   Action to be realized "onSubmit" form    |    function       |   -    |  
|   language	| Shortcut with the language  to render components in multiple languages (country,date) <br /> <br /> Available laguages: es,de,fr,en  	| string   	|   en	|   
|  isoCode      |   Isocode of the country to show as default in phone input |  string     | GB
|  onLinkOpen       |  function to be executed when there is a custom link. Ej: [privacy] (#privacy)"  |  function     | - 

# Questions Options
### Checkbox
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Checkbox name  	|  string 	|  - 	|   
|   type*   | must be **checkbox**| string | - |
|   label	|  Text shown next to the checkbox. This text can be written in markdown style 	|  string  	|   ''	|   	
|   defaultChecked    |   Checked component by default    |    boolean       |   false   | 
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
|  **registerConfig**       |    |  json     | 
| required  | Define if the checkbox is required  |  boolean  | false

### Country
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Country component name  	|  string 	|  - 	|   
|   type*   | must be **country** | string | - |
|   label	|  Text shown over the coutnry list|  string  	|   ''	|   	
|   placeholder    |   Placeholder displayed in the select    |    string       |   ''   |
|   priorityOptions    |   Array of strings with shortcode(s) of the countries that want to be displayed first in the countries list. Ex: ['GB', 'ES']    |    string       |   ''   | 
|  **CountryAndRegionsData**    |       |       |
|  CountryAndRegionsData    |  An object or array of objects with the acronym(s) and the names of the countries that you want to be shown in the select     |   Array    | -
| countryName  | Name of the country  | string  | ''
| countryShortCode  | shortcode of the country  | string  | ''
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if there is no country selected |  string     | ''
|  **registerConfig**       |    |  json     | 
| required  | Define if the country select is required  |  boolean  | false

### Date
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Date name component  	|  string 	|  - 	|   
|   type*   | must be **date**| string | - |
|   label	|  Text shown over the input 	|  string  	|   ''	|   	
|   placeholder    |   Texto to be displayed as placeholder in the input    |    string       |   ''   | 
|   minAge    |   Minimun age that user should have    |    int       |   ''   | 
|   dateFormat    |   Format to be applied in the date input    |    string       |   dd/MM/yyyy   | 
|   openToDate    |   Date in which the calendar will be opened. If this attribute is empty and we have a minAge attribute, the calendar will be opened -- minAge years ago since today to improve the flow. If we dont use this attribute the calendar will be opened in todays date   |    string       |   dd/MM/yyyy   | 
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
|  underAge      |   Error message to display on submit if it is chosen a date lower that represents a user younger than the minAge attribute |  string     | ''
|  **registerConfig**       |    |  json     | 
| required  | Define if the checkbox is required  |  boolean  | false

### Input
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Input name  	|  string 	|  - 	|   
|   type*   | must be **input**| string | - |
|   label	|  Text shown with the input. |  string  	|   ''	|   	
|   placeholder    |   Placeholder text to be displayed   |    string       |   ''   | 
| **icon**  |   |  json  |   |
| name  | Name of the icon that we want to be displayed Opt: ['question-circle'] | string  |    -
|  fill  | Icon color  | string  | black
| **tooltip**  |   |  json  |   |
|  text |  Text to be displayed on icon hover |   |
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
| pattern  | Define if the pattern is required or not  |  boolean  | false
|  **registerConfig**       |    |  json     | 
| required  | Define if the checkbox is required  |  boolean  | false
| pattern  | Define the pattern to check the input  |  string  | -

### Markdown
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  markdown component name  	|  string 	|  - 	|   
|   type*   | must be **markdown**| string | - |
|   label	|  Text to be displayed, it will be formatted with markdown style	|  string  	|   ''	|   

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

### Phone
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Phone component name  	|  string 	|  - 	|  
|   type*   | must be **phone** | string | - |
|   label	|  Text to show over the input 	|  string  	|   ''	|   	
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if the phone input is not filled and is required |  string     | ''
|  **registerConfig**       |    |  json     | 
| required  | Define if the phone input is required  |  boolean  | false


### RadioButton
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  RadioButton name  	|  string 	|  - 	|  
|   type*   | must be **radio**| string | - |
|   label	|  Text to show like the question text. This text can be written in markdown 	|  string  	|   ''	|   	
|   **errorMessages**	|    	| json   	|   	|   
|  required      |   Error message to display on submit if the checkbox is not checked and is required |  string     | ''
|  **registerConfig**       |    |  json     | 
| required  | Define if the radioButton is required  |  boolean  | false

### Select
| Option  	| Description  	| Type |   Default	|   	
|---	|---	|:---:	|:---:	|	
|   name*	|  Checkbox name  	|  string 	|  - 	|   
|   type*   | must be **select**| string | - |
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


# To contribute

1. `npm install`
2. `npm start`
3. Open another tab and do `cd example`
4. `npm install`
5. `npm start`

See `localhost:3000`

Any change on the root src library will be reflected on the usage in the example folder.

# Example

http://guidesmiths-react-form-builder.s3-website.eu-central-1.amazonaws.com/

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
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Guidesmiths](https://github.com/Guidesmiths)
