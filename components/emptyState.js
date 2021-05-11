import { useState, useEffect } from "react";
import { EmptyState, Layout } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { httpService } from "../services/httpService";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
const Index = ({ stateChange }) => {
  const [open, setPickerOpen] = useState(false);

  const handleSelection = (resources) => {
    setPickerOpen(false);
    const products = resources.selection;
    console.log("products",products)
    httpService.saveProduct(products).then((res) => {
      if (res.data) stateChange(false);
    });
  };

  return (
    <Layout>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setPickerOpen(false)}
      />
      <EmptyState
        heading="Select products to start"
        action={{
          content: "Select products",
          onAction: () => setPickerOpen(true),
        }}
        image={img}
      >
        <p>Select products to get started</p>
      </EmptyState>
    </Layout>
  );
};

export default Index;
