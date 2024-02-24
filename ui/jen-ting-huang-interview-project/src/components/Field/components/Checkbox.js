const CheckBox = ({ checked, onChange, label, className }) => {
  return (
    <div className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </div>
  );
};

export default CheckBox;
