import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type Props = {
  totalItems: number;
  className?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
};

const TablePagination = ({
  totalItems,
  className,
  currentPage,
  onPageChange,
  itemsPerPage,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

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
          {/* Set the Start and End Page Number */}
          {currentPage} - {totalPages}
          {/* {currentPage} - {end} */}
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
        {itemsPerPage} - {end} من
        <span>{totalItems}</span>
      </div> */}
    </div>
  );
};

export default React.memo(TablePagination);
