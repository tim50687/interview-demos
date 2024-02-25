/**
 * Represents a checkbox component, including an optional label.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - Determines whether the checkbox is checked.
 * @param {function} props.onChange - Function to call when the checkbox state changes (checked/unchecked).
 * @param {string} [props.label] - Optional label displayed next to the checkbox.
 * @param {string} [props.className] - Optional CSS class to add to the checkbox container for custom styling.
 * @returns {React.ReactElement} A checkbox element with an optional label.
 */

import "./FieldChild.css";
const CheckBox = ({ prefix, checked, onChange, label, className }) => {
  return (
    <div className={`field-children ${className}`}>
      <div>{prefix}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox"
      />
      {label}
    </div>
  );
};

export default CheckBox; // Export the component for use in other parts of the application
