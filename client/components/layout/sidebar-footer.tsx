import { useSelector } from 'react-redux';
import Avatar from '../channel-info/avatar';
import classes from './sidebar-footer.module.css';
import { RootState } from '@/store/reducers';
import IconButton from '../ui/button/icon-button';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const SidebarFooter = () => {
  const { avatar_url, fullname, authenticated } = useSelector((state: RootState) => state.session);

  return (
    <div className={classes.container}>
      <Avatar url={avatar_url || ""} />
      <h3 className={classes.name}>{fullname}</h3>
      <IconButton
        icon={faAngleDown}
        fontSize={20}
        className={classes.down}
      />
    </div>
  );
}

export default SidebarFooter;