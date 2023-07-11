import { Message } from '@/middleware/api';
import classes from './day.module.css';
import ChannelMessagesListItem from './item';
import { format } from 'date-fns';

interface ChannelMessagesListDayProps {
  day: Date
  messages: Message[]
}

const ChannelMessagesListDay = ({ day, messages }: ChannelMessagesListDayProps) => {
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