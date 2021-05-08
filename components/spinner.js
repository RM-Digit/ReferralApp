import React from "react";
import { Spinner } from "@shopify/polaris";

export default function APP({ fullWidth }) {
  return fullWidth ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner accessibilityLabel="Spinner example" size="large" />
    </div>
  ) : (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Spinner accessibilityLabel="Spinner example" size="small" />
    </div>
  );
}
