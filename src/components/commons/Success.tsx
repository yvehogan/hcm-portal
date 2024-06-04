import React from "react";
import success from "../../../public/icons/success.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuccessProps {
  setShowSucess: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Success: React.FC<SuccessProps> = ({
  setShowSucess
}) => {
  const router = useRouter();
  return (
    <div className="bg-white w-[600px] flex flex-col justify-center items-center h-[350px] rounded-[13px] gap-y-3 text-center">
      <Image
        src={success}
        alt="success icon"
      />
      <p className="font-bold text-3xl">File Upload</p>
      <p className="text-black/50 text-lg">
        Your excel file has been uploaded successfully
      </p>
      <button
        onClick={() => {
          router.push("/dashboard");
          setShowSucess(false);
        }}
        className={`bg-primary text-white mt-4 rounded-[13px] p-3 font-medium`}
      >
        Continue
      </button>
    </div>
  );
};

export default Success;
