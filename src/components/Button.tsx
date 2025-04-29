type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
