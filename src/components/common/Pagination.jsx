import React from "react";

// Helper to produce an array of page items with numbers and '...' where appropriate.
// For example: [1, 2, 3, '...', 10]
const getPages = (current, total, siblingCount = 1) => {
  const totalNumbers = siblingCount * 2 + 5; // first, last, current +/- siblings, and two dots
  if (total <= totalNumbers)
    return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  pages.push(1);

  if (left > 2) pages.push("...");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < total - 1) pages.push("...");

  pages.push(total);
  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalRecords = 0,
  pageSize = 10,
}) => {
  if (totalPages <= 1) return null; // No pagination needed for single page

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages = getPages(currentPage, totalPages);

  const calculatedStart = (currentPage - 1) * pageSize + 1;
  const calculatedEnd = Math.min(currentPage * pageSize, totalRecords);
  const startRecord =
    totalRecords === 0 ? 0 : Math.min(calculatedStart, totalRecords);
  const endRecord = totalRecords === 0 ? 0 : calculatedEnd;

  return (
    <div className="flex justify-center md:justify-between flex-wrap   items-center gap-3 mt-6">
        {/* Stats */}
      <div className="text-sm text-gray-600">
        Showing {startRecord} - {endRecord} of {totalRecords} items • Page{" "}
        {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-accent cursor-not-allowed"
              : "bg-primary text-text-secondary hover:bg-primary/80"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-3 py-1 bg-accent text-text-secondary rounded  text-sm">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 rounded text-sm ${
                  p === currentPage
                    ? "bg-primary text-text-secondary font-semibold"
                    : "bg-accent  hover:bg-accent/80"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80"
          }`}
        >
          Next
        </button>
      </div>

      
    </div>
  );
};

export default Pagination;
