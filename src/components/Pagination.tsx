import React from 'react';
import { IPagination } from '@/interfaces/components/IPagination.tsx';
import Icons from './icons';
import Button from './button';

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
      <Button 
        label="Anterior" 
        icon="arrow-left" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        variant="primary"
      />
      <span className="pagination__info">
        Página {currentPage} de {totalPages}
      </span>
      <Button 
        label="Siguiente" 
        icon="arrow-right" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        variant="primary"
      />
    </div>
  );
};

export default Pagination;
