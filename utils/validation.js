const validateName = name => {
  const valid = /^([a-zA-Z0-9 ]{1,})$/.test(name);
  return {
    valid,
    error: !!name.trim() ? (valid ? undefined : "Username is invalid.") : "Required.",
  };
};

const validateEmail = email => {
  const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
  return {
    valid,
    error: !!email.trim() ? (valid ? undefined : "Email is Invalid.") : "Required.",
  };
};

const validatePassword = password => {
  const valid = password.trim().length >= 8;

  return {
    valid,
    error: !!password.trim() ? (valid ? undefined : "Password must be 8 characters long.") : "Required.",
  };
};

const matchPasswords = (password, passwordAgain) => {
  const valid = password === passwordAgain;

  return {
    valid,
    error: valid ? undefined : "Passwords do not match.",
  };
};

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  matchPasswords,
};
