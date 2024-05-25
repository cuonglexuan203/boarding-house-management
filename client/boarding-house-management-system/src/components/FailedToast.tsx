import React from 'react';
import { motion } from 'framer-motion';
const FailedToast = ({
  failedLabel,
  setIsFailedToastVisible,
}: {
  failedLabel: string;
  setIsFailedToastVisible: (value: boolean) => void;
}) => {
  return (
    <motion.div
      initial={{
        translateX: 400,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 1,
        delay: 0.5,
      }}
      animate={{
        translateX: 0,
      }}
      id="toast-default"
      className="flex items-center w-full mb-4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div role="status">
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          className="w-8 h-8 mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M512 469.333333m-426.666667 0a426.666667 426.666667 0 1 0 853.333334 0 426.666667 426.666667 0 1 0-853.333334 0Z"
            fill="#FFF59D"
          />
          <path
            d="M789.333333 469.333333c0-164.266667-140.8-294.4-309.333333-275.2-128 14.933333-230.4 117.333333-243.2 245.333334-10.666667 98.133333 29.866667 185.6 98.133333 241.066666 29.866667 25.6 49.066667 61.866667 49.066667 102.4v6.4h256v-2.133333c0-38.4 17.066667-76.8 46.933333-102.4 61.866667-51.2 102.4-128 102.4-215.466667z"
            fill="#FBC02D"
          />
          <path
            d="M652.8 430.933333l-64-42.666666c-6.4-4.266667-17.066667-4.266667-23.466667 0L512 422.4l-51.2-34.133333c-6.4-4.266667-17.066667-4.266667-23.466667 0l-64 42.666666c-4.266667 4.266667-8.533333 8.533333-8.533333 14.933334s0 12.8 4.266667 17.066666l81.066666 100.266667V789.333333h42.666667V554.666667c0-4.266667-2.133333-8.533333-4.266667-12.8l-70.4-87.466667 32-21.333333 51.2 34.133333c6.4 4.266667 17.066667 4.266667 23.466667 0l51.2-34.133333 32 21.333333-70.4 87.466667c-2.133333 4.266667-4.266667 8.533333-4.266667 12.8v234.666666h42.666667V563.2l81.066667-100.266667c4.266667-4.266667 6.4-10.666667 4.266666-17.066666s-4.266667-12.8-8.533333-14.933334z"
            fill="#FFF59D"
          />
          <path
            d="M512 938.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
            fill="#5C6BC0"
          />
          <path
            d="M554.666667 960h-85.333334c-46.933333 0-85.333333-38.4-85.333333-85.333333v-106.666667h256v106.666667c0 46.933333-38.4 85.333333-85.333333 85.333333z"
            fill="#9FA8DA"
          />
          <path
            d="M640 874.666667l-247.466667 34.133333c6.4 14.933333 19.2 29.866667 34.133334 38.4l200.533333-27.733333c8.533333-12.8 12.8-27.733333 12.8-44.8zM384 825.6v42.666667L640 832v-42.666667z"
            fill="#5C6BC0"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>

      <div className="ml-3 text-sm font-normal">
        <em className="text-red-500">Failed!</em>
        <br />
        <p className="text-xs font-medium">{failedLabel}</p>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => setIsFailedToastVisible(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default FailedToast;
