// components/Button.tsx
type ButtonProps = {
  text: string;
  onClick?: () => void;               // now optional
  type?: "button" | "submit" | "reset"; // new
  disabled?: boolean;
};

const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
