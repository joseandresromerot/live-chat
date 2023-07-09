import classes from './avatar.module.css';

export interface AvatarProps {
  url: string
}

const FALLBACK_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';

const Avatar = ({ url }: AvatarProps) => {
  const backgroundImage = `url(${url && url.trim() !== "" ? url : FALLBACK_IMAGE})`;

  return (
    <div className={classes.avatar} style={{ backgroundImage }} />
  );
};

export default Avatar;