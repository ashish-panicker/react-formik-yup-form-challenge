import { useFormik } from "formik";
import * as Yup from "yup";

export default function InquiryForm() {
  const inputForm = {
    inquiryType: "",
    carModel: "",
    budget: "",
    fullName: "",
    location: "",
    contactMethod: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    referralSource: "",
  };

  const yupSchema = Yup.object({
    inquiryType: Yup.string().required("Inquiry type is required"),
    carModel: Yup.string()
      .max(20, "Max length is 20 characters")
      .required("Car model is required"),
    budget: Yup.string().required("Choose your budget"),
    fullName: Yup.string()
      .max(50, "Name too long")
      .required("Full name is required"),
    location: Yup.string().required("Location is required"),
    contactMethod: Yup.string().required("Select contact method"),

    email: Yup.string().when("contactMethod", {
      is: "email",
      then: (schema) =>
        schema.email("Invalid email address").required("Email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phone: Yup.string().when("contactMethod", {
      is: "phone",
      then: (schema) =>
        schema
          .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
          .required("Phone number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    preferredDate: Yup.date().required("Select a preferred contact date"),
    preferredTime: Yup.string(), // optional
    message: Yup.string().max(500, "Message too long"), // optional
    referralSource: Yup.string(), // optional
  });

  const formik = useFormik({
    initialValues: inputForm,
    validationSchema: yupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Car Inquiry Form</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={formik.handleSubmit}
      >
        {/* Inquiry Type */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Inquiry Type *</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="inquiryType"
                value="new"
                checked={formik.values.inquiryType === "new"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              New
            </label>
            <label>
              <input
                type="radio"
                name="inquiryType"
                value="used"
                checked={formik.values.inquiryType === "used"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              Used
            </label>
          </div>
          {formik.touched.inquiryType && formik.errors.inquiryType && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.inquiryType}
            </div>
          )}
        </div>

        {/* Car Model */}
        <div>
          <label className="block font-semibold mb-1">Car Make & Model *</label>
          <input
            type="text"
            name="carModel"
            value={formik.values.carModel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.carModel && formik.errors.carModel && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.carModel}
            </div>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block font-semibold mb-1">Budget Range *</label>
          <select
            name="budget"
            value={formik.values.budget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="<5L">Below ₹5L</option>
            <option value="5-10L">₹5L–₹10L</option>
            <option value="10-20L">₹10L–₹20L</option>
            <option value=">20L">Above ₹20L</option>
          </select>
          {formik.touched.budget && formik.errors.budget && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.budget}
            </div>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.fullName}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location *</label>
          <input
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.location}
            </div>
          )}
        </div>

        {/* Contact Method */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">
            Preferred Contact Method *
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formik.values.contactMethod === "email"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              Email
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formik.values.contactMethod === "phone"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              Phone
            </label>
          </div>
          {formik.touched.contactMethod && formik.errors.contactMethod && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.contactMethod}
            </div>
          )}
        </div>

        {formik.values.contactMethod === "email" ? (
          <div>
            <label className="block font-semibold mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-2"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
        ) : formik.values.contactMethod === "phone" ? (
          <div>
            <label className="block font-semibold mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded p-2"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>
        ) : null}

        {/* Preferred Date */}
        <div>
          <label className="block font-semibold mb-1">
            Preferred Contact Date *
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formik.values.preferredDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
          {formik.touched.preferredDate && formik.errors.preferredDate && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.preferredDate}
            </div>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label className="block font-semibold mb-1">
            Preferred Contact Time
          </label>
          <input
            type="time"
            name="preferredTime"
            value={formik.values.preferredTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">
            Message or Questions
          </label>
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
            rows="4"
          ></textarea>
          {formik.touched.message && formik.errors.message && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.message}
            </div>
          )}
        </div>

        {/* Referral Source */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">
            How did you hear about us?
          </label>
          <select
            name="referralSource"
            value={formik.values.referralSource}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="website">Website</option>
            <option value="friend">Friend</option>
            <option value="social">Social Media</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit & Reset */}
        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="ml-4 text-gray-700"
            onClick={() => formik.resetForm()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
