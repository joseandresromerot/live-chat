import classes from './member.module.css';

export interface SidebarChannelMemberProps {
  avatarUrl: string
  name: string
}

const SidebarChannelMember = ({ avatarUrl, name }: SidebarChannelMemberProps) => {
  const backgroundImage = avatarUrl && avatarUrl.trim() !== "" ? `url(${avatarUrl})` : "none";

  return (
    <div className={classes.container}>
      <div className={classes.avatar} style={{ backgroundImage }} />
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
};

export default SidebarChannelMember;