import { Message } from '@/middleware/api';
import classes from './list.module.css';
import { groupBy } from '../../lib/util';
import ChannelMessagesListDay from './day';
import { parse } from 'date-fns';
import ScrollContainer from '../layout/scroll-container';

interface ChannelMessagesListProps {
  messages: Message[]
}

const ChannelMessagesList = ({ messages }: ChannelMessagesListProps) => {
  const grouped = groupBy(messages, "created_at_text");
  const days = Object.keys(grouped);

  return (
    <ScrollContainer outerDivClassName={classes.subContainer}>
      {days.map(d => (
          <ChannelMessagesListDay
            key={d}
            day={parse(d, "yyyyMMdd", new Date())}
            messages={grouped[d]}
          />
        ))}
    </ScrollContainer>
  );
};

export default ChannelMessagesList;