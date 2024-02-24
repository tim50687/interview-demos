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
  console.log(currentInput);
  console.log(country);

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
      } else if (country.includes(newCountry)) {
        setShowDuplicateWarning(true);
        setShowEmptyWarning(false);
        e.preventDefault();
      } else {
        setCountry((prev) => [...prev, newCountry]);
        // Hide warnings if successfully added
        setShowDuplicateWarning(false);
        setShowEmptyWarning(false);
      }
    }
  };

  return (
    <div>
      <textarea
        value={currentInput} // force the value to be the currentInput
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
      ></textarea>
      {showDuplicateWarning && (
        <p className="warning">You have already added this country</p>
      )}
      {showEmptyWarning && <p className="warning">Please enter a country</p>}
    </div>
  );
};

export default TextArea;
