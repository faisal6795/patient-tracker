import React from "react";

const Radio = ({ options, checkedValue, onChange, label }) => {
  return (
    <div className="relative">
      <p className="text-purple-600 mb-2 text-sm font-medium">{label}</p>
      <div class="relative flex items-center rounded-lg text-white border-2 border-purple-600 w-full overflow-hidden">
        {options.map((value, index) => (
          <div
            key={index}
            className="flex-grow border-r-2 last:border-r-0 border-purple-600"
          >
            <input
              value={value}
              name="scaling"
              id={value}
              type="radio"
              className="hidden peer"
              checked={value === checkedValue}
              onChange={onChange}
            />
            <label
              htmlFor={value}
              className="flex-1 p-2 cursor-pointer flex justify-center items-center font-medium text-sm text-purple-600 peer-checked:text-white peer-checked:bg-purple-600"
            >
              {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
