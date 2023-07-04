import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as sessionActions } from '../../store/reducers/session';
import { RootState } from '@/store/reducers';
import { useRouter } from 'next/router';

interface AuthenticatedPageProps {
  children: JSX.Element | JSX.Element[]
}

const AuthenticatedPage = ({ children }: AuthenticatedPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    dispatch(sessionActions.getUserInfoRequest(
      () => {},
      (error) => {
        router.replace("/auth");
      }
    ));
  }, []);

  if (!authenticated) {
    return null;
  }

  return children;
}

export default AuthenticatedPage;