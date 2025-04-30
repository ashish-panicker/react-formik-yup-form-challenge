import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { InquirySchema } from './validationSchema'; // optional: place Yup separately

export default function CarInquiryForm () {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Car Dealership Inquiry Form</h1>
      <Formik
        initialValues={{
          inquiryType: '',
          carModel: '',
          budget: '',
          fullName: '',
          location: '',
          contactMethod: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          referralSource: '',
        }}
        validationSchema={InquirySchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          actions.resetForm();
          alert('Form submitted!');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Inquiry Info */}
            <div>
              <label className="block font-medium mb-1">Inquiry Type</label>
              <div className="space-x-4">
                <label>
                  <Field type="radio" name="inquiryType" value="New" />
                  <span className="ml-1">New</span>
                </label>
                <label>
                  <Field type="radio" name="inquiryType" value="Used" />
                  <span className="ml-1">Used</span>
                </label>
              </div>
              <ErrorMessage name="inquiryType" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Car Model & Budget */}
            <div>
              <label className="block">Car Make & Model</label>
              <Field name="carModel" className="w-full border p-2 rounded" />
              <ErrorMessage name="carModel" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block">Budget Range</label>
              <Field as="select" name="budget" className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option value="Under $20,000">Under $20,000</option>
                <option value="$20,000 - $40,000">$20,000 - $40,000</option>
                <option value="$40,000+">$40,000+</option>
              </Field>
            </div>

            {/* Full Name & Location */}
            <div>
              <label className="block">Full Name</label>
              <Field name="fullName" className="w-full border p-2 rounded" />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block">Location</label>
              <Field name="location" className="w-full border p-2 rounded" />
              <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Contact Preferences */}
            <div>
              <label className="block font-medium mb-1">Preferred Contact Method</label>
              <div className="space-x-4">
                <label>
                  <Field type="radio" name="contactMethod" value="Email" />
                  <span className="ml-1">Email</span>
                </label>
                <label>
                  <Field type="radio" name="contactMethod" value="Phone" />
                  <span className="ml-1">Phone</span>
                </label>
              </div>
              <ErrorMessage name="contactMethod" component="div" className="text-red-500 text-sm" />
            </div>

            {values.contactMethod === 'Email' && (
              <div>
                <label className="block">Email</label>
                <Field name="email" type="email" className="w-full border p-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
            )}

            {values.contactMethod === 'Phone' && (
              <div>
                <label className="block">Phone</label>
                <Field name="phone" type="tel" className="w-full border p-2 rounded" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
            )}

            {/* Contact Date and Time */}
            <div>
              <label className="block">Preferred Contact Date</label>
              <Field name="preferredDate" type="date" className="w-full border p-2 rounded" />
              <ErrorMessage name="preferredDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block">Preferred Contact Time</label>
              <Field name="preferredTime" type="time" className="w-full border p-2 rounded" />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block">Message or Questions</label>
              <Field as="textarea" name="message" className="w-full border p-2 rounded" rows="4" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block">How did you hear about us?</label>
              <Field as="select" name="referralSource" className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option value="Internet">Internet</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </Field>
            </div>

            {/* Submit + Reset */}
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit
              </button>
              <button type="reset" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const InquirySchema = Yup.object().shape({
    inquiryType: Yup.string().required('Please select an inquiry type'),
  
    carModel: Yup.string()
      .min(2, 'Enter at least 2 characters')
      .required('Required'),
  
    budget: Yup.string().nullable(),
  
    fullName: Yup.string()
      .min(3, 'Min 3 characters')
      .required('Full name is required'),
  
    location: Yup.string().required('Location is required'),
  
    contactMethod: Yup.string().required('Select contact method'),
  
    email: Yup.string().when('contactMethod', {
      is: 'Email',
      then: (schema) => schema.required('Email is required').email('Invalid email'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
    phone: Yup.string().when('contactMethod', {
      is: 'Phone',
      then: (schema) =>
        schema
          .required('Phone number is required')
          .matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
    // 🔥 FIX: Use Yup.string() instead of Yup.date() for <input type="date" />
    preferredDate: Yup.string()
      .required('Select a date')
      .test('not-in-past', 'Date cannot be in the past', function (value) {
        if (!value) return false;
        const today = new Date().toISOString().split('T')[0];
        return value >= today;
      }),
  
    preferredTime: Yup.string().nullable(),
  
    message: Yup.string().max(500, 'Max 500 characters'),
  
    referralSource: Yup.string().nullable(),
  });
  

