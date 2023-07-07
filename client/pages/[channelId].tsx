import AuthenticatedPage from "@/components/auth/auth-page"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "@/store/reducers/channel";
import { useRouter } from "next/router";

interface ChannelPageState {
  error: string | null
}

const ChannelPage = () => {
  const [error, setError] = useState<ChannelPageState["error"]>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.channelId) {
      dispatch(actions.getChannelInfoRequest(
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
        <h1>This is a channel</h1>
      )}
    </AuthenticatedPage>
  )
};

export default ChannelPage;