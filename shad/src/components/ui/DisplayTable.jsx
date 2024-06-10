import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Temp from "./Temp";
import Update from "./Update";
import Pagination from "./Pagination";
import Search from "./Search";

const DisplayTable = () => {
  const [data, setData] = useState([]);
  const [showTemp, setShowTemp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [tempRecord, setTempRecord] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/paginatedStudents")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Not now!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/student/${id}`
          );
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Record Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getData();
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  const handleDeleteMultiple = async () => {
    Swal.fire({
      title: "Are you Sure you want to Delete All Seleced User",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm Sure",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        async function deleteSelectedStudents(selectedIds) {
          if (selectedIds.length == 0) {
            Swal.fire("No student Selected");
            return res.json({ message: "No user Selected" });
          } else {
            try {
              const response = await axios.post(
                "http://localhost:3000/deleteMany",
                {
                  ids: selectedIds,
                },
                console.log("try")
              );
              console.log(response);
              Swal.fire("All Selected Students deleted successfully");
              setSelectedIds([]);
              getData();
            } catch (error) {
              console.error(error);
              Swal.fire(
                "Error deleting selected students",
                error.message,
                "error"
              );
            }
          }
        }
        deleteSelectedStudents(selectedIds);
      }
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <>
      <div className="p-10">
        <div className="mb-4">
          <p className="text-5xl text-center">Student-Course Data</p>
        </div>
        <div className="flex justify-between mb-5">
          <div>
            {showCheck && (
              <Button
                className="bg-red-900 hover:bg-red-700"
                onClick={handleDeleteMultiple}
              >
                Delete Multiple
              </Button>
            )}
          </div>
          <Search setData={setData} />
          <div className="mb-4">
            <Button
              className="bg-green-700 hover:bg-green-400"
              onClick={() => setShowTemp((prev) => !prev)}
            >
              Create User
            </Button>
            <Button
              onClick={() => setShowCheck((prev) => !prev)}
              className="bg-orange-600 hover:bg-orange-400 ml-4"
            >
              Select Multiple
            </Button>
          </div>
        </div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              {showCheck && <TableHead className="w-[100px]"></TableHead>}
              <TableHead className="w-[200px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Courses</TableHead>
              <TableHead className="text-center">UserID</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {showCheck && (
                  <TableCell scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-${item._id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                      <label
                        htmlFor={`checkbox-${item._id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </TableCell>
                )}

                <TableCell className="font-medium">{item.firstName}</TableCell>
                <TableCell>{item.LastName}</TableCell>
                <TableCell>{item.Email}</TableCell>
                <TableCell className="text-center">
                  {item.CourseEnrollment}
                </TableCell>
                <TableCell className="text-center">{item._id}</TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => handleDelete(item._id)}
                    className="mr-5 bg-red-700 hover:bg-red-400"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setTempRecord(item);
                      setShowUpdate((prev) => !prev);
                    }}
                    className="bg-blue-700 hover:bg-blue-400"
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showTemp && <Temp setShowTemp={setShowTemp} getData={getData} />}
      {showUpdate && (
        <Update
          setShowUpdate={setShowUpdate}
          getData={getData}
          tempRecord={tempRecord}
        />
      )}
      <Pagination setData={setData} />
    </>
  );
};

export default DisplayTable;
