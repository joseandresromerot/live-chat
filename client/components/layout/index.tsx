import classes from './index.module.css';
import Sidebar from './sidebar';

interface RootLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className={classes.mainContainer}>
      <Sidebar />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RootLayout;