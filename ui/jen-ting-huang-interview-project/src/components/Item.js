/**
 * Represents a composite form item component in the survey builder application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.labelText - The text for the label associated with the form input.
 * @param {React.ReactNode} props.children - Form input components to be included within the field.
 * @returns {React.ReactElement} A div element wrapping a label and its corresponding form input.
 */
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

export default Item; // Export the component for use in other parts of the application
