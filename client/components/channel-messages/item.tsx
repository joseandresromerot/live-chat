import { Message } from '@/middleware/api';
import classes from './day.module.css';

interface ChannelMessagesListItemProps {
  message: Message
}

const ChannelMessagesListItem = ({ message }: ChannelMessagesListItemProps) => {
  return (
    <div className={classes.container}>
      {message.content}
    </div>
  );
};

export default ChannelMessagesListItem;