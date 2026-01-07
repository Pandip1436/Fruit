import PropTypes from "prop-types";

function Toast({ message, type = "info" }) {
  if (!message) return null;

  const baseStyle =
    "fixed top-25 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition";

  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600"
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "info"])
};

export default Toast;
