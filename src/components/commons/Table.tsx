"use client"
import handleFetch from "@/services/handleFetch";
import notification from "@/utilities/notification";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { HiQrcode } from "react-icons/hi";
import { useMutation } from "react-query";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
}

const EmployeeTable = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cookies] = useCookies(['uploadedList']);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (cookies.uploadedList) {
      const formattedList = cookies.uploadedList.map((emp: any) => ({
        id: emp.staffId,
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.emailAddress,
        phone: emp.phoneNumber,
        role: emp.role,
        department: emp.department,
        location: emp.location,
      }));
      setFilteredEmployees(formattedList);
    }
  }, [cookies.uploadedList]);

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees);
    }
  };

  const handleSelectOne = (employee: Employee) => {
    const newSelectedEmployees = [...selectedEmployees];
    if (selectedEmployees.includes(employee)) {
      newSelectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
    } else {
      newSelectedEmployees.push(employee);
    }
    setSelectedEmployees(newSelectedEmployees);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (cookies.uploadedList) {
      const searchResults = cookies.uploadedList.filter(
        (emp: any) =>
          emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchQuery.toLowerCase())
      ).map((emp: any) => ({
        id: emp.staffId,
        name: `${emp.firstName} ${emp.lastName}`,
        email: emp.emailAddress,
        phone: emp.phoneNumber,
        role: emp.role,
        department: emp.department,
        location: emp.location,
      }));
      setFilteredEmployees(searchResults);
    }
  }, [searchQuery, cookies.uploadedList]);


  const handleSubmit = () => {
    if (selectedEmployees.length === 0) {
      notification({
        title: 'Selection Required',
        message: 'Please select at least one employee to generate QR code.',
        type: 'error'
      });
      return;
    }

    const staffData = selectedEmployees.map((emp) => ({
      staffId: emp.id,
      firstName: emp.name.split(" ")[0],
      lastName: emp.name.split(" ")[1] || "",
      phoneNumber: emp.phone,
      emailAddress: emp.email,
      department: emp.department,
    }));
  
    const payload = { staffData };
  
    fileUploadMutation.mutate({
      endpoint: 'qrcodes/generate',
      method: 'POST',
      body: payload,
      auth: true
    });
  };
  
  
  const handleDownload = (responseData: any) => {
    if (responseData) {
      const base64Data = responseData;
      handleFetch({
        endpoint: `qrcodes/download-zip`,
        method: 'POST',
        body: { base64Data },
        auth: true
      });
      const anchor = document.createElement('a');
      anchor.href = `data:application/zip;base64,${base64Data}`;
      anchor.download = 'file.zip';
  
      document.body.appendChild(anchor);
  
      anchor.click();
  
      document.body.removeChild(anchor);
  
    }
  };
  
  const fileUploadMutation = useMutation(handleFetch, {
    onSuccess: (data) => {
      if (data && data.responseData) {
        handleDownload(data.responseData);
      }
    },
    onError: () => {
      setLoadingEmployees(null);
    }
  });

  return (
    <div className="p-2 pr-3 w-full">
      <div className="flex gap-x-[16px] items-center mb-4 bg-white w-full px-5 h-[78px]">
        <input
          type="text"
          placeholder="Search by name or department"
          className="border border-[#D1D5DB] bg-[#F9FAFB] focus:outline-none focus:ring-1 focus:ring-primary py-3 px-4 xl:w-[500px] lg:w-[400px] rounded-lg"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="h-8 w-[1px] bg-[#E5E7EB]" />
        <button
          className="text-white flex items-center rounded-lg bg-primary px-3 py-2 gap-x-2 font-medium"
          disabled={selectedEmployees.length === 0}
          onClick={handleSubmit}
        >
          <HiQrcode size={20} /> {loadingEmployees ? "Generating..." : "Generate QR Codes"}
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="bg-white w-full -mt-3 whitespace-nowrap text-left rtl:text-right">
          <thead>
            <tr className="h-[46px] bg-[#F3F4F6] text-sm font-bold text-[#4B5563]">
              <th className="p-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === filteredEmployees.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 border-b" scope="col">Name</th>
              <th className="p-4 border-b" scope="col">Phone Number</th>
              <th className="p-4 border-b" scope="col">Role</th>
              <th className="p-4 border-b" scope="col">Department</th>
              <th className="p-4 border-b" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className={selectedEmployees.includes(emp) ? "bg-gray-100" : ""}
                style={{ color: "#111928" }}
              >
                <td className="p-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(emp)}
                    onChange={() => handleSelectOne(emp)}
                  />
                </td>
                <td className="p-4 border-b">
                  <div className="flex flex-col">
                    <span className="text-[#111928] font-bold">{emp.name}</span>
                    <span className="text-sm text-gray-500">{emp.email}</span>
                  </div>
                </td>
                <td className="p-4 border-b">{emp.phone}</td>
                <td className="p-4 border-b">{emp.role}</td>
                <td className="p-4 border-b">{emp.department}</td>
                <td className="p-4 border-b flex gap-x-2 items-center">
                  <button className="text-white flex items-center rounded-lg bg-primary px-3 py-2 gap-x-2 font-medium"
                    onClick={handleSubmit}
                    disabled={loadingEmployees === emp.id}
                  >
                    <HiQrcode />
                    {loadingEmployees ? "Generating..." : "Generate QR Code"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
