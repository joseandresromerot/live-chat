import Modal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";
import { actions as messagesActions } from '@/store/reducers/messages';
import classes from './alert.module.css';
import RoundedButton from '../button/rounded-button';
import TransparentButton from '../button/transparent-button';
import { RootState } from '@/store/reducers';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

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
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container} ${notoSans.className}`}
      isOpen={visible}
      onRequestClose={() => {
        dispatch(messagesActions.hideMessage());
      }}
    >
      <div className={classes.message}>
        {message}
      </div>

      <div className={classes.buttonsContainer}>
        {(secondaryButtonText && secondaryButtonText.trim() !== "") &&
          <TransparentButton className={`${classes.secondaryButton} ${quicksand.className}`} onClick={secondaryButtonHandler}>{secondaryButtonText}</TransparentButton>
        }
        {(primaryButtonText && primaryButtonText.trim() !== "") &&
          <RoundedButton className={`${classes.primaryButton} ${quicksand.className}`} onClick={primaryButtonHandler}>{primaryButtonText}</RoundedButton>
        }
      </div>
    </Modal>
  );
}

export default Alert;