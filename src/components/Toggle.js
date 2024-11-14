import React from "react";

const Toggle = ({ id, isChecked, handleToggle }) => {
  return (
    <div className="flex justify-between items-center text-purple-600 text-xl font-bold">
      <span>Treatment Done</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          name={id}
          id={id}
          type="checkbox"
          checked={isChecked}
          className="sr-only peer"
          onChange={handleToggle}
        />
        <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:text-sm  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:top-2 after:left-2 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
      </label>
    </div>
  );
};

export default Toggle;
