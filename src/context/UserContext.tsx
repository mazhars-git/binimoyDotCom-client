import { getCurrentUser, getCurrentUserDetails } from "@/services/AuthService";
import { IUser, IUserDeatails } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  userDetail: IUserDeatails | null;
  setUserDetail: (userDetail: IUserDeatails | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refreshUser: () => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userDetail, setUserDetail] = useState<IUserDeatails | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    
    setUser(user);

    const userDetail = await getCurrentUserDetails();
    setUserDetail(userDetail?.data);

    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const refreshUser = async () => {
    setIsLoading(true);
    await handleUser();
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userDetail,
        setUserDetail,
        isLoading,
        setIsLoading,
        refreshUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
