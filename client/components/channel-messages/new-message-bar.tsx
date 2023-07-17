import IconButton from '../ui/button/icon-button';
import classes from './new-message-bar.module.css';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChannelMessagesNewMessageBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.fieldContainer}>
        <input className={classes.field} placeholder='Type a message here' />
        <IconButton
          icon={faPaperPlane}
          fontSize={20}
          className={classes.button}
        />
      </div>
    </div>
  );
};

export default ChannelMessagesNewMessageBar;