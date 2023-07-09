import { useSelector } from 'react-redux';
import SidebarChannelInfo from '../channel-info';
import classes from './sidebar.module.css';
import { RootState } from '@/store/reducers';
import { SIDEBAR_MODES } from '@/store/reducers/channel';
import SidebarChannelsList from '../channels-list';
import SidebarFooter from './sidebar-footer';

const Sidebar = () => {
  const { sidebarMode } = useSelector((state: RootState) => state.channel);

  return (
    <div className={classes.sidebar}>
      {sidebarMode === SIDEBAR_MODES.CHANNEL_INFO &&
        <SidebarChannelInfo />
      }

      {sidebarMode === SIDEBAR_MODES.CHANNELS_LIST &&
        <SidebarChannelsList />
      }

      <SidebarFooter />
    </div>
  );
};

export default Sidebar;