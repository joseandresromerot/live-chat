import IconButton from '../ui/button/icon-button';
import classes from './top-bar.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SidebarChannelsListTopBar = () => {
  const handleBackClick = () => {

  };

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.title}>Channels</h3>

        <IconButton
          icon={faPlus}
          fontSize={20}
          className={classes.plus}
          onClick={handleBackClick}
        />
      </div>
    </>
  );
};

export default SidebarChannelsListTopBar;