# 🚗 Car Dealership Inquiry Form - React + Tailwind CSS

## 🎯 Purpose

This form is designed to collect inquiries from customers interested in **new or used cars**. It gathers contact information, car preferences, budget, and preferred contact details to help dealership staff follow up effectively.

---

## ✅ 1. Form Fields and Validations

### 📌 Inquiry Info

| Field Label  | Field Name  | Type               | Required | Validation      |
| ------------ | ----------- | ------------------ | -------- | --------------- |
| Inquiry Type | inquiryType | Radio (New / Used) | Yes      | Must select one |

### 📌 Car Interest

| Field Label      | Field Name | Type   | Required | Validation       |
| ---------------- | ---------- | ------ | -------- | ---------------- |
| Car Make & Model | carModel   | Text   | Yes      | Min 2 characters |
| Budget Range     | budget     | Select | No       | Optional         |

### 📌 Personal Info

| Field Label | Field Name | Type | Required | Validation              |
| ----------- | ---------- | ---- | -------- | ----------------------- |
| Full Name   | fullName   | Text | Yes      | Min 3 characters        |
| Location    | location   | Text | Yes      | City/Town name required |

### 📌 Contact Preferences

| Field Label | Field Name | Type | Required | Validation |
| --- | --- | --- | --- | --- |
| Preferred Contact Method | contactMethod | Radio (Email / Phone) | Yes | One must be selected |
| Email Address | email | Email | Conditionally Yes | Required if contact method is email |
| Phone Number | phone | Tel | Conditionally Yes | Required if contact method is phone |
| Preferred Contact Date | preferredDate | Date | Yes | Must not be in the past |
| Preferred Contact Time | preferredTime | Time | No | Optional |

### 📌 Additional Info

| Field Label | Field Name | Type | Required | Validation |
| --- | --- | --- | --- | --- |
| Message or Questions | message | Textarea | No | Max 500 characters |
| How did you hear about us? | referralSource | Select | No | Optional |

---

## ✅ 2. Optional Enhancements

- Conditional validation for email/phone
- Disable past dates in date picker
- Show additional field if "Other" is selected in Car Model
- Success/Error toasts on submission
- Reset form button
- Field-level error messages

---

## ✅ 3. Technical Stack

- React (functional components, hooks)
- Tailwind CSS for styling
- Validation via custom logic or Formik + Yup (optional)
- Form submission to `console.log` (can be extended to backend API)

---

## ✅ 4. Layout Design

- **Card-style UI** with Tailwind: rounded corners, padding, shadows
- **Section-based layout** for better UX:
  1. Inquiry Info
  2. Car Interest
  3. Personal Info
  4. Contact Preferences
  5. Additional Notes

---

## ✅ 5. Sample screenshots

**Initial state**
![image](https://github.com/user-attachments/assets/4b9de70b-3ea4-43c6-ba35-8f38376f2d9b)

**Error state**
![image](https://github.com/user-attachments/assets/7108c83a-c647-4783-97bf-a0b6db43db2f)

---

## 📎 Future Enhancements (Optional)

- Upload ID proof or driving license
- Auto-fill city using geolocation
- Dynamic drop-down for available models
- Connect with backend CRM or lead management system
