import NewChannel from "../channels-list/new-channel";
import Alert from "../ui/message/alert";
import { ToastContainer } from 'react-toastify';
import Loading from "../ui/message/loading";

interface BaseAppProps {
  children: JSX.Element | JSX.Element[]
}

const BaseApp = ({ children }: BaseAppProps) => {
  return (
    <>
      {children}
      <NewChannel />
      <Alert />
      <Loading />
      <ToastContainer />
    </>
  );
}

export default BaseApp;