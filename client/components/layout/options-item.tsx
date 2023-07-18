import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './options-item.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface OptionsItem {
  icon: IconProp
  label: string
  className?: string
  onClick?: () => void
}

const OptionsItem = ({ icon, label, className, onClick }: OptionsItem) => {
  return (
    <div className={`${classes.container} ${className}`} onClick={onClick}>
      <FontAwesomeIcon
        icon={icon}
        className={classes.icon}
      />
      <span className={classes.label}>{label}</span>
    </div>
  );
};

OptionsItem.defaultProps = {
  className: "",
  onClick: () => {}
};

export default OptionsItem;