import Field from "./Field/Field";
import Label from "./Label";

const Item = ({ labelText, children }) => {
  return (
    <div className="item-wrapper">
      <Label text={labelText} />
      <Field>{children}</Field>
    </div>
  );
};

export default Item;
