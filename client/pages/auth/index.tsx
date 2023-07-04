import classes from './index.module.css';
import { useState } from 'react';
import OutlinedTextfield from '@/components/ui/field/outlined-textfield';
import RoundedButton from '@/components/ui/button/rounded-button';
import TransparentButton from '@/components/ui/button/transparent-button';
import Image from 'next/image';
import logo from '../../public/devchallengesLight.svg';
import { useDispatch } from 'react-redux';
import { actions as sessionActons } from "../../store/reducers/session";
import OkMessage from '@/components/ui/message/ok-message';
import { useRouter } from 'next/router';
import { test } from '@/middleware/api';

interface AuthPageState {
  isLoginPage: boolean
  formData: {
    username: string,
    password: string,
    fullname: string,
    avatar_url: string
  }
  errorMessageProps: {
    visible: boolean
    message: string
  }
}

const FORM_INITIAL_STATE: AuthPageState["formData"] = {
  username: "",
  password: "",
  fullname: "",
  avatar_url: ""
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoginPage, setIsLoginPage] = useState<AuthPageState["isLoginPage"]>(true);
  const [formData, setFormData] = useState<AuthPageState["formData"]>(FORM_INITIAL_STATE);
  const [messageProps, setMessageProps] = useState<AuthPageState["errorMessageProps"]>({
    visible: false,
    message: ""
  });
  const { username, password, fullname, avatar_url } = formData;

  const handleFormDataChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info('username, password', username, password);

    if (isLoginPage) {
      dispatch(sessionActons.loginRequest(
        username,
        password,
        () => {
          router.replace("/");
          //test()
          //  .then(() => {});
        },
        (error) => {
          setMessageProps({
            visible: true,
            message: error
          });
        }
      ));
    } else {
      dispatch(sessionActons.registerRequest(
        username,
        password,
        fullname,
        avatar_url,
        () => {
          setFormData(FORM_INITIAL_STATE);
          setIsLoginPage(true);
          setMessageProps({
            visible: true,
            message: "User registered successfully"
          });
        },
        (error) => {
          setMessageProps({
            visible: true,
            message: error
          });
        }
      ));
    }
  };

  const hideMessage = () => {
    setMessageProps({
      visible: false,
      message: ""
    });
  };

  return (
    <>
      <div className={`${classes.mainContainer}`}>
        <div className={classes.formContainer}>
          <Image src={logo} alt="App logo"/>
          {!isLoginPage &&
            <>
              <h3 className={classes.signupTitle}>{"Join thousands of learners from around the world"}</h3>
              <h3 className={classes.signupSubtitle}>{"Master web development by making real-life projects. There are multiple paths for you to choose"}</h3>
            </>
          }
          <form onSubmit={handleSubmit}>
            <div className={classes.title}>{isLoginPage ? "Login" :  "Create Account"}</div>
            <OutlinedTextfield
              type='text'
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleFormDataChange}
              containerClassName={classes.field}
            />
            <OutlinedTextfield
              type='password'
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleFormDataChange}
              containerClassName={classes.field}
            />
            {!isLoginPage &&
              <>
                <OutlinedTextfield
                  type='text'
                  placeholder="Full Name"
                  name="fullname"
                  value={fullname}
                  onChange={handleFormDataChange}
                  containerClassName={classes.field}
                />

                <OutlinedTextfield
                  type='text'
                  placeholder="Avatar URL"
                  name="avatar_url"
                  value={avatar_url}
                  onChange={handleFormDataChange}
                  containerClassName={classes.field}
                />
              </>
            }
            <RoundedButton
              className={classes.submitButton}
            >
              {isLoginPage ? "Login" : "Start coding now"}
            </RoundedButton>
          </form>

          <TransparentButton
            className={classes.secondaryButton}
            onClick={() => setIsLoginPage(!isLoginPage) }
          >
            {isLoginPage ? "Don't have an account yet? Register" : "Adready a member? Login"}
          </TransparentButton>
        </div>
      </div>

      <OkMessage
        visible={messageProps.visible}
        message={messageProps.message}
        hideMessage={hideMessage}
      />
    </>
  );
}

export default AuthPage;