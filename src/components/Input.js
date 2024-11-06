import React from "react";

const Input = ({ value = "", onChange, id, label, type = "text" }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="peer w-full p-2 border-2 border-purple-600 rounded-lg outline-none"
      />
      <label
        htmlFor={id}
        className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-purple-600 peer-focus:top-0 peer-focus:left-3 font-medium text-base peer-focus:text-sm peer-focus:text-purple-600 peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-purple-600 duration-150"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
