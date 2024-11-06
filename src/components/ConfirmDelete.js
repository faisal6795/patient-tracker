import { AnimatePresence, motion } from "framer-motion";

const ConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-end">
            <motion.button
              className="bg-gray-200  px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </motion.button>
            <motion.button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={onConfirm}
            >
              Delete
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDelete;
