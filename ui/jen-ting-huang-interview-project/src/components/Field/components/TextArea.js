/**
 * Represents a textarea component designed for inputting and editing a list of choices.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.choices - The current list of choices to be displayed in the textarea.
 * @param {function} props.onChoicesChange - Callback function to update the choices list when it changes.
 * @param {string} [props.className] - Optional CSS class for styling the textarea component.
 * @returns {React.ReactElement} A textarea element with dynamic content based on user interaction.
 */
import { useState } from "react";
import "./FieldChild.css";

const TextArea = ({ choices, onChoicesChange, className }) => {
  // State for the country input
  const [currentInput, setCurrentInput] = useState("");

  // If someone touches the choices externally, update the input so that it will render correctly
  // useEffect(() => {
  //   setCurrentInput(choices.join("\n"));
  // }, [choices]);

  // State for duplicate country warning
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  // State for empty country warning
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  // State for adding and removing country
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    // First check if it's ENTER
    if (e.key === "Enter") {
      const entries = e.target.value.split("\n");
      // Add the current input to the country list
      const newCountry = entries[entries.length - 1];

      // If user didn't type anything, or include duplicate country
      if (!newCountry) {
        setShowEmptyWarning(true);
        e.preventDefault();
        return;
      }
      console.log(choices);
      // Check for duplicate country
      if (entries.filter((choice) => choice === newCountry).length >= 2) {
        onChoicesChange(entries.slice(0, entries.length - 1));
        setShowDuplicateWarning(true);
        e.preventDefault();
        return;
      }
      // Notify user that the country has been added
      setNotification(`Added ${newCountry} to the list`);
    } // If the user presses the Backspace key
    else if (e.key === "Backspace") {
      // If the user presses the Backspace key
      const entries = e.target.value.split("\n");
      // If the user is trying to delete a country
      if (entries.filter((choice) => choice === "").length > 1) {
        setNotification(`Successfully removed country from the list`);
      }
    }
    // Update the current input
    onChoicesChange(e.target.value.split("\n"));
    setShowDuplicateWarning(false);
    setShowEmptyWarning(false);
  };

  return (
    <div>
      <textarea
        value={choices.join("\n")} // force the value to be the currentInput
        onChange={handleChange}
        onKeyDown={handleChange}
        rows={10}
        className={className}
      ></textarea>
      {showDuplicateWarning && (
        <p className="warning">You have already added this country</p>
      )}
      {showEmptyWarning && <p className="warning">Please enter a country</p>}
      {notification && choices.length !== 0 && (
        <p className="notification">{notification}</p>
      )}
    </div>
  );
};

export default TextArea; // Export the component for use in other parts of the application
