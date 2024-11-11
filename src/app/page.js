"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import "tailwind-scrollbar";
import { getUniqueID } from "@/lib/utils";
import BottomSheet from "@/components/BottomSheet";
import PatientCard from "@/components/Card";

export default function Page() {
  const [patients, setPatients] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const savePatient = (patient) => {
    if (!patient.name) return;
    const existingPatient = patients.find((p) => p.id === patient.id);
    const updatedPatients = existingPatient
      ? patients.map((p) => (p.id === patient.id ? patient : p))
      : [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setIsBottomSheetOpen(false);
    setCurrentPatient(null);
  };

  const deletePatient = (patient) => {
    const updatedPatients = patients.filter((p) => p.id !== patient.id);
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setIsBottomSheetOpen(false);
    setCurrentPatient(null);
  };

  const addNewPatient = () => {
    const newPatient = {
      id: getUniqueID(),
      name: "",
      phone: "",
      age: "",
      systemic: "",
      examination: "",
      scaling: "Not done",
      followUpDate: "",
      treatmentRequired: "",
      treatmentDone: false,
    };
    setCurrentPatient(newPatient);
    setIsBottomSheetOpen(true);
  };

  const editPatient = (patient) => {
    setCurrentPatient(patient);
    setIsBottomSheetOpen(true);
  };

  const callPatient = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const donePatients = patients.filter((patient) => patient.treatmentDone);

  const notDonePatients = patients.filter((patient) => !patient.treatmentDone);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-lavender-100 to-purple-100 p-4 pb-28">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
        My Patient Tracker
      </h1>
      {patients.length === 0 && (
        <div className="flex items-center justify-center my-32">
          <h3>No Patients</h3>
        </div>
      )}
      <AnimatePresence>
        {notDonePatients.length > 0 && (
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-pink-500">
              Treatment Pending
            </h2>
            {notDonePatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={() => editPatient(patient)}
                onCall={() => callPatient(patient.phone)}
              />
            ))}
          </motion.div>
        )}
        {donePatients.length > 0 && (
          <motion.div
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mt-10 text-pink-500">
              Treatment Done
            </h2>
            {donePatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={() => editPatient(patient)}
                onCall={() => callPatient(patient.phone)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={addNewPatient}
      >
        <Plus size={24} />
      </motion.button>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        patient={currentPatient}
        onSave={savePatient}
        onDelete={deletePatient}
      />
    </div>
  );
}
