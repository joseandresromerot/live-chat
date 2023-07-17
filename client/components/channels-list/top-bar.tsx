import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../ui/button/icon-button';
import classes from './top-bar.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/store/reducers';
import { actions } from '@/store/reducers/channel';

const SidebarChannelsListTopBar = () => {
  const { newChannelModalVisible } = useSelector((state: RootState) => state.channel);
  const dispatch = useDispatch();

  const toggleNewChannelModal = () => {
    if (newChannelModalVisible) {
      dispatch(actions.hideNewChannelModal());
    } else {
      dispatch(actions.showNewChannelModal());
    }
  };

  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.title}>Channels</h3>

        <IconButton
          icon={faPlus}
          fontSize={20}
          className={classes.plus}
          onClick={toggleNewChannelModal}
        />
      </div>
    </>
  );
};

export default SidebarChannelsListTopBar;