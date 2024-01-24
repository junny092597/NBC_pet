import React from 'react';
interface Item {
  id: number;
  price: number;
  name: string;
  img: string;
  category: string;
  type: string;
}
interface QuantityInputProps {
  onclickQuantityHandler: (num: number) => void;
  quantity: number;
}
function QuantityInput({ quantity, onclickQuantityHandler }: QuantityInputProps): JSX.Element {
  return (
    <>
      <button
        onClick={() => {
          onclickQuantityHandler(-1);
        }}>
        -
      </button>
      {quantity}
      <button
        onClick={() => {
          onclickQuantityHandler(1);
        }}>
        +
      </button>
    </>
  );
}

export default QuantityInput;
