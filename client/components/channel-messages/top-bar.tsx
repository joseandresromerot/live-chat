import classes from './top-bar.module.css';

interface ChannelMessagesTopBarProps {
  title: string
}

const ChannelMessagesTopBar = ({ title }: ChannelMessagesTopBarProps) => {
  return (
    <div className={classes.container}>
      {title}
    </div>
  );
};

export default ChannelMessagesTopBar;