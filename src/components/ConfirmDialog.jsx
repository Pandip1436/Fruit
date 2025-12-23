import PropTypes from "prop-types";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Action</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button onClick={onConfirm}>✅ Yes</button>
          <button onClick={onCancel}>❌ Cancel</button>
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
