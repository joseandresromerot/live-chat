import { actions } from "@/store/reducers/messages";
import classes from "./loading.module.css";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.messages);

  return (
    <Modal
      overlayClassName={classes.overlayPanel}
      className={`${classes.container}`}
      isOpen={loading}
      onRequestClose={() => {
        dispatch(actions.hideMessage());
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#3498db', '#2980b9', '#34495e', '#2c3e50', '#3498db']}
      />
    </Modal>
  );
};

export default Loading;