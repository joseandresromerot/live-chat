import classes from './channel-page.module.css';
import AuthenticatedPage from "@/components/auth/auth-page"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/store/reducers/channel";
import { useRouter } from "next/router";
import ChannelMessagesTopBar from '@/components/channel-messages/top-bar';
import { RootState } from '@/store/reducers';
import ChannelMessagesList from '@/components/channel-messages/list';

interface ChannelPageState {
  error: string | null
}

const ChannelPage = () => {
  const [error, setError] = useState<ChannelPageState["error"]>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { channelInfo, messages } = useSelector((state: RootState) => state.channel);

  useEffect(() => {
    if (router.query.channelId) {
      dispatch(actions.getChannelInfoRequest(
        router.query.channelId as string,
        () => {},
        (message) => {
          setError(message);
        }
      ));

      dispatch(actions.getChannelMessagesRequest(
        router.query.channelId as string,
        () => {},
        (message) => {
          setError(message);
        }
      ));
    }
  }, [router.query.channelId]);

  return (
    <AuthenticatedPage>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <ChannelMessagesTopBar title={channelInfo?.name || ""} />
          <ChannelMessagesList messages={messages} />
        </>
      )}
    </AuthenticatedPage>
  )
};

export default ChannelPage;