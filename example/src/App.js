import React from 'react'
/** @jsx jsx */
import { jsx, Link } from 'theme-ui'
import ReactMarkdown from 'react-markdown'

import {
  Button,
  Input,
  Label,
  Checkbox,
  Radio,
  Phone,
  Date,
  ErrorMessage,
  FormBuilder
} from 'react-form-builder'

import forms from './forms.json'
import { useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

const App = () => {
  const { register, setValue, setError, clearErrors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const styles = {
    fullWidth: {
      gridColumnStart: '1',
      gridColumnEnd: '3'
    },
    selectOption: {
      background: 'bg',
      color: 'black'
    },
    markDown: {
      fontFamily: 'regular',
      width: ['90%', '95%', '95%'],
      p: {
        margin: 0
      }
    }
  }

  const CustomCheckbox = (question, useForm) => {

   return <div
   sx={{ ...(question.isFullWidth && styles.fullWidth)}}>
   <div
     sx={{
     }}
   >
     <div sx={styles.centerStyle} key={question.name}>
       <Label sx={styles.centerStyle}>
         <Checkbox
           sx={styles.checkboxMinWidth}
           name={question.name}
           ref={register({
             ...question.registerConfig
           })}
         />
         <ReactMarkdown
           sx={styles.markDown}
           source={question.label}
           renderers={{
             link: ({ href, children }) => {
              return <Link
                 href={children[0].props.children.includes('privacy') ? 'http://privacy': 'http://default'}
                 target={question.target || '_blank'}
               >
                 {children} esto es el children: {children[0]}
               </Link>
             }

             
           }}
         />
       </Label>
       {useForm.errors[question.name] &&
         useForm.errors[question.name].type === 'required' && (
           <ErrorMessage
             message={
               question.errorMessages && question.errorMessages.required
             }
           />
         )}
     </div>
   </div>
 </div>
  }

  const onSubmitForm = (data) => {
    alert(
      `You have submitted your form correctly Data: ${'\n'} ${JSON.stringify(
        data,
        null,
        2
      )}`
    )
  }

  return (
    <>
      {/* <Button caption='Button example' />
      <Input />
      <Phone
        defaultCountry='GB'
        style={{}}
        register={register}
        setValue={setValue}
        setError={setError}
        clearErrors={clearErrors}
        placeholder='Phone'
      />
      <Date
        register={register}
        setValue={setValue}
        name='Date'
        registerConfig={{}}
        placeholder=''
        dateFormat='dd-MM-yyyy'
        isMobile={false}
        isBirthDate={false}
      />
      <Label>An important title field here *</Label>
      <Label>
        <Checkbox />
        Select an option
      </Label>
      <Label>
        <Radio name='dark-mode' value='true' defaultChecked />
        Dark Mode
      </Label>
      <Label>
        <Radio name='dark-mode' value='false' />
        Light Mode
      </Label> */}
      <Label>Example of form builder</Label>
      <FormBuilder
        idForm={forms.contact.id}
        form={forms.contact}
        onSubmit={onSubmitForm}
        customCheckbox={CustomCheckbox}
      />
    </>
  )
}

export default App
