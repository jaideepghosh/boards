import LandingPage from "@/components/pages/landing";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const { user } = useUser();
  return user ? <div>Welcome {user?.userId}</div> : <LandingPage />;
}
