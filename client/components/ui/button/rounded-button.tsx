import classes from './rounded-button.module.css';

interface RoundedButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className: string
}

const RoundedButton = ({ className, ...rest }: RoundedButtonProps) => {
  return (
    <button {...rest} className={`${classes.button} ${className}`} />
  );
}

RoundedButton.defaultProps = {
  className: ""
};

export default RoundedButton;