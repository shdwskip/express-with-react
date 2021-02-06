const REQUIRED_FIELD_MESSAGE = 'This field is required';

export const departmentNameValidationSchema = {
  required: REQUIRED_FIELD_MESSAGE,
  minLength: {
    value: 2,
    message: "Department can't be less then 2 chars",
  },
  maxLength: {
    value: 50,
    message: "Department can't be more then 50 chars",
  },
};

export const employeeNameValidationSchema = {
  required: REQUIRED_FIELD_MESSAGE,
  minLength: {
    value: 3,
    message: "Name can't be less then 3 chars",
  },
  maxLength: {
    value: 30,
    message: "Name can't be more then 30 chars",
  },
};
