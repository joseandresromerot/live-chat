import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as sessionActions } from '../../store/reducers/session';
import { RootState } from '@/store/reducers';
import { useRouter } from 'next/router';

interface AuthenticatedPageProps {
  children: JSX.Element | JSX.Element[] | undefined | null
  notAuthenticatedMode?: boolean
}

const AuthenticatedPage = ({ children, notAuthenticatedMode }: AuthenticatedPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    dispatch(sessionActions.getUserInfoRequest(
      () => {
        if (notAuthenticatedMode) {
          router.replace("/");
        }
      },
      (error) => {
        if (!notAuthenticatedMode) {
          router.replace("/auth");
        }
      }
    ));
  }, []);

  if ((!notAuthenticatedMode && !authenticated) || (notAuthenticatedMode && authenticated)) {
    return null;
  }

  return children;
}

AuthenticatedPage.defaultProps = {
  notAuthenticatedMode: false
};

export default AuthenticatedPage;