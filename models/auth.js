const Joi = require("joi");

const validateAuth = (auth) => {
  const schema = {
    email: Joi.string().required().email().min(5).max(50),
    password: Joi.string().required().min(5).max(1024),
  };
  return Joi.validate(auth, schema);
};

exports.validate = validateAuth;
