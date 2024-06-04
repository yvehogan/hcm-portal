"use client";

import React from "react";
import logo1 from "../../../../public/icons/logo1.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiPieChart2Fill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { useCookies } from "react-cookie";
import { logout } from "@/services/auth";

const Sidebar = () => {
  const pathname = usePathname();
  const [cookie] = useCookies(['data']);
  const handleLogout = () => {
    logout('/');
  };

  return (
    <div className="w-[250px] pt-4  flex flex-col bg-primary fixed h-screen">
      <div className="px-5">
        <Image
          src={logo1}
          alt="wema bank logo"
        />
      </div>
      <div className="mt-12 flex flex-col gap-y-4 text-white">
        <Link
          href="/dashboard"
          className={`${
            pathname.includes("/dashboard") &&
            "bg-[#C4C4C440] py-3 rounded-r-lg w-[90%]"
          } flex items-center px-5 gap-x-3 text-sm font-medium`}
        >
          <RiPieChart2Fill size={25} /> Dashboard
        </Link>
        <button
          className={`hover:bg-[#C4C4C440] py-3 hover:rounded-r-lg hover:w-[90%]
          flex items-center px-5 gap-x-3 text-sm font-medium`}
          onClick={handleLogout}
        >
          <HiOutlineLogout size={25} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
