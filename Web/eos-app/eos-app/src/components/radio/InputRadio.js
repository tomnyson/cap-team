import React from "react";
import { useController } from "react-hook-form";

const InputRadio = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <label className="cursor-pointer custom-radio">
      <input
        {...field}
        type="radio"
        value={props.value}
        className="hidden"
        checked={props.checked}
      />
      <div className="w-[20px] h-[20px] bg-white rounded-full border border-black"></div>
    </label>
  );
};

export default InputRadio;
