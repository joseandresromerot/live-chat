import classes from './member.module.css';

export interface SidebarChannelMemberProps {
  avatarUrl: string
  name: string
}

const FALLBACK_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';

const SidebarChannelMember = ({ avatarUrl, name }: SidebarChannelMemberProps) => {
  const backgroundImage = `url(${avatarUrl && avatarUrl.trim() !== "" ? avatarUrl : FALLBACK_IMAGE})`;

  return (
    <div className={classes.container}>
      <div className={classes.avatar} style={{ backgroundImage }} />
      <h3 className={classes.name}>{name}</h3>
    </div>
  );
};

export default SidebarChannelMember;