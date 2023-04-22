// const Validator = require("validator");
// const isEmpty = require("./is-empty");
// const { PrismaClient } = require("@prisma/client");
// const DbClient = new PrismaClient();

// module.exports = async function validateRegisterInput(data) {
//   let errors = {};

//   data.name = !isEmpty(data.name) ? data.name : "";
//   data.email = !isEmpty(data.email) ? data.email : "";
//   data.password = !isEmpty(data.password) ? data.password : "";
//   data.password2 = !isEmpty(data.password2) ? data.password2 : "";

//   if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
//     errors.name = "Name must be between 2 and 30 characters";
//   }

//   if (Validator.isEmpty(data.name)) {
//     errors.name = "Name is required";
//   }

//   if (Validator.isEmpty(data.email)) {
//     errors.email = "Email is required";
//   }

//   if (!Validator.isEmail(data.email)) {
//     errors.email = "Email is invalid";
//   } else {
//     // Проверка уникальности email
//     const user = await DbClient.user.findUnique({
//       where: { email: data.email },
//     });
//     if (user) {
//       errors.email = "Email already exists";
//     }
//   }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = "Password field is required";
//   }

//   // if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
//   //   errors.password = "Password must be atleast 6 characters";
//   // }

//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = "Confirm password is required";
//   }

//   if (!Validator.equals(data.password, data.password2)) {
//     errors.password2 = "Password must match";
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };
