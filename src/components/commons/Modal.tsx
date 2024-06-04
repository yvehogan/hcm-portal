import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 py-20">
      <div
        className={`${className} bg-white rounded-lg shadow-lg`}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-base">{title}</p>
          <button
            className="text-black hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
