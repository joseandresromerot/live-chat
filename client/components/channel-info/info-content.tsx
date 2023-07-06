import { UserInfo } from '@/middleware/api';
import classes from './info-content.module.css';
import SidebarChannelMember, { SidebarChannelMemberProps } from './member';

interface InfoContentProps {
  title: string
  description: string
  members: UserInfo[]
}

const SidebarChannelInfoContent = ({ title, description, members }: InfoContentProps) => {
  return (
    <div className={classes.channelInfoContainer}>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.desc}>{description}</p>
      <h3 className={classes.title}>MEMBERS</h3>
      <div className={classes.members}>
        {members.map(m => (
          <SidebarChannelMember
            avatarUrl={m.avatar_url || ""}
            name={m.fullname}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarChannelInfoContent;