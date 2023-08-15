import { useRef } from 'react';
import classes from './index.module.css';
import Sidebar from './sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { actions } from '@/store/reducers/session';

interface RootLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioReady } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  return (
    <>
      <audio
        ref={audioRef}
        src={"/tone.mp3"}
        autoPlay={false}
        muted={!audioReady}
      />
      <div className={classes.mainContainer} onClick={() => {
      console.info('audioReady', audioReady);
        if (!audioReady) {
          console.info('audioReady 2', !audioReady);
          audioRef?.current?.play();
          setTimeout(() => {
            audioRef?.current?.pause();
            dispatch(actions.setAudioReady(true));
            dispatch(actions.setAudioRef(audioRef));
          }, 50);
        }
      }}>
        <Sidebar />
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default RootLayout;