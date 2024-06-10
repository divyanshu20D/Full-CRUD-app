const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser');
const studentRoute = require("./routes/getstudent.js")

mongoose.connect('mongodb://localhost:27017/crud')
.then(() => {
    console.log("Connected to Database")
})
.catch(() => {
    console.log("Mongoose Connection Failed")
})

app.use(express.json())
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}))

app.use("/", studentRoute)

app.listen(3000, () => console.log("Server connected succefully"))




// const studentSchema = new mongoose.Schema({
//     firstName: String,
//     LastName: String,
//     Email: String,
//     CourseEnrollment: String,
     // status: {
     //     type: String,
     //     enum: ['Active', 'Inactive', 'Deleted']
     // }
// })

// const student = mongoose.model('Student', studentSchema)


// create user
// app.post("/create", async (req, res) => {
//     try {
//         const newStudent = new student(req.body)
        
//         await newStudent.save();
//         res.status(200).json(newStudent)
//     }
//     catch {
//         res.status(400).json("Error while creating student")
//     }
// })

// get all user
// app.get("/", async (req, res) => {
//     // const allStudents = await student.find({ status: 'Active' })
//     const allStudents = await student.find({})
//     if (allStudents) {
//         res.status(200).send({
//             data: allStudents,
//         })
//     }
//     else {
//         res.status(400).send({
//             message: "Error while fetching all the Students"
//         })
//     }
// })

//get user of particular id
// app.get("/:id", async (req, res) => {
//     const { id } = req.params
//     const stud = await student.find({ _id: id })
//     if (stud) {
//         res.status(200).send({
//             data: stud
//         })
//     }
//     else {
//         res.status(400).send({
//             message: "No Data of that UserId"
//         })
//     }
// })

// update particular data.
// app.patch("/:id", async (req, res) => {
//     const { id } = req.params

//     const stud = await student.findOneAndUpdate({ _id: id }, req.body)
//     if (stud) {
//         res.status(200).send({
//             data: stud
//         })
//     }
//     else {
//         res.status(400).send({
//             message: "No Data to update with that userId"
//         })
//     }
// })

// Delete particular Data
// app.delete("/:id", async (req, res) => {
//     const { id } = req.params
//     const deleteStudent = await student.findByIdAndDelete({ _id: id })
//     if (deleteStudent) {
//         res.status(200).send({
//             message: "Data Deleted"
//         })
//     }
//     else {
//         res.status(400).send({
//             message: "Error while deleting data"
//         })
//     }
// })

// app.delete("/deleteMany" , async (req,res) => {
//     const { ids } = req.body;
//     try {
//         await student.deleteMany({})
//     }
// })

// app.post("/deleteMany", async (req, res) => {
//     const { ids } = req.body; 
//     try {
//         const s=  await student.deleteMany({_id: {$in : ids}});
//         res.status(200).send({
//             message: "Users Deleted"
//         });
//     } catch (error) {
//         res.status(400).send({
//             message: "Error while deleting users"
//         });
//         console.log(error)
//     }
// });     

