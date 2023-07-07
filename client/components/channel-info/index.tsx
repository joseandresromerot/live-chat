import SidebarChannelInfoContent from './info-content';
import SidebarChannelInfoTopBar from './top-bar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

const SidebarChannelInfo = () => {
  const { channelInfo } = useSelector((state: RootState) => state.channel);

  return (
    <>
      <SidebarChannelInfoTopBar />
      
      {channelInfo &&
        <SidebarChannelInfoContent
          title={channelInfo.name}
          description={channelInfo.description}
          members={channelInfo.members}
        />
      }
    </>
  );
};

export default SidebarChannelInfo;