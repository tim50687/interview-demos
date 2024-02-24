import "./App.css";

import Header from "./components/Header";
import Item from "./components/Item";

// Field children components
import Input from "./components/Field/components/Input";
import TextArea from "./components/Field/components/TextArea";
import Button from "./components/Field/components/Button";
import DropDown from "./components/Field/components/DropDown";
import CheckBox from "./components/Field/components/Checkbox";

function App() {
  return (
    <div className="survey">
      <Header />

      <Item labelText="Label">
        <Input />
      </Item>

      <Item labelText="Type">
        <span>Multi-select</span>
        <CheckBox />
      </Item>

      <Item labelText="Default Value">
        <Input />
      </Item>

      <Item labelText="Choices">
        <TextArea />
      </Item>

      <Item labelText="Order">
        <DropDown />
      </Item>

      <Item labelText="">
        <Button />
        <Button />
      </Item>
    </div>
  );
}

export default App;
