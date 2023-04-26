const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const jwt = require("jsonwebtoken");
// Load Validation
const validateProfileInput = require("../Validation/profile");
const validateEducationInput = require("../Validation/education");

class profileController {
  async addProfile(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      let id; // Объявляем переменную i
      if (authorizationHeader) {
        console.log("auth header is exist");
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          console.log("My token: " + token);
          const decodedToken = jwt.verify(token, process.env.SECRET);
          const id = decodedToken.id;
          console.log(id);
        } else {
          console.error("Invalid Authorization header format");
        }
      

        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const { errors, isValid } = validateProfileInput(req.body);
        // Check Validation
        if (!isValid) {
          // Return any errors with 400 status
          return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.userId = user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.githubusername)
          profileFields.githubusername = req.body.githubusername;
        // Skills - Split into array
        if (typeof req.body.skills !== "undefined") {
          profileFields.skills = req.body.skills.split(",");
        }

        const profile = await DbClient.profile.findUnique({
          where: { userId: user.id },
        });

        if (profile) {
          // Update
          const updatedProfile = await DbClient.profile.update({
            where: { userId: user.id },
            data: profileFields,
          });
          res.json(updatedProfile);
        } else {
          // Create
          // Check if handle exists
          const existingProfile = await DbClient.profile.findFirst({
            where: { handle: profileFields.handle },
          });

          if (existingProfile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }

          // Save Profile
          const createdProfile = await DbClient.profile.create({
            data: profileFields,
          });
          res.json(createdProfile);
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  async getAllProfiles(req, res) {
    try {
      const profiles = await DbClient.profile.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
          education: true,
        },
      });

      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ noprofile: "There are no profiles" });
      }

      res.json(profiles);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch profiles" });
    }
  }

  async getProfileByCurrentUser(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;
      let id; // Объявляем переменную i
      if (authorizationHeader) {
        console.log("auth header is exist");
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          console.log("My token: " + token);
          const decodedToken = jwt.verify(token, process.env.SECRET);
          const id = decodedToken.id;
          console.log(id);
        } else {
          console.error("Invalid Authorization header format");
        }

        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });
        console.log(user);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Используем Prisma для поиска профиля пользователя
        const profile = await DbClient.profile.findFirst({
          where: {
            userId: user.id,
          },
          include: {
            user: {
              select: {
                name: true, // Включение столбца name из таблицы User
              },
            },
          },
        });

        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  async profileByUserId(req, res) {
    try {
      const errors = {};
      const profile = await DbClient.profile.findFirst({
        where: {
          userId: Number(req.params.user_id),
        },
        include: {
          user: {
            select: {
              name: true, // Включение столбца name из таблицы User
            },
          },
        },
      });

      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "There is no profile for this user" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err); // Вывод ошибки в консоль
      res.status(404).json({ profile: "There is no profile for this user" });
    }
  }

  async profileByHandle(req, res) {
    try {
      const profile = await DbClient.profile.findFirst({
        where: {
          handle: req.params.handle,
        },
        include: {
          user: {
            select: {
              name: true, // Включение столбца name из таблицы User
            },
          },
        },
      });

      if (!profile) {
        return res
          .status(404)
          .json({ noprofile: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err); // Вывод ошибки в консоль
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  async addEducation(req, res) {
    try {
      const { format } = require("date-fns");
      const { errors, isValid } = validateEducationInput(req.body);
      const token = req.headers.authorization.split(" ")[1];
      const { id } = await jwt.verify(token, process.env.SECRET);
      const user = await DbClient.user.findUnique({
        where: {
          id: id,
        },
      });

      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }

      const profile = await DbClient.profile.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const newEdu = {
        school: req.body.school,
        fieldofstudy: req.body.fieldofstudy,
        from: format(new Date(req.body.from), "yyyy-MM-dd"), // Convert to valid DateTime object
        to: format(new Date(req.body.to), "yyyy-MM-dd"), // Convert to valid DateTime object
      };

      if (!profile.education) {
        profile.education = []; // Initialize education array if it is undefined
      }

      // Add to education array
      profile.education.unshift(newEdu);
      console.log(profile.education);

      const updatedProfile = await DbClient.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          education: profile.education,
        },
      });
      res.json(updatedProfile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add education" });
    }
  }

  async deleteProfile(req, res) {
    // при удалении профиля, удаляется и user
    try {
      const authorizationHeader = req.headers.authorization;
      let id; // Объявляем переменную i
      if (authorizationHeader) {
        console.log("auth header is exist");
        const tokenArray = authorizationHeader.split(" ");
        if (tokenArray.length === 1) {
          const token = tokenArray[0];
          console.log("My token: " + token);
          const decodedToken = jwt.verify(token, process.env.SECRET);
          const id = decodedToken.id;
          console.log(id);
        } else {
          console.error("Invalid Authorization header format");
        }

        const user = await DbClient.user.findFirst({
          where: {
            id: id,
          },
        });

        if (!user || !user.id) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const profile = await DbClient.profile.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!profile) {
          return res.status(404).json({ error: "Profile not found" });
        }

        await DbClient.profile.delete({
          where: {
            id: profile.id,
          },
        });

        res.json({ success: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete profile and user" });
    }
  }
}

module.exports = new profileController();
