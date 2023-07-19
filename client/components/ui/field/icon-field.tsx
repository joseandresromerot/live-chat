import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './icon-field.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon:  IconProp
  iconSize: number
  containerClassName?: string
  iconClassName?: string
}

const IconField = ({ icon, iconSize, containerClassName, className, iconClassName, ...rest }: IconFieldProps) => {
  return (
    <div className={`${classes.container} ${containerClassName}`}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: iconSize, alignSelf: "center" }}
        className={iconClassName}
      />

      <input {...rest} className={`${classes.field} ${className}`} />
    </div>
  );
}

IconField.defaultProps = {
  containerClassName: "",
  className: "",
  iconClassName: ""
};

export default IconField;