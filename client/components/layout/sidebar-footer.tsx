import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../channel-info/avatar';
import classes from './sidebar-footer.module.css';
import { RootState } from '@/store/reducers';
import IconButton from '../ui/button/icon-button';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { actions } from '@/store/reducers/channel';
import OptionsPanel from './options-panel';

const SidebarFooter = () => {
  const { avatar_url, fullname } = useSelector((state: RootState) => state.session);
  const { optionsPanelVisible } = useSelector((state: RootState) => state.channel);
  const dispatch = useDispatch();

  const toggleOptionsPanel = () => {
    if (optionsPanelVisible) {
      dispatch(actions.hideOptionsPanel());
    } else {
      dispatch(actions.showOptionsPanel());
    }
  };

  return (
    <div className={classes.container}>
      <Avatar url={avatar_url || ""} />
      <h3 className={classes.name}>{fullname}</h3>
      <IconButton
        icon={faAngleDown}
        fontSize={20}
        className={classes.down}
        onClick={toggleOptionsPanel}
      />

      {optionsPanelVisible &&
        <OptionsPanel />
      }
    </div>
  );
}

export default SidebarFooter;