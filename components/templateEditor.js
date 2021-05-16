import { useState } from "react";
import Yamde from "yamde";
import { httpService } from "../services/httpService";
import { Button } from "@shopify/polaris";
const Index = () => {
  const [text, setText] = useState(
    "<h1> Thank you </h1><p>Please refer a friend and get a free product </P><br>{{ Referral_Link }}"
  );
  const handleSave = () => {
    httpService.saveTemplate(text).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <Yamde value={text} handler={setText} theme="light" />
      <Button onClick={handleSave}>Save Template</Button>
    </>
  );
};

export default Index;
