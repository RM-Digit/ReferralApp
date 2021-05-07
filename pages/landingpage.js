import { useState, useEffect } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { httpService } from "./httpService";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
const Index = () => {
  const [open, setPickerOpen] = useState(false);
  const handleSelection = (resources) => {
    setPickerOpen(false);
    const products = resources.selection;

    httpService.saveProduct(products);
    console.log(products);
  };
  return (
    <Page>
      <Layout>
        <TitleBar
          title="Sample App"
          primaryAction={{
            content: "Select products",
            onAction: () => setPickerOpen(true),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={true}
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
          <p>Select products and change their price temporarily</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
