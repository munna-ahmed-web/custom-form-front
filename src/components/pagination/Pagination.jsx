const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handleChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      handleChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      <button
        onClick={handlePrev}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:bg-gray-400"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:bg-gray-400"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
