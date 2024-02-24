import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import Item from "./components/Item";

// Field children components
import Input from "./components/Field/components/Input";
import TextArea from "./components/Field/components/TextArea";
import Button from "./components/Field/components/Button";
import DropDown from "./components/Field/components/DropDown";
import CheckBox from "./components/Field/components/Checkbox";

function App() {
  // State for form data
  const [formData, setFormData] = useState({
    label: "",
    type: false,
    defaultValue: "",
    choices: [],
  });
  console.log(formData);

  // State for label text is filled or not
  const [isLabelFilled, setIsLabelFilled] = useState(false);

  // Handler to update specific form data field
  const handleFormDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  };

  return (
    <form className="survey" onSubmit={handleSubmit}>
      <Header />

      <Item labelText="Label">
        <Input value={formData.label} onChange={handleLabelChange} />
      </Item>

      <Item labelText="Type">
        <span>Multi-select</span>
        <CheckBox checked={formData.checked} onChange={handleTypeChange} />
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
      </Item>

      <Item labelText="Order">
        <DropDown />
      </Item>

      <Item labelText="">
        <Button type="submit" />
        <Button onClick={handleClear} />
      </Item>
    </form>
  );
}

export default App;
