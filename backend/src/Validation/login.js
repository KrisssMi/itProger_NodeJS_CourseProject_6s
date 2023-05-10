const Validator = require("validator");
const isEmpty = require("./is-empty");
const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();

module.exports = function validateLoginInput(data) {
  let errors = {};

  // email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = "Password must be at least 3 characters";
  }

  // try {
  //   const user =  DbClient.user.findUnique({
  //     where: {
  //       email: data.email,
  //     },
  //   });
  //   if (!user) {
  //     errors.email = "User with email " + data.email + " not found";
  //   }
  // } catch (e) {
  //   errors.email = "Error retrieving user data from the database";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
