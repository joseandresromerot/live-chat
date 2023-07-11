import { Message } from '@/middleware/api';
import classes from './list.module.css';
import { groupBy } from '../../lib/util';
import ChannelMessagesListDay from './day';
import { parse } from 'date-fns';

interface ChannelMessagesListProps {
  messages: Message[]
}

const ChannelMessagesList = ({ messages }: ChannelMessagesListProps) => {
  console.info('messages', messages);
  const grouped = groupBy(messages, "created_at_text");
  const days = Object.keys(grouped);

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        {days.map(d => (
          <ChannelMessagesListDay
            key={d}
            day={parse(d, "yyyyMMdd", new Date())}
            messages={grouped[d]}
          />
        ))}
        </div>
    </div>
  );
};

export default ChannelMessagesList;