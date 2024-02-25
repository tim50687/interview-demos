/**
 * Represents a generic input component for text entry.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input, making this a controlled component.
 * @param {function} props.onChange - Function to call when the input's value changes. It receives the change event as an argument.
 * @param {string} [props.className] - Optional CSS class to add to the input for custom styling.
 * @returns {React.ReactElement} An input element wrapped in a div.
 */

import "./FieldChild.css";
const Input = ({ value, onChange, className }) => {
  return (
    <div>
      <input className={className} value={value} onChange={onChange} />
    </div>
  );
};

export default Input; // Export the component for use in other parts of the application
