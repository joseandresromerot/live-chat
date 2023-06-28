import Alert from "../ui/message/alert";

interface BaseAppProps {
  children: JSX.Element | JSX.Element[]
}

const BaseApp = ({ children }: BaseAppProps) => {
  return (
    <>
      {children}
      <Alert />
    </>
  );
}

export default BaseApp;