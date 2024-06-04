import React from "react";
import avatar from "../../../../public/icons/avatar.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full bg-white h-[64px]">
      <div className=" w-full items-center h-full px-5 flex justify-end">
        <Image
          src={avatar}
          alt="profile avatar"
          className="h-[32px] w-[32px] rounded-[16px]"
        />
      </div>
    </div>
  );
};

export default Navbar;
