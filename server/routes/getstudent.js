const express = require("express")
const router = express.Router();
const { getStudents, createStudent, getParticularStudent, UpdateStudent, deleteStudent, deleteMany, getAllStudents, getPaginatedStudents , searchStudents, searching } = require("../controllers/getStudent.route.js");

 router.get("/", getStudents);

 router.post("/create", createStudent);

router.get("/student/:id", getParticularStudent);

router.patch("/student/:id", UpdateStudent);

router.delete("/student/:id", deleteStudent);

router.post("/deleteMany", deleteMany);

router.get("/students", getAllStudents);

router.get("/paginatedStudents", getPaginatedStudents);

router.get("/search", searchStudents)

// router.get("/searching", searching)

//router.get("/search", getspecificStudents)

module.exports = router
