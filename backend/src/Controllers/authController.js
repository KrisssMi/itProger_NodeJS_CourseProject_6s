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
}

module.exports = new authController();
