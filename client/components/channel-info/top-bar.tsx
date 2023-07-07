import { useDispatch } from 'react-redux';
import IconButton from '../ui/button/icon-button';
import classes from './top-bar.module.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { SIDEBAR_MODES, actions } from '@/store/reducers/channel';

const SidebarChannelInfoTopBar = () => {
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(actions.setSidebarMode(SIDEBAR_MODES.CHANNELS_LIST));
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