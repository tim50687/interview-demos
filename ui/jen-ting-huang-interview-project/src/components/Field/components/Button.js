const Button = ({ onClick, type = "button" }) => {
  return <button type={type} onClick={onClick}></button>;
};

export default Button;
