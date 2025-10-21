const validator = require("validator");

const validateRegistration = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.length > 100) {
    errors.name = "Name cannot exceed 100 characters";
  }

  // Email validation
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Please provide a valid email address";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  // Role validation (optional)
  if (data.role && !["user", "admin"].includes(data.role)) {
    errors.role = "Role must be either user or admin";
  }

  if (
    data.availability &&
    !["available", "unavailable", "partially-available"].includes(
      data.availability
    )
  ) {
    errors.availability = "Invalid availability status";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Please provide a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validateProfileUpdate = (data) => {
  const errors = {};

  if (data.name !== undefined) {
    if (!data.name || data.name.trim().length === 0) {
      errors.name = "Name is required";
    } else if (data.name.length > 100) {
      errors.name = "Name cannot exceed 100 characters";
    }
  }

  if (data.email !== undefined) {
    if (!data.email || data.email.trim().length === 0) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
      errors.email = "Please provide a valid email address";
    }
  }

  if (data.role && !["user", "admin"].includes(data.role)) {
    errors.role = "Role must be either user or admin";
  }

  if (
    data.availability &&
    !["available", "unavailable", "partially-available"].includes(
      data.availability
    )
  ) {
    errors.availability = "Invalid availability status";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
};
