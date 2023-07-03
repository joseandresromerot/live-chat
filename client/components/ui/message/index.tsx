import Modal from 'react-modal';
import classes from './index.module.css';
import RoundedButton from '../button/rounded-button';
import TransparentButton from '../button/transparent-button';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export interface MessageModalProps {
  visible: boolean
  message: string
  primaryButtonText: string
  primaryButtonHandler: () => void
  secondaryButtonText: string | null
  secondaryButtonHandler: (() => void) | null
  onRequestClose: () => void
}

const MessageModal = ({
  visible,
  message,
  primaryButtonText = "",
  primaryButtonHandler = () => {},
  secondaryButtonText = "",
  secondaryButtonHandler = () => {},
  onRequestClose
}: MessageModalProps) => {

  return (
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container} ${notoSans.className}`}
      isOpen={visible}
      onRequestClose={onRequestClose}
    >
      <div className={classes.message}>
        {message}
      </div>

      <div className={classes.buttonsContainer}>
        {(secondaryButtonText && secondaryButtonHandler && secondaryButtonText.trim() !== "") &&
          <TransparentButton className={`${classes.secondaryButton} ${notoSans.className}`} onClick={secondaryButtonHandler}>{secondaryButtonText}</TransparentButton>
        }
        {(primaryButtonText && primaryButtonText.trim() !== "") &&
          <RoundedButton className={`${classes.primaryButton} ${notoSans.className}`} onClick={primaryButtonHandler}>{primaryButtonText}</RoundedButton>
        }
      </div>
    </Modal>
  );
}

MessageModal.defaultProps = {
  onRequestClose: () => {}
};

export default MessageModal;