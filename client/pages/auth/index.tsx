import classes from './index.module.css';
import { useState } from 'react';
import OutlinedTextfield from '@/components/ui/field/outlined-textfield';
import RoundedButton from '@/components/ui/button/rounded-button';
import TransparentButton from '@/components/ui/button/transparent-button';
import Image from 'next/image';
import logo from '../../public/devchallengesLight.svg';
import { useDispatch, useSelector } from 'react-redux';
import { actions as sessionActons } from "../../store/reducers/session";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AuthenticatedPage from '@/components/auth/auth-page';
import { RootState } from '@/store/reducers';

interface AuthPageState {
  isLoginPage: boolean
  formData: {
    username: string,
    password: string,
    fullname: string,
    avatar_url: string
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
  const { authenticated } = useSelector((state: RootState) => state.session);
  
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
          toast.error(error);
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
          toast.success("User registered successfully");
        },
        (error) => {
          toast.error(error);
        }
      ));
    }
  };

  return (
    <AuthenticatedPage notAuthenticatedMode={true}>
      {authenticated ? null : (
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
      )}
    </AuthenticatedPage>
  );
}

export default AuthPage;