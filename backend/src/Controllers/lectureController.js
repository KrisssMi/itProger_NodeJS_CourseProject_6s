const { PrismaClient } = require("@prisma/client");
const DbClient = new PrismaClient();
const path = require("path");
const multer = require("multer");
const { uploadVideo } = require("./videoController.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/static");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 50MB
  },
});

// const uploadVideo = async (req, res) => {
//   try {
//     const filePath = await new Promise((resolve, reject) => {
//       upload.single("video")(req, res, (err) => {
//         if (err) {
//           reject(null);
//         } else {
//           if (req.file == undefined) {
//             resolve(null);
//           } else {
//             resolve(req.file.path);
//           }
//         }
//       });
//     });

//     console.log("File uploaded successfully:", filePath);
//     // Handle the uploaded file path here
//     return filePath;
//   } catch (err) {
//     console.error("File upload failed:", err);
//     // Handle the upload error here
//     return null;
//   }
// };

class lectureController {
  async addLecture(req, res) {
    try {
      const { name, content, course_id } = req.body;

      // //Проверка существования курса
      // const existingCourse = await DbClient.course.findUnique({
      //   where: { id: course_id },
      // });

      // if (!existingCourse) {
      //   // Если курс не найден, возвращаем ошибку
      //   return res.status(404).json({ error: "Course not found" });
      // }

      // Загрузка видео
      const filePath = await new Promise((resolve, reject) => {
        upload.single("video")(req, res, (err) => {
          if (err) {
            reject(null);
          } else {
            if (req.file == undefined) {
              resolve(null);
            } else {
              resolve(req.file.path);
            }
          }
        });
      });
      console.log(data);

      // Создание лекции с информацией о видео
      const lecture = await DbClient.lecture.create({
        data: {
          name,
          content,
          Course: { connect: { id: course_id } }, // Связь с курсом
          videoLink: filePath ? filePath : null,
        },
      });

      console.log("Lecture created successfully:", lecture);

      // Возвращаем созданную лекцию в ответе
      res.json(lecture);
    } catch (err) {
      console.error("Failed to create lecture:", err);
      res.status(500).json({ error: "Failed to create lecture" });
    }
  }
}

module.exports = new lectureController();
