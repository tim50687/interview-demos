/**
 * The App component serves as the root component for a form-building application,
 * enabling users to create and configure a survey form with various field types.
 * It manages the state of the form data, including labels, default values, choices,
 * and the selection type.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
import "./App.css";
import { useState, useEffect } from "react";

import Header from "./Common/Header";
import Item from "./Item/Item";

// Field children components
import Input from "./Field/components/Input";
import TextArea from "./Field/components/TextArea";
import Button from "./Field/components/Button";
import DropDown from "./Field/components/DropDown";
import CheckBox from "./Field/components/Checkbox";

// Import the FieldService
import FieldService from "../MockService";

function App() {
  // State for form data
  const [formData, setFormData] = useState({
    label: "",
    type: false,
    defaultValue: "",
    choices: [],
  });

  // State for original choices
  const [originalChoices, setOriginalChoices] = useState([]);

  // State for submit ready,
  // Make sure the form be submit after the dafault value is in the choices
  const [submitReady, setSubmitReady] = useState(false);

  // Load the form data from local storage when the component mounts
  useEffect(() => {
    // Load the form data from local storage
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      // Set the form data and label filled state
      setFormData(storedFormData);
    }
  }, []);

  // Effect to handle the actual submission
  useEffect(() => {
    if (submitReady) {
      // Ensure we have the latest form data before submitting
      FieldService.saveField(formData);

      // Reset trigger to avoid re-submitting
      setSubmitReady(false);
    }
  }, [submitReady, formData]);

  // Handler to update specific form data field
  const handleFormDataChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // Store in local storage
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle the onChange for input component for label
  const handleLabelChange = (e) => {
    handleFormDataChange("label", e.target.value);
  };

  // Handle the onChange for input component for default value
  const handleDefaultValueChange = (e) => {
    handleFormDataChange("defaultValue", e.target.value);
  };

  // Handle the onChange for textarea component for choices
  const handleChoicesChange = (e) => {
    handleFormDataChange("choices", e);
  };

  // Handle type change
  const handleTypeChange = (e) => {
    handleFormDataChange("type", e.target.checked);
  };

  // Handle Clear button
  const handleClear = () => {
    const emptyFormData = {
      label: "",
      type: false,
      defaultValue: "",
      choices: [],
    };
    setFormData(emptyFormData);
    // Clear local storage
    localStorage.setItem("formData", JSON.stringify(emptyFormData));
    // Make sure originalChoices is cleared
    setOriginalChoices([]);
    // Make drop down back to default
    const dropDown = document.querySelector("select");
    dropDown.selectedIndex = 0;
  };

  // Function to highlight text over 40 characters
  const highlightText = () => {
    const textarea = document.querySelector("textarea");
    // Get the text from the textarea
    const text = textarea.value;

    const lines = text.split("\n");

    for (let i = 0, pos = 0; i < lines.length; i++) {
      if (lines[i].length > 40) {
        textarea.focus();
        textarea.setSelectionRange(pos, pos + lines[i].length);
      }
      pos += lines[i].length + 1;
    }
  };

  // Handle order change
  const handleOrderChange = (orderType) => {
    // Only store the original choices once
    if (originalChoices.length === 0) {
      setOriginalChoices(formData.choices);
    }
    // Deal with the last choice, see if it's empty
    let newAllChoices = formData.choices;
    // If last choice is [], remove it
    if (formData.choices[formData.choices.length - 1] === "") {
      newAllChoices = formData.choices.slice(0, formData.choices.length - 1);
    }
    // Order choices based on the order type
    if (orderType === "alphabetical") {
      const sortedChoices = newAllChoices.sort();
      handleFormDataChange("choices", sortedChoices);
    } else if (orderType === "length") {
      const sortedChoices = newAllChoices.sort((a, b) => a.length - b.length);
      handleFormDataChange("choices", sortedChoices);
    } else if (orderType === "") {
      handleFormDataChange("choices", originalChoices);
    }
  };

  // Function to execute when the user clicks the "Save" button
  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // If the label is not filled, alert the user
    if (formData.label.length === 0) {
      alert("Please fill in the label");
      return;
    }
    // Check if choices are more than 50
    if (formData.choices.length > 50) {
      alert("You have more than 50 choices");
      return;
    }

    // Deal with the last choice, see if it's empty
    let newAllChoices = formData.choices;
    // If last choice is [], remove it
    if (formData.choices[formData.choices.length - 1] === "") {
      newAllChoices = formData.choices.slice(0, formData.choices.length - 1);
    }
    // Check if default value is empty
    if (formData.defaultValue.length === 0) {
      await handleChoicesChange(newAllChoices);
      setSubmitReady(true);
      return;
    }
    // Check if the default value is in the choices
    if (!formData.choices.includes(formData.defaultValue)) {
      if (formData.choices.length < 50) {
        newAllChoices.push(formData.defaultValue);
        await handleChoicesChange(newAllChoices);
      } else {
        alert(
          "You have already 50 choices, I cannot add default value for you into the choice."
        );
        return;
      }
    } // If the default value is in the choices, do nothing
    else {
      await handleChoicesChange(newAllChoices);
    }
    // Set a flag to indicate that the form is ready to be submitted
    setSubmitReady(true);
  };

  return (
    <form className="survey" onSubmit={handleSubmit}>
      <Header />
      <div id="item-container">
        <Item labelText="Label">
          <Input value={formData.label} onChange={handleLabelChange} />
        </Item>

        <Item labelText="Type">
          <CheckBox
            prefix="Multi-select"
            label="A value is required"
            checked={formData.type}
            onChange={handleTypeChange}
          />
        </Item>

        <Item labelText="Default Value">
          <Input
            value={formData.defaultValue}
            onChange={handleDefaultValueChange}
          />
        </Item>

        <Item labelText="Choices">
          <TextArea
            choices={formData.choices}
            onChoicesChange={handleChoicesChange}
          />
          <Button
            label="Check"
            onClick={highlightText}
            className="check-button"
          />
        </Item>

        <Item labelText="Order">
          <DropDown onSelect={handleOrderChange} />
        </Item>

        <Item labelText="">
          <Button
            label="Save Changes"
            type="submit"
            className="submit-button"
          />
          <span> Or </span>
          <Button
            label="Clear"
            onClick={handleClear}
            className="clear-button"
          />
        </Item>
      </div>
    </form>
  );
}

export default App; // Export the component for use in other parts of the application
