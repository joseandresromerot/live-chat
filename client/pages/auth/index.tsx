import classes from './index.module.css';
import { useState } from 'react';
import OutlinedTextfield from '@/components/ui/field/outlined-textfield';
import RoundedButton from '@/components/ui/button/rounded-button';
import TransparentButton from '@/components/ui/button/transparent-button';
import Image from 'next/image';
import logo from '../../public/devchallengesLight.svg';

interface AuthPageState {
  isLoginPage: boolean
  formData: {
    username: string,
    password: string,
    fullname: string
  }
}

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState<AuthPageState["isLoginPage"]>(true);
  const [formData, setFormData] = useState<AuthPageState["formData"]>({
    username: "",
    password: "",
    fullname: ""
  });
  const { username, password, fullname } = formData;

  const handleFormDataChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    })
  };

  return (
    <div className={`${classes.mainContainer}`}>
      <div className={classes.formContainer}>
        <Image src={logo} alt="App logo"/>
        {!isLoginPage &&
          <>
            <h3 className={classes.signupTitle}>{"Join thousands of learners from around the world"}</h3>
            <h3 className={classes.signupSubtitle}>{"Master web development by making real-life projects. There are multiple paths for you to choose"}</h3>
          </>
        }
        <form onSubmit={() => {}}>
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
            <OutlinedTextfield
              type='text'
              placeholder="Full Name"
              name="fullname"
              value={fullname}
              onChange={handleFormDataChange}
              containerClassName={classes.field}
            />
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
  );
}

export default AuthPage;