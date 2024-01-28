import React from 'react';
import styled from 'styled-components';

interface QuantityInputProps {
  onclickQuantityHandler: (num: number) => void;
  quantity: number;
}
function QuantityInput({ quantity, onclickQuantityHandler }: QuantityInputProps): JSX.Element {
  return (
    <>
      <Button
        onClick={() => {
          onclickQuantityHandler(-1);
        }}>
        -
      </Button>
      {quantity}
      <Button
        onClick={() => {
          onclickQuantityHandler(1);
        }}>
        +
      </Button>
    </>
  );
}

export default QuantityInput;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0; /* 내부 여백을 없애는 속성 추가 */
  transition: background-color 0.3s; /* 변화를 부드럽게 만들기 위한 트랜지션 속성 추가 */
  font-size: 20px;
  &:hover {
    font-weight: bold;
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`;
