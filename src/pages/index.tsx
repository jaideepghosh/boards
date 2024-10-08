import Dashboard from "@/components/app/dashboard";
import LandingPage from "@/components/pages/landing";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
  const { user } = useUser();
  return user ? <Dashboard /> : <LandingPage />;
}
