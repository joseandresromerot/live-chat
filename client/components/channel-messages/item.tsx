import { Message } from '@/middleware/api';
import classes from './item.module.css';
import Avatar from '../channel-info/avatar';
import { addDays, format, parse } from 'date-fns';

interface ChannelMessagesListItemProps {
  message: Message
}

const ChannelMessagesListItem = ({ message }: ChannelMessagesListItemProps) => {
  const { avatar_url, content, fullname, created_at, created_at_text } = message;
  const createdAtDate = parse(created_at, "yyyyMMdd HH:mm", new Date());
  let createdAtDay: string = format(createdAtDate, "eeee, MMM d");

  if (created_at_text === format(Date.now(), "yyyyMMdd")) {
    createdAtDay = "Today";
  } else if (created_at_text === format(addDays(Date.now(), -1), "yyyyMMdd")) {
    createdAtDay = "Yesterday";
  }

  return (
    <div className={classes.container}>
      <Avatar
        url={avatar_url}
      />
      <div className={classes.textContainer}>
        <div className={classes.title}>
          <h3 className={classes.name}>{fullname}</h3>
          <h5 className={classes.date}>{`${createdAtDay} at ${format(createdAtDate, "K:mm aa")}`}</h5>
        </div>
        <h3 className={classes.content}>{content}</h3>
      </div>
    </div>
  );
};

export default ChannelMessagesListItem;