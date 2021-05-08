import { useEffect, useState } from "react";

import Dashboard from "./dashboard";
import { useRouter } from "next/router";
import Spinner from "../components/spinner";

const Index = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return loading ? <Spinner fullWidth={true} /> : <Dashboard />;

  // const router = useRouter();
  // const [product, setProduct] = useState({});
  // const [emptyState, setEmptyState] = useState(true);
  // const changeState = (empty) => {
  //   setEmptyState(empty);
  // };
  // useEffect(() => {
  //   // emptyState ? router.push('/landingpage') : router.push('/dashboard')
  //   httpService.getProduct().then((res) => {
  //     if (res.data) {
  //       setProduct(res.data[0]);
  //       setEmptyState(false);
  //     }
  //   });
  // }, []);
  // return emptyState ? (
  //   <LandingPage changeEmptyState={changeState} />
  // ) : (
  //   <Dashboard product={product} />
  // );
};

export default Index;
