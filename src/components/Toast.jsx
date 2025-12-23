import PropTypes from "prop-types";

function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"])
};

export default Toast;
