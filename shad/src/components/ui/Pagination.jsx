import { useEffect, useState } from "react";
import { Button } from "./button";
import axios from "axios";

const Pagination = ({ setData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState();

  const getData = (currentPage) => {
    axios
      .get(`http://localhost:3000/paginatedStudents?page=${currentPage}`)
      .then((res) => {
        setData(res.data.data);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < details.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="float-right pr-10">
        <Button
          className="mr-4"
          onClick={handlePrev}
          disabled={currentPage == 1 ? true : false}
        >
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage == details?.totalPages ? true : false}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
