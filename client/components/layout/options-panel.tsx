import OptionsItem from './options-item';
import classes from './options-panel.module.css';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { removeAccessToken } from '@/middleware/api';

const OptionsPanel = () => {
  return (
    <div className={classes.container}>
      <OptionsItem
        icon={faCircleUser}
        label="My Profile"
        className={classes.white}
      />

      <hr className={classes.divider} />

      <OptionsItem
        icon={faRightFromBracket}
        label="Logout"
        className={classes.red}
        onClick={() => {
          console.info("fff");
          removeAccessToken();
          window.location.reload();
        }}
      />
    </div>
  );
};

export default OptionsPanel;