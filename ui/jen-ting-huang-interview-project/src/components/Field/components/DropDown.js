const DropDown = ({ onSelect, className }) => {
  return (
    <select className={className} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an option</option>
      <option value="alphabetical">Display choices in Alphabetical</option>
      <option value="length">Display choices by Length</option>
    </select>
  );
};

export default DropDown;
