import PropTypes from "prop-types";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      
      {/* MODAL */}
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 text-center">

        <h3 className="text-xl font-bold mb-3">
          Confirm Action
        </h3>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            ✅ Yes
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmDialog;
