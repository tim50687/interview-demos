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

import Header from "./components/Header";
import Item from "./components/Item/Item";

// Field children components
import Input from "./components/Field/components/Input";
import TextArea from "./components/Field/components/TextArea";
import Button from "./components/Field/components/Button";
import DropDown from "./components/Field/components/DropDown";
import CheckBox from "./components/Field/components/Checkbox";

// Import the FieldService
import FieldService from "./MockService";

function App() {
  // State for form data
  const [formData, setFormData] = useState({
    label: "",
    type: false,
    defaultValue: "",
    choices: [],
  });

  // State for label text is filled or not
  const [isLabelFilled, setIsLabelFilled] = useState(false);

  // State for original choices
  const [originalChoices, setOriginalChoices] = useState([]);

  // Load the form data from local storage when the component mounts
  useEffect(() => {
    // Load the form data from local storage
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      // Set the form data and label filled state
      setFormData(storedFormData);
      setIsLabelFilled(storedFormData.label.length > 0);
    }
  }, []);

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
    setIsLabelFilled(e.target.value.length > 0);
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
    setFormData({
      label: "",
      type: false,
      defaultValue: "",
      choices: [],
    });
    // Make sure originalChoices is cleared
    setOriginalChoices([]);
    // Make drop down back to default
    const dropDown = document.querySelector("select");
    dropDown.selectedIndex = 0;
  };

  // Handle order change
  const handleOrderChange = (orderType) => {
    // Only store the original choices once
    if (originalChoices.length === 0) {
      setOriginalChoices(formData.choices);
    }
    // Order choices based on the order type
    if (orderType === "alphabetical") {
      const sortedChoices = [...formData.choices].sort();
      handleFormDataChange("choices", sortedChoices);
    } else if (orderType === "length") {
      const sortedChoices = [...formData.choices].sort(
        (a, b) => a.length - b.length
      );
      handleFormDataChange("choices", sortedChoices);
    } else if (orderType === "") {
      handleFormDataChange("choices", originalChoices);
    }
  };

  // Function to execute when the user clicks the "Save" button
  const handleSubmit = (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // If the label is not filled, alert the user
    if (!isLabelFilled) {
      alert("Please fill in the label");
    }
    // Check if choices are more than 50
    if (formData.choices.length > 50) {
      alert("You have more than 50 choices");
    }
    // Check if the default value is in the choices
    if (!formData.choices.includes(formData.defaultValue)) {
      if (formData.choices.length < 50) {
        // Add the default value to the choices
        handleChoicesChange([...formData.choices, formData.defaultValue]);
      } else {
        alert(
          "You have already 50 choices, I cannot add default value for you into the choice."
        );
      }
    }

    // Send the form data to the FieldService
    FieldService.saveField(formData);
  };

  return (
    <form className="survey" onSubmit={handleSubmit}>
      <Header />

      <Item labelText="Label">
        <Input
          className="field-children"
          value={formData.label}
          onChange={handleLabelChange}
        />
      </Item>

      <Item labelText="Type">
        <span>Multi-select</span>
        <CheckBox
          label="A value is required"
          checked={formData.type}
          onChange={handleTypeChange}
          className="checkbox-inline field-children"
        />
      </Item>

      <Item labelText="Default Value">
        <Input
          value={formData.defaultValue}
          onChange={handleDefaultValueChange}
          className="field-children"
        />
      </Item>

      <Item labelText="Choices">
        <TextArea
          choices={formData.choices}
          onChoicesChange={handleChoicesChange}
          className="field-children"
        />
      </Item>

      <Item labelText="Order">
        <DropDown onSelect={handleOrderChange} className="field-children" />
      </Item>

      <Item labelText="">
        <Button label="Save Changes" type="submit" className="submit-button" />
        <span> Or </span>
        <Button label="Clear" onClick={handleClear} className="clear-button" />
      </Item>
    </form>
  );
}

export default App; // Export the component for use in other parts of the application
