const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();


class categoryController {
  async addCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await DbClient.category.create({
        data: {
          name,
        },
      });
      return res.send(category);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Category creation error" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await DbClient.category.findMany();
      return res.send(categories);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Categories error" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await DbClient.category.findUnique({
        where: {
          id: Number(id),
        },
      });
      return res.send(category);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Category error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await DbClient.category.delete({
        where: {
          id: Number(id),
        },
      });
      return res.send(category);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Category deletion error" });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await DbClient.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      return res.send(category);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: "Category update error" });
    }
  }
}

module.exports = new categoryController();
