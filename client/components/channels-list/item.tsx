import { useRouter } from 'next/router';
import classes from './item.module.css';

export interface SidebarChannelsListItemProps {
  id: string
  name: string
}

const SidebarChannelsListItem = ({ id, name }: SidebarChannelsListItemProps) => {
  const router = useRouter();

  const getNameInitials = (channelName: string): string => {
    const parts = channelName.split(" ");
    return `${parts[0][0]}${parts[1] ? parts[1][0] : ""}`;
  };

  const handleChannelClick = () => {
    router.push(`/channel/${id}`);
  };

  return (
    <div className={classes.container} onClick={handleChannelClick}>
      <div className={classes.avatar}>
        <span className={classes.initials}>{getNameInitials(name)}</span>
      </div>
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
};

export default SidebarChannelsListItem;