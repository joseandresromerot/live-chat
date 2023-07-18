import { useState } from 'react';
import IconButton from '../ui/button/icon-button';
import classes from './new-message-bar.module.css';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@/store/reducers/channel';
import { format } from 'date-fns';
import { RootState } from '@/store/reducers';
import socket from "@/socket";

interface ChannelMessagesNewMessageBarProps {
  channelId: string
}

interface ChannelMessagesNewMessageBarState {
  content: string
}

const ChannelMessagesNewMessageBar = ({ channelId }: ChannelMessagesNewMessageBarProps) => {
  const [content, setContent] = useState<ChannelMessagesNewMessageBarState["content"]>("");
  const dispatch = useDispatch();
  const { avatar_url, fullname, } = useSelector((state: RootState) => state.session);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSendMessage = () => {
    const newMessage = {
      id: `new-${(new Date()).getTime()}`,
      content,
      created_at: new Date(),
      day: format(new Date(), "yyyyMMdd"),
      channel_id: channelId,
      appuser_id: "user",
      avatar_url: avatar_url || "",
      fullname: fullname || ""
    };

    if (content.trim().length > 0) {
      dispatch(actions.addMessage(newMessage));

      socket.emit("send_message", { channelId, newMessage });

      dispatch(actions.sendChannelMessageRequest(
        channelId,
        content,
        () => {
          setContent("");
        },
        (error) => {
          console.info('fff', error);
        }
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.fieldContainer}>
        <input
          className={classes.field}
          placeholder='Type a message here'
          value={content}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
        <IconButton
          icon={faPaperPlane}
          fontSize={20}
          className={classes.button}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChannelMessagesNewMessageBar;