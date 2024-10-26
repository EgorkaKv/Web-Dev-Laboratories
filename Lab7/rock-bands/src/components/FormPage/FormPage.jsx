import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import ErrorMessage from './ErrorMessage';
import './FormPage.css';

const FormPage = () => {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Им`я повинно бути не довше 15 символів')
      .required('Им`я - обов`язкове поле')
      .matches(/^[A-Za-z]+$/, 'Им`я не повинно мати спеціальних символів або чисел'),
    lastName: Yup.string()
      .max(20, 'Прізвище повинно бути не довше 20 символів')
      .required('Прізвище - обов`язкове поле')
      .matches(/^[A-Za-z]+$/, 'Прізвище не має містити спеціальних символів або чисел'),
    email: Yup.string()
      .email('Неправильний формат email')
      .required('Email - обов`язкове поле'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Телефон повинен мати лише 10 цифр')
      .required('Телефон - обов`язкове поле'),
    address: Yup.string()
      .max(50, 'Адреса повинен бути не більше 50 символів')
      .required('Адреса - обов`язкове поле'),
  });

  const handleSubmit = (values) => {
    console.log('Form data:', values);
    navigate('/success'); // Redirect on successful submission
  };

  return (
    <div className="form-page">
      <h1>Checkout</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <TextInput label="First Name" name="firstName" type="text" />
            <TextInput label="Last Name" name="lastName" type="text" />
            <TextInput label="Email" name="email" type="email" />
            <TextInput label="Phone" name="phone" type="text" />
            <TextInput label="Address" name="address" type="text" />
            <ErrorMessage errors={errors} touched={touched} />
            <button type="submit" className="continue-button">Continue</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPage;
