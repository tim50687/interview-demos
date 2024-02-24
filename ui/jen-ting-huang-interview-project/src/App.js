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
  // State for label text
  const [labelText, setLabelText] = useState("");
  const [isLabelFilled, setIsLabelFilled] = useState(false);

  // Handle the onChange for input component
  const handleLabelChange = (e) => {
    setLabelText(e.target.value);
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
        <Input value={labelText} onChange={handleLabelChange} />
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
