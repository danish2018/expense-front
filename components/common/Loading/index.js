import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20 bg-black bg-opacity-70">
      <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-secondary" />
    </div>
    
  );
};

export default Loading;
