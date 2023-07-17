import NewChannel from "../channels-list/new-channel";
import Alert from "../ui/message/alert";

interface BaseAppProps {
  children: JSX.Element | JSX.Element[]
}

const BaseApp = ({ children }: BaseAppProps) => {
  return (
    <>
      {children}
      <NewChannel />
      <Alert />
    </>
  );
}

export default BaseApp;