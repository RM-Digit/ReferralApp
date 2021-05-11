import { useEffect, useState } from "react";
import { Page, Layout } from "@shopify/polaris";
import CustomerTable from "../components/dataTable";
import ProductCard from "../components/productCard";
import { httpService } from "../services/httpService";
import EmptyStateCard from "../components/emptyState";
import Spinner from "../components/spinner";

const Index = () => {
  const [emptyState, setEmptyState] = useState(true);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const getStateChange = (state) => {
    setLoading(true);
    setEmptyState(state);
  };

  useEffect(() => {
    httpService.getProduct().then((res) => {
      if (res.data.success) {
        console.log("product exist", res.data.product);
        setProduct(res.data.product[0]);
        setEmptyState(false);
      }
      setLoading(false);
    });
  }, [emptyState]);
  return (
    <Page>
      <Layout>
        <Layout.Section>
          {loading ? (
            <Spinner fullWidth={false} />
          ) : emptyState ? (
            <EmptyStateCard stateChange={getStateChange} />
          ) : (
            <ProductCard product={product} stateChange={getStateChange} />
          )}
        </Layout.Section>
        <Layout.Section>
          <CustomerTable />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
