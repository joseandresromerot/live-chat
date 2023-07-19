import classes from "./new-channel.module.css";
import Modal from 'react-modal';
import { Noto_Sans } from 'next/font/google';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { actions } from "@/store/reducers/channel";
import RoundedButton from "../ui/button/rounded-button";
import { useState } from "react";
import { toast } from 'react-toastify';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

interface NewChannelState {
  formData: {
    name: string
    description: string
  }
}

const NewChannel = () => {
  const { newChannelModalVisible } = useSelector((state: RootState) => state.channel);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<NewChannelState["formData"]>({
    name: "",
    description: ""
  });

  const handleFormDataChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    })
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.createChannelRequest(
      formData.name,
      formData.description,
      () => {
        dispatch(actions.hideNewChannelModal());
      },
      (error) => {
        toast.error(error);
      }
    ));
  }

  return (
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container} ${notoSans.className}`}
      isOpen={newChannelModalVisible}
      onRequestClose={() => {
        dispatch(actions.hideNewChannelModal());
      }}
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>NEW CHANNEL</h2>
        <input
          name="name"
          className={classes.field}
          placeholder="Channel name"
          onChange={handleFormDataChange}
        />
        <textarea
          name="description"
          className={`${classes.field} ${classes.textarea}`}
          placeholder="Channel Description"
          rows={4}
          onChange={handleFormDataChange}
        />
        <RoundedButton className={classes.save}>Save</RoundedButton>
      </form>
    </Modal>
  );
};

export default NewChannel;