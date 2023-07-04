import classes from './index.module.css';

interface RootLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.sidebar}></div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RootLayout;