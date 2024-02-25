/**
 * Represents a dropdown component for selecting an option.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.onSelect - Function to call when an option is selected. Receives the selected option's value as an argument.
 * @param {string} [props.className] - Optional CSS class to add to the dropdown for custom styling.
 * @returns {React.ReactElement} A dropdown element with predefined options.
 */
const DropDown = ({ onSelect, className }) => {
  return (
    <select className={className} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an option</option>
      <option value="alphabetical">Display choices in Alphabetical</option>
      <option value="length">Display choices by Length</option>
    </select>
  );
};

export default DropDown; // Export the component for use in other parts of the application
