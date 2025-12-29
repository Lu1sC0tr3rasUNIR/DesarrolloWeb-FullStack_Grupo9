import React from 'react';
import { IPagination } from '@/interfaces/components/IPagination.tsx';
import Icons from './icons';

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const iconColor = () => {
    return "rgb(255, 255, 255)"; 
  }

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <Icons name="arrow-left" color={iconColor()} />
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Siguiente
        <Icons name="arrow-right" color={iconColor()} />
      </button>
    </div>
  );
};

export default Pagination;
