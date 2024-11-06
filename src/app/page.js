"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Phone } from "lucide-react";
import "tailwind-scrollbar";
import { getDaysDifference, getUniqueID } from "@/lib/utils";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import ConfirmDelete from "@/components/ConfirmDelete";
import Toggle from "@/components/Toggle";

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
        <div className="flex items-center justify-center m-32">
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

function PatientCard({ patient, onEdit, onCall }) {
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

function BottomSheet({ isOpen, onClose, patient, onSave, onDelete }) {
  const [editedPatient, setEditedPatient] = useState(patient || {});
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    setEditedPatient(patient || {});
  }, [patient]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPatient);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const onCloseModal = (e) => {
    e.stopPropagation();
    setOpenModal(false);
  };

  const onConfirmDelete = (e) => {
    e.stopPropagation();
    onDelete(editedPatient);
    setOpenModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[90vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto flex-grow pr-2">
              <div className="space-y-8 mb-10 py-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={editedPatient.name || ""}
                    onChange={handleChange}
                    id="name"
                    label="Patient Name"
                  />
                  <Input
                    value={editedPatient.phone || ""}
                    onChange={handleChange}
                    id="phone"
                    label="Phone Number"
                    type="number"
                  />
                  <Input
                    value={editedPatient.age || ""}
                    onChange={handleChange}
                    id="age"
                    label="Age"
                    type="number"
                  />
                  <Input
                    value={editedPatient.systemic || ""}
                    onChange={handleChange}
                    id="systemic"
                    label="Systemic Disorder"
                  />
                  <div className="space-y-2">
                    <label
                      htmlFor="examination"
                      className="block text-sm font-medium text-purple-600"
                    >
                      On Examination (O/E)
                    </label>
                    <textarea
                      id="examination"
                      name="examination"
                      value={editedPatient.examination || ""}
                      onChange={handleChange}
                      placeholder="On Examination (O/E)"
                      rows={3}
                      className="w-full p-2 border-2 border-purple-600 rounded outline-none resize-none"
                    />
                  </div>
                  <Radio
                    options={["Not done", "Gross", "Completed"]}
                    checkedValue={editedPatient.scaling}
                    onChange={handleChange}
                    label="Scaling"
                  />
                  <Input
                    value={editedPatient.followUpDate || ""}
                    onChange={handleChange}
                    id="followUpDate"
                    type="date"
                    label="Follow up date"
                  />
                  <Input
                    value={editedPatient.treatmentRequired || ""}
                    onChange={handleChange}
                    id="treatmentRequired"
                    label="Treatment Required"
                  />
                  <Toggle
                    id="treatmentDone"
                    isChecked={editedPatient.treatmentDone || false}
                    handleToggle={handleChange}
                  />
                </form>
              </div>
            </div>
            <div className="mt-4 flex justify-between space-x-2">
              <div className="flex justify-start space-x-2">
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                >
                  Delete
                </motion.button>
              </div>
              <div className="flex justify-end space-x-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                >
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
          <ConfirmDelete
            isOpen={isOpenModal}
            onClose={onCloseModal}
            onConfirm={onConfirmDelete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
