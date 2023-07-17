import { Message } from '@/middleware/api';
import classes from './day.module.css';
import ChannelMessagesListItem from './item';
import { format, isAfter } from 'date-fns';

interface ChannelMessagesListDayProps {
  day: Date
  messages: Message[]
}

const ChannelMessagesListDay = ({ day, messages }: ChannelMessagesListDayProps) => {
  messages.sort((m1: Message, m2: Message) => {
    return isAfter(m1.created_at, m2.created_at) ? 1 : -1;
  });

  return (
    <div className={classes.container}>
      <div className={classes.dividerContainer}>
        <hr className={classes.divider} />
        <h3 className={classes.day}>{format(day, "LLLL d, yyyy")}</h3>
        <hr className={classes.divider} />
      </div>
      
      {messages.map(m => (
        <ChannelMessagesListItem key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChannelMessagesListDay;