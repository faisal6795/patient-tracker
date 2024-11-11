import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "./Input";
import Radio from "./Radio";
import Toggle from "./Toggle";
import ConfirmDelete from "./ConfirmDelete";
import DateTime from "./DateTime";

export default function BottomSheet({
  isOpen,
  onClose,
  patient,
  onSave,
  onDelete,
}) {
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

  const isFormValid = () => {
    return editedPatient.name && editedPatient.phone && editedPatient.age;
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
            className="bg-white rounded-t-3xl p-6 pr-2 w-full max-w-lg max-h-[90vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto flex-grow pr-4">
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
                    onChange={(e) => {
                      const { value, name } = e.target;
                      let phone = value?.trim();
                      if (phone.startsWith("+91")) phone = phone.slice(3);
                      phone = phone.replace(/\D/g, "");
                      setEditedPatient((prev) => ({ ...prev, [name]: phone }));
                    }}
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    pattern="\d*"
                  />
                  <Input
                    value={editedPatient.age || ""}
                    onChange={(e) => {
                      const { value, name } = e.target;
                      let age = value?.trim();
                      age = age.replace(/\D/g, "");
                      setEditedPatient((prev) => ({ ...prev, [name]: age }));
                    }}
                    id="age"
                    label="Age"
                    type="number"
                    pattern="\d*"
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
                  <DateTime
                    editedPatient={editedPatient}
                    handleChange={handleChange}
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
                  className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!isFormValid()}
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
                  className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
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
