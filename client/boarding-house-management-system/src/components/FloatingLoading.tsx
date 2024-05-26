import React from 'react';
import '@/styles/floatingLoading.css';

const FloatingLoading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50 bg-opacity-75 z-[999] overflow-hidden mx-[-5%]">
      <div className="dot-floating"></div>
    </div>
  );
};

export default FloatingLoading;
