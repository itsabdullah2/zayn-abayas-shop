import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type Props = {
  totalItems: number;
  className?: string;
};

const TablePagination = ({ totalItems, className }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, _setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Calculate the range of items being displayed
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1">
        <button
          className={`cursor-pointer hover:bg-light-gray py-3 px-3 rounded-full duration-150 active:translate-x-[2px] ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-light-gray text-primary"
          }`}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          <FaArrowRightLong />
        </button>
        <span dir="ltr">
          {start} - {end}
        </span>
        <button
          className={`cursor-pointer hover:bg-light-gray py-3 px-3 rounded-full duration-150 active:translate-x-[-2px] ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-light-gray text-primary"
          }`}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          <FaArrowLeftLong />
        </button>
      </div>
      {/* <div dir="ltr" className=" flex items-center gap-2">
        {start} - {end} من
        <span>100</span>
      </div> */}
    </div>
  );
};

export default React.memo(TablePagination);
