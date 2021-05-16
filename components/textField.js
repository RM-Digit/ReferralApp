import React, { useCallback, useState, useEffect } from "react";
import { TextField, Button } from "@shopify/polaris";
import { httpService } from "../services/httpService";

export default function Index() {
  const [textFieldValue, setTextFieldValue] = useState(
    "https://www.skullsplitterdice.com/products/30-sided-polyhedral-dice-d30-32mm-solid-orange-color-1-each"
  );

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );
  const handleSave = () => {
    httpService.saveLink(textFieldValue).then((res) => {
      console.log("data", res.data);
    });
  };

  const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);

  useEffect(() => {
    httpService.getLink().then((res) => {
      if (res.data.success) setTextFieldValue(res.data.shareLink);
    });
  }, []);
  return (
    <TextField
      label="Share Link"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      connectedRight={<Button onClick={handleSave}>Save</Button>}
      onClearButtonClick={handleClearButtonClick}
      helpText="This link would be emailed to customers for sharing"
    />
  );
}
