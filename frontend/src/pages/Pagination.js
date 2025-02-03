import React, { useEffect, useState } from 'react';
import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const [visiblePages, setVisiblePages] = useState(5); // Default to 5 pages
  const [prevdisabled, setPrevDisabled] = useState(true);
  const [nextdisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setVisiblePages(window.innerWidth <= 768 ? 3 : 5); // Change based on screen width
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPrevDisabled(currentPage === 1 );
    setNextDisabled(currentPage === totalPages );
  }, [currentPage, totalPages]); // Recalculate disabled buttons whenever currentPage or totalPages changes

  const pageNumbers = [];
  let startPage, endPage;

  if (totalPages <= visiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfVisible = Math.floor(visiblePages / 2);
    startPage = Math.max(currentPage - halfVisible, 1);
    endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
    

  }

  return (
    <div className="pagination">
      <button
        id="i417"
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={prevdisabled}
      >
        {'<  '} Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-button ${number === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        id="i418"
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={nextdisabled}
      >
        Next {'  >'}
      </button>
    </div>
  );
}

export default Pagination;
