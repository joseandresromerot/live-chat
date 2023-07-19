import classes from './channel-page.module.css';
import AuthenticatedPage from "@/components/auth/auth-page"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/store/reducers/channel";
import { useRouter } from "next/router";
import ChannelMessagesTopBar from '@/components/channel-messages/top-bar';
import { RootState } from '@/store/reducers';
import ChannelMessagesList from '@/components/channel-messages/list';
import ChannelMessagesNewMessageBar from '@/components/channel-messages/new-message-bar';
import socket from "../../socket";
import { toast } from 'react-toastify';

const ChannelPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { channelInfo, messages } = useSelector((state: RootState) => state.channel);
  const { username } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (router.query.channelId) {
      dispatch(actions.getChannelInfoRequest(
        router.query.channelId as string,
        () => {
          console.info('JOIN CHANNEL', router.query.channelId);
          socket.emit('join_room', { username, channelId: router.query.channelId });

          dispatch(actions.getChannelMessagesRequest(
            router.query.channelId as string,
            () => {},
            (message) => {
              toast.error(message);
            }
          ));
        },
        (message) => {
          toast.error(message);
        }
      ));
    }
  }, [router.query.channelId]);

  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      console.info('MESSAGE RECEIVED', data);
      if (data.channelId === router.query.channelId) {
        /*dispatch(actions.addMessage({
          ...data.newMessage,
          created_at: (data.__createdtime__ as number) / 1000
        }));*/

        dispatch(actions.getChannelMessagesRequest(
          router.query.channelId as string,
          () => {},
          (message) => {
            toast.error(message);
          }
        ));
      }
    });

	  // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    return () => {
      console.info('LEAVE CHANNEL', router.query.channelId);
      return socket.emit('leave_room', { username, channelId: router.query.channelId });
    }
  }, []);

  return (
    <AuthenticatedPage>
      <>
        {channelInfo &&
          <ChannelMessagesTopBar title={channelInfo?.name || ""} />
        }

        <ChannelMessagesList messages={messages} />

        {channelInfo &&
          <ChannelMessagesNewMessageBar channelId={channelInfo?.id || ""} />
        }
      </>
    </AuthenticatedPage>
  )
};

export default ChannelPage;