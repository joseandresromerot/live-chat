import SidebarChannelInfo from '../channel-info';
import classes from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <SidebarChannelInfo />
    </div>
  );
};

export default Sidebar;