import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from './icon-button.module.css'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconProp
  fontSize: number
  label?: string
}

const IconButton = ({ icon, fontSize, className, label, ...rest }: IconButtonProps) => {
  return (
    <button  {...rest} className={`${classes.button} ${className}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize }}
      />
      {label &&
        <span className={classes.label}>{label}</span>
      }
    </button>
  );
}

IconButton.defaultProps = {
  className: ""
}

export default IconButton;