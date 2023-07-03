import MessageModal from ".";

interface OkMessageProps {
  visible: boolean
  message: string
  hideMessage: () => void
}

const OkMessage = ({visible, message, hideMessage}: OkMessageProps) => {
  return (
    <MessageModal
      visible={visible}
      message={message}
      primaryButtonText="Ok"
      primaryButtonHandler={hideMessage}
      secondaryButtonText={null}
      secondaryButtonHandler={null}
      onRequestClose={hideMessage}
    />
  );
};

export default OkMessage;