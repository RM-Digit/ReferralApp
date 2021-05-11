import { useState } from "react";
import Dashboard from "./dashboard";
import Spinner from "../components/spinner";

const Index = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return loading ? <Spinner fullWidth={true} /> : <Dashboard />;
};

export default Index;
