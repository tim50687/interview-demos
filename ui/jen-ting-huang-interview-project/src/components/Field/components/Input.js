const Input = ({ value, onChange, className }) => {
  return (
    <div>
      <input className={className} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
