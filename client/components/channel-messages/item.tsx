import { Message } from '@/middleware/api';
import classes from './item.module.css';
import Avatar from '../channel-info/avatar';
import { addDays, format, parse } from 'date-fns';
import {format as formatTz, utcToZonedTime,} from "date-fns-tz";

interface ChannelMessagesListItemProps {
  message: Message
}

const ChannelMessagesListItem = ({ message }: ChannelMessagesListItemProps) => {
  const { avatar_url, content, fullname, created_at, day } = message;
  let createdAtDay: string = format(created_at, "eeee, MMM d");

  if (day === format(Date.now(), "yyyyMMdd")) {
    createdAtDay = "Today";
  } else if (day === format(addDays(Date.now(), -1), "yyyyMMdd")) {
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
          <h5 className={classes.date}>{`${createdAtDay} at ${format(created_at, "K:mm aa")}`}</h5>
        </div>
        <h3 className={classes.content}>{content}</h3>
      </div>
    </div>
  );
};

export default ChannelMessagesListItem;