import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Update = ({ setShowUpdate, getData, tempRecord }) => {
  const [editData, setEditData] = useState({
    id: tempRecord._id,
    firstName: tempRecord.firstName,
    LastName: tempRecord.LastName,
    Email: tempRecord.Email,
    CourseEnrollment: tempRecord.CourseEnrollment,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3000/student/" + editData.id,
        editData
      );
      console.log(response.data);
      Swal.fire("Student updated succesfully");
      getData();
      setShowUpdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-[99999]">
        <div className="bg-white px-4 rounded-lg flex flex-col gap-4 w-[400px]">
          <div
          //   className="float-right"
          //   onClick={() => setShowTemp((prev) => !prev)}
          >
            <button
              onClick={() => setShowUpdate((prev) => !prev)}
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
                name="firstName"
                id="email"
                onChange={handleChange}
                value={editData.firstName}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="First Name"
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
                value={editData.LastName}
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
                value={editData.Email}
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
                value={editData.CourseEnrollment}
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
              Update User
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
