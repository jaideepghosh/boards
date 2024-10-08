import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { Account, Avatars, Models } from "appwrite";
import appwriteClient from "@/config/appwrite"; // Import the configured Appwrite client

interface UserType {
  avatar?: string;
  id: string;
  name: string;
  email: string;
}

// Define a type for the User context
interface UserContextType {
  user: UserType | null;
  session?: Models.Session | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Define the provider component
interface UserProviderProps {
  children: ReactNode;
}

const account = new Account(appwriteClient);

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await account.getSession("current"); // Get the current session
        const userInitials = new Avatars(appwriteClient).getInitials();
        const loggedInUser = await account.get();

        const sessionUser: UserType = {
          avatar: userInitials,
          id: session.userId,
          name: loggedInUser?.name,
          email: loggedInUser?.email,
        };
        setSession(session);
        setUser(sessionUser);
      } catch (error) {
        console.error(error);
        if (router.pathname !== "/" && router.pathname !== "/auth")
          router.push("/auth"); // Redirect to auth if there's no session
      }
    };

    loadUser();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser, session }}>
      {children}
    </UserContext.Provider>
  );
};
