import { useEffect, useState } from 'react';
import classes from './index.module.css';
import SidebarChannelInfoContent from './info-content';
import SidebarChannelInfoTopBar from './top-bar';
import { ChannelInfo, getChannelInfo } from '@/middleware/api';

const SidebarChannelInfo = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>();
  useEffect(() => {
    getChannelInfo('f9d8cd62-5161-40b9-8d60-a6f804a5f46a')
      .then((response) => {
        console.info('response', response);
        setChannelInfo(response.data.channel);
      })
  }, []);

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