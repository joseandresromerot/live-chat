import { useSelector, useDispatch } from "react-redux";
import { actions as messagesActions } from '@/store/reducers/messages';
import { RootState } from '@/store/reducers';
import MessageModal from ".";

const Alert = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages);
  const {
    visible,
    message,
    primaryButtonText = "",
    primaryButtonHandler = () => {},
    secondaryButtonText = "",
    secondaryButtonHandler = () => {}
  } = messages;

  return (
    <MessageModal
      visible={visible}
      message={message}
      primaryButtonText={primaryButtonText}
      primaryButtonHandler={primaryButtonHandler}
      secondaryButtonText={secondaryButtonText}
      secondaryButtonHandler={secondaryButtonHandler}
      onRequestClose={() => {
        dispatch(messagesActions.hideMessage());
      }}
    />
  );
}

export default Alert;