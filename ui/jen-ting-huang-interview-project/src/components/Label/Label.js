/**
 * Represents a generic label component used within forms in the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content of the label.
 * @returns {React.ReactElement} A div element containing the label text.
 */
import "./Label.css";
const Label = ({ text }) => {
  return <div className="label">{text}</div>;
};

export default Label; // Export the component for use in other parts of the application
