import IconButton from '../ui/button/icon-button';
import classes from './top-bar.module.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const SidebarChannelInfoTopBar = () => {
  const handleBackClick = () => {

  };

  return (
    <>
      <div className={classes.container}>
        <IconButton
          icon={faChevronLeft}
          fontSize={20}
          className={classes.back}
          onClick={handleBackClick}
        />

        <h3 className={classes.title}>All channels</h3>
      </div>
    </>
  );
};

export default SidebarChannelInfoTopBar;