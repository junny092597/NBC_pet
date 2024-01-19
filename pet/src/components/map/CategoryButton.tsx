import React from 'react';

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default CategoryButton;
