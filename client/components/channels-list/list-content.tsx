import classes from './list-content.module.css';
import IconField from '../ui/field/icon-field';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@/store/reducers/channel';
import { RootState } from '@/store/reducers';
import SidebarChannelsListItem from './item';
import { toast } from 'react-toastify';

interface SidebarChannelListContentState {
  keyword: string
}

const SidebarChannelListContent = () => {
  const [keyword, setKeyword] = useState<SidebarChannelListContentState["keyword"]>("");
  const dispatch = useDispatch();
  const { channels } = useSelector((state: RootState) => state.channel);

  useEffect(() => {
    dispatch(actions.getChannelsRequest(
      "",
      () => {},
      (error) => {
        toast.error(error);
      }
    ));
  }, []);

  const eventHandler = (newKeyword: string) => {
    dispatch(actions.getChannelsRequest(
      newKeyword,
      () => {},
      (error) => {
        toast.error(error);
      }
    ));
  };

  const debouncedEventHandler = useMemo(() => debounce(eventHandler, 500), []);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    debouncedEventHandler(newKeyword);
  };

  return (
    <div className={classes.container}>
      <IconField
        icon={faMagnifyingGlass}
        iconSize={24}
        placeholder="Search"
        containerClassName={classes.search}
        iconClassName={classes.searchIcon}
        value={keyword}
        onChange={handleKeywordChange}
      />

      <div className={classes.listContainer}>
        {channels.map(c => (
          <SidebarChannelsListItem
            key={c.id}
            id={c.id}
            name={c.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarChannelListContent;