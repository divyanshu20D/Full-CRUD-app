const student = require("../models/student.model")

const getStudents = async (req,res) => {
    const allStudents = await student.find({})
    if (allStudents) {
        res.status(200).json({
            data: allStudents,
        })
    }
    else {
        res.status(400).json({
            message: "Error while fetching all the Students"
        })
    }
}

const createStudent = async(req,res) => {
    try {
        const newStudent = new student(req.body)
        
        await newStudent.save();
        res.status(200).json(newStudent)
    }
    catch {
        res.status(400).json("Error while creating student")
    }
}

const getParticularStudent = async (req,res) => {
    // const { id } = req.params
    // const stud = await student.find({ _id: id })
    // if (stud) {
    //     res.status(200).json({
    //         data: stud
    //     })
    // }
    // else {
    //     res.status(400).json({
    //         message: "No Data of that UserId"
    //     })
    // }
}

const UpdateStudent = async(req,res) => {
    const { id } = req.params

    const stud = await student.findOneAndUpdate({ _id: id }, req.body)
    if (stud) {
        res.status(200).json({
            data: stud
        })
    }
    else {
        res.status(400).json({
            message: "No Data to update with that userId"
        })
    }
}

const deleteStudent = async(req,res) => {
    const { id } = req.params
    const deleteStudent = await student.findByIdAndDelete({_id : id})
    if(deleteStudent){
        res.status(200).json({messgae : "User Deleted"})
    }
    else{
        res.status(400).json({message : "Error while deleting User"})
    }

}

const deleteMany = async(req,res) => {
    const { ids } = req.body
    try {
        const response = await student.deleteMany({_id : {$in : ids}})
        console.log(response);
        res.status(200).json({message : "Selected Students deleted Successfully"})
    } catch (error) {
        console.log(error)
        res.json({message : "Error while deleting seleted Users"})
    }
}

const getAllStudents = async (req,res) => {
    const {firstName} = req.query
    console.log("sss",firstName)
    const myData = await student.find(req.query)
    res.status(200).json({myData})
}

const getPaginatedStudents = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    try {
        const students = await student.find().skip(skip).limit(limit);
        const totalStudents = await student.countDocuments();
        res.status(200).json({
            data: students,
            total: totalStudents,
            page,
            totalPages: Math.ceil(totalStudents / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching students" });
    }
};

// const getspecificStudents = async (req,res) => {
//     console.log("Hello")
    // console.log(req.query)
    // try {
    //     const studentData = student.find(req.query);
    // res.status(200).json({ data : studentData})
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({
    //         message : "Error while searhing"
    //     })
    // }
// }

const searchStudents = async (req, res) => {
    const query = {};
    if (req.query.firstName) {
        query.firstName = { $regex: req.query.firstName, $options: 'i' }; 
    }
    if (req.query.LastName) {
        query.LastName = { $regex: req.query.LastName, $options: 'i' };
    }
    if (req.query.Email) {
        query.Email = { $regex: req.query.Email, $options: 'i' };
    }
    if (req.query.CourseEnrollment) {
        query.CourseEnrollment = { $regex: req.query.CourseEnrollment, $options: 'i' };
    }

    try {
        const students = await student.find(query);
        res.status(200).json({
            data: students,
            total: students.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while searching students" });
    }
};

// const searching = async () => {
//     const queryObj = {};
//     if(req.query){
//         queryObj.firstName = { $regex: req.query.firstName, $options: "i"}
//         queryObj.LastName = { $regex: req.query.LastName, $options: "i"}
//         queryObj.Email = { $regex: req.query.Email, $options: "i"}
//         queryObj.CourseEnrollment = { $regex: req.query.CourseEnrollment, $options: "i"}
//     }
//     try{
//         const student = await student.find(queryObj);
//         res.status(200).json({
//             data : student,
//             message : "Got the student"
//         })
//     }
//     catch(error){
//         res,status(400).json({
//             message : "Error while getting the student"
//         })
//     }
// }

module.exports = {
    getStudents,
    createStudent,
    getParticularStudent,
    UpdateStudent,
    deleteStudent,
    deleteMany,
    getAllStudents,
    getPaginatedStudents,
    searchStudents
}

