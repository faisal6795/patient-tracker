import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { getDaysDifference } from "@/lib/utils";

export default function PatientCard({ patient, onEdit, onCall }) {
  const getDays = () => {
    const days = getDaysDifference(patient.followUpDate);
    const dayText = days > 1 ? "days" : "day";
    if (days > 0) return `Follow up in ${days} ${dayText}`;
    if (days === 0) return "Follow up today";
    return "Follow up done";
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      whileHover={{ scale: 1.02 }}
      onClick={onEdit}
    >
      <div>
        <h2 className="text-lg font-semibold text-purple-800">
          {patient.name}
        </h2>
        <p className="text-sm text-gray-600">{getDays()}</p>
      </div>
      <motion.button
        className="bg-pink-500 text-white rounded-full p-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onCall();
        }}
      >
        <Phone size={20} />
      </motion.button>
    </motion.div>
  );
}
