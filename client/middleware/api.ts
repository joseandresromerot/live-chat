import axios from "axios";

const ACCESS_TOKEN_KEY: string = "live_chat/ACCESS_TOKEN_KEY";

export interface UserInfo {
  id: string
  username: string
  fullname: string,
  avatar_url: string | null
}

export interface LoginResponse {
  data: {
    success: boolean
    error?: string
    user?: UserInfo
    token: string
  }
}

export interface RegisterResponse {
  data: {
    success: boolean
    error?: string
  }
}

export interface GetUserInfoResponse {
  data: {
    success: boolean
    error?: string
    user?: UserInfo
  }
}

export interface ChannelInfo {
  id: string
  name: string
  description: string
  members: UserInfo[]
}

export interface Message {
  id: string
  content: string
  created_at: number | Date
  day?: string
  appuser_id: string
  fullname: string
  avatar_url: string
}

export interface GetChannelInfoResponse {
  data: {
    success: boolean
    error?: string
    channel?: ChannelInfo
  }
}

export interface GetChannelsResponse {
  data: {
    success: boolean
    error?: string
    channels?: ChannelInfo[]
  }
}

export interface GetChannelMessagesResponse {
  data: {
    success: boolean
    error?: string
    messages?: Message[]
  }
}

export interface SendChannelMessageResponse {
  data: {
    success: boolean
    error?: string
    newMessage?: Message
  }
}

export interface CreateChannelResponse {
  data: {
    success: boolean
    error?: string
    newChannel?: ChannelInfo
  }
}

export const login = (username: string, password: string): Promise<LoginResponse> => {
  let data = JSON.stringify({
    "username": username,
    "password": password
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}

export const register = (username: string, password: string, fullname: string, avatar_url: string): Promise<RegisterResponse> => {
  let data = JSON.stringify({
    "username": username,
    "password": password,
    "fullname": fullname,
    "avatar_url": avatar_url
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: '/register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}

export const getUserInfo = (): Promise<GetUserInfoResponse> => {
  return axios({
    method: 'get',
    url: "/getuserinfo",
    headers: {
      'Autorization': getAccessToken()
    }
  });
}

export const getChannelInfo = (channelId: string): Promise<GetChannelInfoResponse> => {
  return axios({
    method: 'get',
    url: `/channel/info/${channelId}`,
    headers: {
      'Autorization': getAccessToken()
    }
  });
}

export const getChannelMessages = (channelId: string): Promise<GetChannelMessagesResponse> => {
  return axios({
    method: 'get',
    url: `/channel/messages/${channelId}`,
    headers: {
      'Autorization': getAccessToken()
    }
  });
}

export const getChannels = (keyword: string): Promise<GetChannelsResponse> => {
  return axios({
    method: 'post',
    maxBodyLength: Infinity,
    url: "/channel/list",
    headers: {
      'Content-Type': 'application/json',
      'Autorization': getAccessToken()
    },
    data : JSON.stringify({
      "keyword": keyword
    })
  });
}

export const sendChannelMessage = (channelId: string, content: string): Promise<SendChannelMessageResponse> => {
  return axios({
    method: 'post',
    maxBodyLength: Infinity,
    url: "/channel/message",
    headers: {
      'Content-Type': 'application/json',
      'Autorization': getAccessToken()
    },
    data : JSON.stringify({
      "channelId": channelId,
      "content": content
    })
  });
}

export const createChannel = (name: string, description: string): Promise<CreateChannelResponse> => {
  return axios({
    method: 'post',
    maxBodyLength: Infinity,
    url: "/channel/create",
    headers: {
      'Content-Type': 'application/json',
      'Autorization': getAccessToken()
    },
    data : JSON.stringify({
      "name": name,
      "description": description
    })
  });
}

export const test = (): Promise<{ data: { message: string } }> => {
  return axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: '/test'
  });
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

export const storeAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, `Bearer ${token}`);
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}