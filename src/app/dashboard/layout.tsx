import Navbar from "@/components/Layout/navbar";
import Sidebar from "@/components/Layout/sidebar";
import React from "react";
const layout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative min-h-screen bg-[#F3F4F6]">
      <Sidebar />
      <div className="ml-[14rem]">
        <Navbar />
      </div>
      <div className="pl-[2rem] pr-1 relative mt-6 ml-[14rem]">
        {children}
      </div>
    </div>
  );
};
export default layout;
