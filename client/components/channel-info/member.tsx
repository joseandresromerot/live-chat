import classes from './member.module.css';
import Avatar from './avatar';

export interface SidebarChannelMemberProps {
  avatarUrl: string
  name: string
}

const SidebarChannelMember = ({ avatarUrl, name }: SidebarChannelMemberProps) => {
  return (
    <div className={classes.container}>
      <Avatar url={avatarUrl} />
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
};

export default SidebarChannelMember;