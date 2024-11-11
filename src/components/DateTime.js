import React from "react";
import Input from "./Input";

const DateTime = ({ editedPatient, handleChange }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="followUpDate"
        className="text-purple-600 mb-2 text-sm font-medium"
      >
        Follow Up Date
      </label>
      <Input
        value={editedPatient.followUpDate || ""}
        onChange={handleChange}
        id="followUpDate"
        type="datetime-local"
        className="bg-transparent appearance-none"
        min={new Date().toISOString().split("T")[0]}
        step={60 * 30}
        pattern="dd-MM-yyyyTHH:mm"
      />
    </div>
  );
};

export default DateTime;
