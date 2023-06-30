import axios from "axios";

export interface LoginResponse {
  data: {
    success: boolean
    error?: string
    user?: {
      username: string
      fullname: string,
      avatar_url: string | null
      token: string
    }
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
    url: 'http://localhost:3003/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}