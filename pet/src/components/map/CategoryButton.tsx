import React from 'react';
import styled from 'styled-components';
import MapCatIcon from '../../assets/images/MapCat.png';

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
  highlightColor: string; // 강조 색상 prop 추가
}
const StyledButton = styled.button<{ highlightColor: string }>`
  width: 170px;
  height: 47px;
  background-color: #E5E5E5;
  color: black;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background-color: ${props => props.highlightColor};
    transition: background-image 0.3s;
  }

  &:hover:after {
    background-image: url(${MapCatIcon}); // 아이콘 이미지 사용
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick, highlightColor }) => {
  return (
    <StyledButton onClick={onClick} highlightColor={highlightColor}>
      {label}
    </StyledButton>
  );
};

export default CategoryButton;