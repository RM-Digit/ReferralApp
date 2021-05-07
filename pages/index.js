import { useEffect, useState } from "react";
import LandingPage from "./landingpage";
import Dashboard from "./dashboard";
import { useRouter } from "next/router";
import { httpService } from "./httpService";

const Index = () => {
  const router = useRouter();
  const [emptyState, setEmptyState] = useState(false);
  useEffect(() => {
    // emptyState ? router.push('/landingpage') : router.push('/dashboard')
    httpService.getProduct().then((res) => setEmptyState(!res.data));
  }, []);
  return emptyState ? <LandingPage /> : <Dashboard />;
};

export default Index;
