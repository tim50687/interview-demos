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
    type: "multi-select",
    choices: [],
  });

  // State for label text is filled or not
  const [isLabelFilled, setIsLabelFilled] = useState(false);

  // Handler to update specific form data field
  const handleFormDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the onChange for input component
  const handleLabelChange = (e) => {
    handleFormDataChange("label", e.target.value);
    setIsLabelFilled(e.target.value.length > 0);
  };

  // Function to execute when the user clicks the "Save" button
  const handleCheck = () => {
    // If the label is not filled, alert the user
    if (!isLabelFilled) {
      alert("Please fill in the label");
    }
  };

  return (
    <div className="survey">
      <Header />

      <Item labelText="Label">
        <Input value={formData.label} onChange={handleLabelChange} />
      </Item>

      <Item labelText="Type">
        <span>Multi-select</span>
        <CheckBox />
      </Item>

      {/* <Item labelText="Default Value">
        <Input />
      </Item> */}

      <Item labelText="Choices">
        <TextArea />
      </Item>

      <Item labelText="Order">
        <DropDown />
      </Item>

      <Item labelText="">
        <Button onClick={handleCheck} />
        <Button />
      </Item>
    </div>
  );
}

export default App;
