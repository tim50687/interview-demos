/**
 * Represents a generic button component for various uses throughout the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The text to display on the button.
 * @param {function} props.onClick - Function to call when the button is clicked.
 * @param {string} [props.type="button"] - Specifies the button type. Defaults to "button". Can also be "submit" or "reset".
 * @param {string} [props.className] - Optional CSS class to add to the button for custom styling.
 * @returns {React.ReactElement} A button element.
 */

import "./FieldChild.css";
const Button = ({ label, onClick, type = "button", className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button; // Export the component for use in other parts of the application
