import axios from "axios";

const ACCESS_TOKEN_KEY: string = "live_chat/ACCESS_TOKEN_KEY";

export interface LoginResponse {
  data: {
    success: boolean
    error?: string
    user?: {
      username: string
      fullname: string,
      avatar_url: string | null
    }
    token: string
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

export const test = (): Promise<{ data: { message: string } }> => {
  return axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: '/test'
  });
};