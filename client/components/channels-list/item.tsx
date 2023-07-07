import classes from './item.module.css';

export interface SidebarChannelsListItemProps {
  name: string
}

const SidebarChannelsListItem = ({ name }: SidebarChannelsListItemProps) => {

  const getNameInitials = (channelName: string): string => {
    const parts = channelName.split(" ");
    return `${parts[0][0]}${parts[1] ? parts[1][0] : ""}`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
        <span className={classes.initials}>{getNameInitials(name)}</span>
      </div>
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
};

export default SidebarChannelsListItem;