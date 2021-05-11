import { useEffect, useState } from "react";
import { Toast } from "@shopify/app-bridge-react";
const Index = ({ show, msg }) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setShowToast(show);
  }, [show]);
  const dismissToast = () => {
    setShowToast(false);
  };
  return showToast ? <Toast content={msg} onDismiss={dismissToast} /> : null;
};

export default Index;
