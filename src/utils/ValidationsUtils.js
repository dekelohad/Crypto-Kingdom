export const requiredValidation = (fieldName) => {
  return {
    required: {
      value: true,
      message: `${fieldName} is required.`,
    },
  };
};

export const passwordValidation = () => ({
  pattern: {
    value: /(?=.*\d)(?=.*[A-Z])(?!.*\s)/,
    message:
      'Password should contain at least one uppercase letter and a digit.',
  },
});

export const messageValidation = (value, message) => ({
  pattern: {
    value: value,
    message: message,
  },
});

export const minLengthValidation = (fieldName, value) => ({
  minLength: {
    value: value,
    message: `${fieldName} should contain at least ${value} characters`,
  },
});

export const emailValidation = () => ({
  pattern: {
    value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please enter a valid email.',
  },
});
