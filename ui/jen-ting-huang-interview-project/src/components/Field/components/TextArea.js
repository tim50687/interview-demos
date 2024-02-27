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
  // State for duplicate country warning
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  // State for empty country warning
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  // State for adding and removing country
  const [notification, setNotification] = useState("");

  // Logic for return notification
  const prepareNotificationText = () => {
    // Directly return the notification if it matches the specific case
    if (notification === "Successfully removed") {
      return notification;
    }

    // Handle the case for when there is only one choice
    if (choices.length === 1 && choices[0].length > 10) {
      return `${notification.slice(0, 15)}…`;
    }

    // Handle the case for when there are two or more choices
    if (choices.length >= 2 && choices[choices.length - 2].length > 10) {
      return `${notification.slice(0, 15)}…`;
    }

    // Default case: return the notification as is
    return notification;
  };

  const handleChange = (e) => {
    // First check if it's ENTER
    if (e.key === "Enter") {
      const entries = e.target.value.split("\n");
      // Add the current input to the country list
      const newChoices = entries[entries.length - 1].toLowerCase();

      // If user didn't type anything, or include duplicate country
      if (!newChoices) {
        setShowEmptyWarning(true);
        e.preventDefault();
        return;
      }
      // Check for duplicate country
      if (
        entries.filter((choice) => choice.toLowerCase() === newChoices)
          .length >= 2
      ) {
        onChoicesChange(entries.slice(0, entries.length - 1));
        setShowDuplicateWarning(true);
        e.preventDefault();
        return;
      }
      // Notify user that the country has been added
      setNotification(`Added ${newChoices}`);
    } // If the user presses the Backspace key
    else if (e.key === "Backspace") {
      // If the user presses the Backspace key
      const entries = e.target.value.split("\n");
      // If the user is trying to delete a country
      if (entries.filter((choice) => choice === "").length > 1) {
        setNotification(`Successfully removed`);
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
        value={choices?.join("\n")} // force the value to be the currentInput
        onChange={handleChange}
        onKeyDown={handleChange}
        rows={10}
        className={`field-children ${className}`}
      ></textarea>
      {showDuplicateWarning && (
        <p className="warning">You have already added this country</p>
      )}
      {showEmptyWarning && <p className="warning">Please enter a country</p>}
      {notification && choices.length !== 0 && (
        <p className="notification">{prepareNotificationText()}</p>
      )}
    </div>
  );
};

export default TextArea; // Export the component for use in other parts of the application
