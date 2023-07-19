import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SHOW_MESSAGE: "messages/SHOW_MESSAGE",
  HIDE_MESSAGE: "messages/HIDE_MESSAGE",

  SHOW_LOADING: "messages/SHOW_LOADING",
  HIDE_LOADING: "messages/HIDE_LOADING",
};

export interface MessagesState {
  loading: boolean
  visible: boolean
  message: string
  primaryButtonText: string
  primaryButtonHandler: () => void
  secondaryButtonText: string | null
  secondaryButtonHandler: (() => void) | null
}

export interface MessagesAction {
  type: string
  visible?: boolean,
  loading?:boolean
  payload?: any
}

const initialState: MessagesState = {
  loading: false,
  visible: false,
  message: "",
  primaryButtonText: "",
  primaryButtonHandler: () => {},
  secondaryButtonText: "",
  secondaryButtonHandler: () => {}
};

const messagesReducer = (state = initialState, action: MessagesAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case Types.SHOW_MESSAGE:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        primaryButtonText: action.payload.primaryButtonText,
        primaryButtonHandler: action.payload.primaryButtonHandler,
        secondaryButtonText: action.payload.secondaryButtonText,
        secondaryButtonHandler: action.payload.secondaryButtonHandler,
      };
    case Types.HIDE_MESSAGE:
      return {
        ...state,
        visible: false,
        message: "",
        primaryButtonText: "",
        primaryButtonHandler: () => {},
        secondaryButtonText: "",
        secondaryButtonHandler: () => {}
      };
    case Types.SHOW_LOADING:
      return {
        ...state,
        loading: true
      };
    case Types.HIDE_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export const actions = {
  showMessage: (
    message: string,
    primaryButtonText: string,
    primaryButtonHandler: () => void,
    secondaryButtonText: string | null,
    secondaryButtonHandler: (() => void) | null
  ) => {
    return {
      type: Types.SHOW_MESSAGE,
      payload: {
        message,
        primaryButtonText,
        primaryButtonHandler,
        secondaryButtonText,
        secondaryButtonHandler
      }
    }
  },

  hideMessage: () => {
    return {
      type: Types.HIDE_MESSAGE
    }
  },

  showLoading: () => {
    return {
      type: Types.SHOW_LOADING
    }
  },

  hideLoading: () => {
    return {
      type: Types.HIDE_LOADING
    }
  }
};

export default messagesReducer;