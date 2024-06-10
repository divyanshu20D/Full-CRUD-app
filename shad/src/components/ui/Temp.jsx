import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Temp = ({ setShowTemp, getData }) => {
  const [studentData, setStudentData] = useState({
    firstName: "",
    LastName: "",
    Email: "",
    CourseEnrollment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/create",
        studentData
      );
      console.log(response.data);
      // alert("Student created successfully");
      Swal.fire("Student created successfully");
      setStudentData({
        firstName: "",
        LastName: "",
        Email: "",
        CourseEnrollment: "",
      });
      getData();
      setShowTemp((prev) => !prev);
    } catch (err) {
      console.error(err);
      // alert("Error while creating student");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="bg-white px-4 pb-3 rounded-lg flex flex-col gap-4 w-[400px]">
        <div
        //   className="float-right"
        //   onClick={() => setShowTemp((prev) => !prev)}
        >
          <button
            onClick={() => setShowTemp((prev) => !prev)}
            className="float-right font-semibold text-xl"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto pb-4">
          <div className="mb-5 w-[300px]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="email"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="First Name"
              name="firstName"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="password"
              name="LastName"
              onChange={handleChange}
              placeholder="Last Name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="Email"
              placeholder="user@gmail.com"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Course Enrolled
            </label>
            <input
              type="text"
              name="CourseEnrollment"
              onChange={handleChange}
              id="password"
              placeholder="Last Name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create New User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Temp;
