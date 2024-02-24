const CheckBox = ({ checked, onChange }) => {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={onChange}></input>
    </div>
  );
};

export default CheckBox;
