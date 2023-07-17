import { ChannelInfo, Message } from '@/middleware/api';
import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SET_SIDEBAR_MODE_REQUEST: "channel/SET_SIDEBAR_MODE_REQUEST",

  GET_CHANNEL_INFO_REQUEST: "channel/GET_CHANNEL_INFO_REQUEST",
  GET_CHANNEL_INFO_SUCCESS: "channel/GET_CHANNEL_INFO_SUCCESS",
  GET_CHANNEL_INFO_FAILURE: "channel/GET_CHANNEL_INFO_FAILURE",

  GET_CHANNEL_MESSAGES_REQUEST: "channel/GET_CHANNEL_MESSAGES_REQUEST",
  GET_CHANNEL_MESSAGES_SUCCESS: "channel/GET_CHANNEL_MESSAGES_SUCCESS",
  GET_CHANNEL_MESSAGES_FAILURE: "channel/GET_CHANNEL_MESSAGES_FAILURE",
  
  GET_CHANNELS_REQUEST: "channel/GET_CHANNELS_REQUEST",
  GET_CHANNELS_SUCCESS: "channel/GET_CHANNELS_SUCCESS",
  GET_CHANNELS_FAILURE: "channel/GET_CHANNELS_FAILURE",
  
  SEND_CHANNEL_MESSAGE_REQUEST: "channel/SEND_CHANNEL_MESSAGE_REQUEST",
  SEND_CHANNEL_MESSAGE_SUCCESS: "channel/SEND_CHANNEL_MESSAGE_SUCCESS",
  SEND_CHANNEL_MESSAGE_FAILURE: "channel/SEND_CHANNEL_MESSAGE_FAILURE",

  ADD_MESSAGE: "channel/ADD_MESSAGE",
  SHOW_NEW_CHANNEL_MODAL: "channel/SHOW_NEW_CHANNEL_MODAL",
  HIDE_NEW_CHANNEL_MODAL: "channel/HIDE_NEW_CHANNEL_MODAL",
  
  CREATE_CHANNEL_REQUEST: "channel/CREATE_CHANNEL_REQUEST",
  CREATE_CHANNEL_SUCCESS: "channel/CREATE_CHANNEL_SUCCESS",
  CREATE_CHANNEL_FAILURE: "channel/CREATE_CHANNEL_FAILURE",
};

export const SIDEBAR_MODES = {
  CHANNEL_INFO: "sidebar_modes/CHANNEL_INFO",
  CHANNELS_LIST: "sidebar_modes/CHANNELS_LIST",
};

export interface ChannelState {
  sidebarMode: string
  channelInfo: ChannelInfo | null | undefined
  messages: Message[]
  channels: ChannelInfo[]
  newChannelModalVisible: boolean
}

export interface ChannelAction {
  type: string
  sidebarMode?: string
  channelInfo?: ChannelInfo
  messages?: Message[]
  message?: Message
  channelId?: string
  keyword?: string
  channels?: ChannelInfo[]
  content?: string
  newChannelModalVisible?: boolean
  newChannelName?: string
  newChannelDescription?: string
  onSuccess?: () => void
  onError?: (message: string) => void
  payload?: any
}

const initialState: ChannelState = {
  sidebarMode: SIDEBAR_MODES.CHANNELS_LIST,
  channelInfo: null,
  messages: [],
  channels: [],
  newChannelModalVisible: false
};

const channelReducer = (state = initialState, action: ChannelAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case Types.SET_SIDEBAR_MODE_REQUEST:
      return {
        ...state,
        sidebarMode: action.sidebarMode,
      };

    case Types.GET_CHANNEL_INFO_SUCCESS:
      return {
        ...state,
        channelInfo: action.channelInfo,
      };

    case Types.GET_CHANNEL_INFO_FAILURE:
      return {
        ...state,
        channelInfo: null,
      };

    case Types.GET_CHANNEL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };

    case Types.GET_CHANNEL_MESSAGES_FAILURE:
      return {
        ...state,
        messages: [],
      };

    case Types.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.channels,
      };

    case Types.GET_CHANNELS_FAILURE:
      return {
        ...state,
        channels: [],
      };

    case Types.ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ],
      };

    case Types.SHOW_NEW_CHANNEL_MODAL:
      return {
        ...state,
        newChannelModalVisible: true,
      };

    case Types.HIDE_NEW_CHANNEL_MODAL:
      return {
        ...state,
        newChannelModalVisible: false,
      };

    default:
      return state;
  }
};

export const actions = {
  setSidebarMode: (
    sidebarMode: string
  ): ChannelAction => {
    return {
      type: Types.SET_SIDEBAR_MODE_REQUEST,
      sidebarMode
    }
  },
  
  getChannelInfoRequest: (
    channelId: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_REQUEST,
      channelId,
      onSuccess,
      onError
    }
  },
  
  getChannelInfoSuccess: (
    channelInfo: ChannelInfo | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_SUCCESS,
      channelInfo
    }
  },
  
  getChannelInfoFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_FAILURE
    }
  },
  
  getChannelMessagesRequest: (
    channelId: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_REQUEST,
      channelId,
      onSuccess,
      onError
    }
  },
  
  getChannelMessagesSuccess: (
    messages: Message[] | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_SUCCESS,
      messages
    }
  },
  
  getChannelMessagesFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_FAILURE
    }
  },
  
  getChannelsRequest: (
    keyword: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_REQUEST,
      keyword,
      onSuccess,
      onError
    }
  },
  
  getChannelsSuccess: (
    channels: ChannelInfo[] | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_SUCCESS,
      channels
    }
  },
  
  getChannelsFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_FAILURE
    }
  },
  
  sendChannelMessageRequest: (
    channelId: string,
    content: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.SEND_CHANNEL_MESSAGE_REQUEST,
      channelId,
      content,
      onSuccess,
      onError
    }
  },
  
  sendChannelMessageSuccess: (): ChannelAction => {
    return {
      type: Types.SEND_CHANNEL_MESSAGE_SUCCESS
    }
  },
  
  sendChannelMessageFailure: (): ChannelAction => {
    return {
      type: Types.SEND_CHANNEL_MESSAGE_FAILURE
    }
  },
  
  addMessage: (
    message: Message
  ): ChannelAction => {
    return {
      type: Types.ADD_MESSAGE,
      message
    }
  },
  
  showNewChannelModal: (): ChannelAction => {
    return {
      type: Types.SHOW_NEW_CHANNEL_MODAL
    }
  },
  
  hideNewChannelModal: (): ChannelAction => {
    return {
      type: Types.HIDE_NEW_CHANNEL_MODAL
    }
  },
  
  createChannelRequest: (
    newChannelName: string,
    newChannelDescription: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.CREATE_CHANNEL_REQUEST,
      newChannelName,
      newChannelDescription,
      onSuccess,
      onError
    }
  },
  
  createChannelSuccess: (): ChannelAction => {
    return {
      type: Types.CREATE_CHANNEL_SUCCESS
    }
  },
  
  createChannelFailure: (): ChannelAction => {
    return {
      type: Types.CREATE_CHANNEL_FAILURE
    }
  }
};

export default channelReducer;