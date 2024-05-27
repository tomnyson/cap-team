import React from "react";

const FormRow = ({ children, numberCols = 2, className }) => {
  switch (numberCols) {
    case 1:
      return <div className={`grid grid-cols-1 gap-x-[45px]`}>{children}</div>;
    case 2:
      return <div className={`grid grid-cols-2 gap-x-[45px]`}>{children}</div>;
    default:
      return (
        <div className={`grid  grid-cols-3 gap-x-[45px] `}>{children}</div>
      );
  }
};

export default FormRow;
