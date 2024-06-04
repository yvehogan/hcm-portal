import React, { useState } from "react";
import { useField } from "formik";
import { GoEyeClosed } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";
import { CgAsterisk } from "react-icons/cg";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  type: "text" | "email" | "password";
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  required,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className="flex text-sm font-bold text-HCMblack"
      >
        {label}
        {required ? (
          <CgAsterisk className="text-primary" />
        ) : (
          ""
        )}
      </label>
      <div className="relative mt-2">
        <input
          {...field}
          {...props}
          type={inputType}
          className="w-full text-[#A3AED0] text-sm px-3 py-4 border border-[#D1D5DB]  rounded-[8px] h-[42px] placeholder:text-[#A3AED0] focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <GoEyeClosed
                size="24px"
                color="#A3AED0"
              />
            ) : (
              <AiOutlineEye
                color="#A3AED0"
                size="24px"
              />
            )}
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-sm mt-1">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
