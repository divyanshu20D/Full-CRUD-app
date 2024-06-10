const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName: String,
    LastName: String,
    Email: String,
    CourseEnrollment: String,
    // status: {
    //     type: String,
    //     enum: ['Active', 'Inactive', 'Deleted']
    // }
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student

