import classes from "./new-channel.module.css";
import Modal from 'react-modal';
import { Noto_Sans } from 'next/font/google';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { actions } from "@/store/reducers/channel";
import RoundedButton from "../ui/button/rounded-button";

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const NewChannel = () => {
  const { newChannelModalVisible } = useSelector((state: RootState) => state.channel);
  const dispatch = useDispatch();

  return (
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container} ${notoSans.className}`}
      isOpen={newChannelModalVisible}
      onRequestClose={() => {
        dispatch(actions.hideNewChannelModal());
      }}
    >
      <h2 className={classes.title}>NEW CHANNEL</h2>
      <input className={classes.field} placeholder="Channel name" />
      <textarea className={`${classes.field} ${classes.textarea}`} placeholder="Channel Description" rows={4} />
      <RoundedButton className={classes.save}>Save</RoundedButton>
    </Modal>
  );
};

export default NewChannel;