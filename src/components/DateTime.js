import React from "react";
import Input from "./Input";

const DateTime = ({ editedPatient, handleChange }) => {
  const ensureTime = (date) => {
    if (!date) return "";
    return date.includes("T") ? date : `${date}T09:00`;
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="followUpDate"
        className="text-purple-600 mb-2 text-sm font-medium"
      >
        Follow Up Date
      </label>
      <Input
        value={ensureTime(editedPatient.followUpDate)}
        onChange={handleChange}
        id="followUpDate"
        type="datetime-local"
        className="bg-transparent appearance-none"
        min={new Date().toISOString().slice(0, -8)}
        step={60 * 30}
        pattern="dd-MM-yyyyTHH:mm"
      />
    </div>
  );
};

export default DateTime;
