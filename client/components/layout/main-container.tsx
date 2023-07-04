import { RootState } from "@/store/reducers";
import { useSelector } from "react-redux";
import RootLayout from ".";

interface MainContainerProps {
  children: JSX.Element | JSX.Element[]
}

const MainContainer = ({ children }: MainContainerProps) => {
  const { authenticated } = useSelector((state: RootState) => state.session);

  if (authenticated) {
    return (
      <RootLayout>{children}</RootLayout>
    );
  }

  return children;
};

export default MainContainer;