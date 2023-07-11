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
      <h3>{format(day, "dd-MM-yyyy")}</h3>
      {messages.map(m => (
        <ChannelMessagesListItem key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChannelMessagesListDay;