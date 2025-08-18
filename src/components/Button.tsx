import styles from './styles/Button.module.scss';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

const Button = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} ${className}`.trim()}
  >
    {text}
  </button>
);

export default Button;
