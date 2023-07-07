
import SidebarChannelsListTopBar from './top-bar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import SidebarChannelListContent from './list-content';

const SidebarChannelsList = () => {
  const { channelInfo, } = useSelector((state: RootState) => state.channel);

  return (
    <>
      <SidebarChannelsListTopBar />
      <SidebarChannelListContent />
    </>
  );
};

export default SidebarChannelsList;