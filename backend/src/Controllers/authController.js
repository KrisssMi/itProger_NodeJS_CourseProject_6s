// const { PrismaClient } = require("@prisma/client");
// const DbClient = new PrismaClient();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// //Load input  validation
// const validateRegisterInput = require("../Validation/register");
// const validateLoginInput = require("../Validation/login");

// const generateAccessToken = (id, roles) => {
//   const payload = {
//     id,
//     roles: Array.isArray(roles) ? roles : [roles],
//   };
//   return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
// };

// class authController {
//   async registration(req, res) {
//     try {
//       // const { errors, isValid } = validateRegisterInput(req.body);

//       // // Check Validation
//       // if (!isValid) {
//       //   return res.status(400).json(errors);
//       // }

//       const { id, name, email, password } = req.body;
//       const candidate = await DbClient.user.findUnique({
//         where: {
//           email: email,
//         },
//       });
//       if (candidate) {
//         return res
//           .status(400)
//           .json({ message: "User with this email already exists" });
//       }
//       const hashPassword = await bcrypt.hashSync(password, 5);
//       const user = await DbClient.user.create({
//         data: {
//           id,
//           name,
//           email,
//           role: "USER",
//           password: hashPassword,
//         },
//       });
//       return res.send(user);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Registration error" });
//     }
//   }

//   async login(req, res) {
//     try {
//       // const { errors, isValid } = validateLoginInput(req.body);

//       // // Check Validation
//       // if (!isValid) {
//       //   return res.status(400).json(errors);
//       // }

//       const { email, password } = req.body;
//       const user = await DbClient.user.findUnique({
//         where: {
//           email: email,
//         },
//       });
//       // if (!user) {
//       //   errors.email = "User not found";
//       //   return res
//       //     .status(400)
//       //     .json({ message: `User with email ${email} not found` });
//       // }
//       const validPassword = bcrypt.compareSync(password, user.password);
//       if (!validPassword) {
//         errors.password = "Password incorrect";
//         return res.status(400).json({ message: "Invalid password" });
//       }
//       const token = generateAccessToken(user.id, user.role);
//       return res.json({ token });
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Login error" });
//     }
//   }

//   async getUsers(req, res) {
//     try {
//       const users = await DbClient.user.findMany();
//       return res.json(users);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Get users error" });
//     }
//   }

//   async isAdmin(req, res) {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const { id } = await jwt.verify(token, process.env.SECRET);
//       const user = await DbClient.user.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       if (user.role === "ADMIN") {
//         return res.json({ isAdmin: true });
//       } else {
//         return res.json({ isAdmin: false });
//       }
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Get user error" });
//     }
//   }

//   async currentUser(req, res) {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const { id } = await jwt.verify(token, process.env.SECRET);
//       const user = await DbClient.user.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       return res.json(user);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "Get user error" });
//     }
//   }

//   async getUserById(req, res) {
//     try {
//       const id = parseInt(req.query.id);
//       if (!Number.isInteger(id)) {
//         return res.status(400).json({ message: "Invalid user ID" });
//       }
//       const user = await DbClient.user.findUnique({
//         where: {
//           id,
//         },
//       });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.json(user);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "User error" });
//     }
//   }

//   async updateUser(req, res) {
//     try {
//       const id = parseInt(req.query.id);
//       if (!Number.isInteger(id)) {
//         return res.status(400).json({ message: "Invalid user ID" });
//       }
//       const user = await DbClient.user.findUnique({
//         where: {
//           id,
//         },
//       });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       const { name, email, password, role } = req.body;
//       const userNew = await DbClient.user.update({
//         where: {
//           id: Number(id),
//         },
//         data: {
//           ...req.body,
//         },
//       });
//       return res.json(user);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ message: "User error" });
//     }
//   }
// }

// module.exports = new authController();

const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles: Array.isArray(roles) ? roles : [roles],
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { id, name, email, password } = req.body;
      const candidate = await DbClient.user.findUnique({
        where: {
          email: email,
        },
      });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
      const hashPassword = await bcrypt.hashSync(password, 5);
      const user = await DbClient.user.create({
        data: {
          id,
          name,
          email,
          role: "USER",
          password: hashPassword,
        },
      });
      return res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await DbClient.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with email ${email} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateAccessToken(user.id, user.role);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await DbClient.user.findMany();
      return res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get users error" });
    }
  }

  async isAdmin(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = await jwt.verify(token, process.env.SECRET);
      const user = await DbClient.user.findUnique({
        where: {
          id: id,
        },
      });
      if (user.role === "ADMIN") {
        return res.json({ isAdmin: true });
      } else {
        return res.json({ isAdmin: false });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get user error" });
    }
  }

  async currentUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = await jwt.verify(token, process.env.SECRET);
      const user = await DbClient.user.findUnique({
        where: {
          id: id,
        },
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Get user error" });
    }
  }

  async getUserById(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await DbClient.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "User error" });
    }
  }

    async updateUser(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await DbClient.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { name, email, password, role } = req.body;
      const userNew = await DbClient.user.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "User error" });
    }
  }

}

module.exports = new authController();
