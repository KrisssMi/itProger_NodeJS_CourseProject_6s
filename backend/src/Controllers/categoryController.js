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
      return res.json(category);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Category creation error" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await DbClient.category.findMany();
      return res.json(categories);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Categories error" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const category = await DbClient.category.findUnique({
        where: {
          id,
        },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.json(category);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Category error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      // Удаление категории и всех связанных с ней курсов в рамках одной транзакции
      await DbClient.$transaction(async (prisma) => {
        await DbClient.course.deleteMany({
          where: {
            category: Number(id),
          },
        });

        const category = await DbClient.category.delete({
          where: {
            id: Number(id),
          },
        });

        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
  
        return res.json(category);
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Category deletion error" });
    }
  }

  async updateCategory(req, res) {
    try {
      const id = parseInt(req.query.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const { name } = req.body;
      const category = await DbClient.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.json(category);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Category update error" });
    }
  }
}

module.exports = new categoryController();
