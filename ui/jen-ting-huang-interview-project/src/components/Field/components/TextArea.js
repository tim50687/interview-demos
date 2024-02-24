import { useState } from "react";

const TextArea = () => {
  // State for the country list
  const [country, setCountry] = useState([]);
  // State for the country input
  const [currentInput, setCurrentInput] = useState("");

  // State for duplicate country warning
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  // State for empty country warning
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  // State for adding and removing country
  const [notification, setNotification] = useState("");

  const handleKeyDown = (e) => {
    // If the user presses the Enter key
    if (e.key === "Enter") {
      const entries = currentInput.split("\n");
      // Add the current input to the country list
      const newCountry = entries[entries.length - 1];

      // If user didn't type anything, or include duplicate country
      if (newCountry === "") {
        setShowEmptyWarning(true);
        setShowDuplicateWarning(false);
        e.preventDefault();
      }
      // Check for duplicate country
      else if (country.includes(newCountry)) {
        setShowDuplicateWarning(true);
        setShowEmptyWarning(false);
        e.preventDefault();
      } else {
        setCountry((prev) => [...prev, newCountry]);
        // Hide warnings if successfully added
        setShowDuplicateWarning(false);
        setShowEmptyWarning(false);
        // Notify user that the country has been added
        setNotification(`Added ${newCountry} to the list`);
      }
    }
  };

  const handleChange = (e) => {
    // Normal case, if user types something
    setCurrentInput(e.target.value);
    setShowDuplicateWarning(false);
    setShowEmptyWarning(false);

    // After the change rerender, if the country is removed, remove it from the list
    const entries = e.target.value.split("\n");

    if (entries.length - 1 < country.length) {
      setNotification(`Successfully removed country from the list`);
      setCountry(entries.slice(0, entries.length - 1));
    }
  };

  return (
    <div>
      <textarea
        value={currentInput} // force the value to be the currentInput
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={10}
      ></textarea>
      {showDuplicateWarning && (
        <p className="warning">You have already added this country</p>
      )}
      {showEmptyWarning && <p className="warning">Please enter a country</p>}
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default TextArea;
