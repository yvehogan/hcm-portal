"use client";
import React from "react";

interface CheckboxInputProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
  colorLabel?: string;
  span?: string;
}

const CheckboxInput = ({
  checked,
  className,
  onChange,
}: CheckboxInputProps) => {
  return (
    <label
      className={`inline-flex text-xs items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`w-5 h-5  rounded ${
          checked
            ? "bg-primary"
            : "border-2 border-[#A3AED0]"
        } inline-block mr-2 relative`}
      >
        {checked && (
          <svg
            className="fill-current text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="12"
            height="12"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CheckboxInput;
