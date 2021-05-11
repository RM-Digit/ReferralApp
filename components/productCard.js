import { useEffect, useState } from "react";
import { httpService } from "../services/httpService";
import { TextStyle, Card, ResourceList, Thumbnail } from "@shopify/polaris";
import Notification from "../components/toast";
const Index = ({ product, stateChange }) => {
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState("");
  const handleDelete = () => {
    httpService.removeProduct().then((res) => {
      if (res.data) stateChange(true);
    });
  };
  const handlePreview = () => {
    window.open(product.permalink);
  };

  useEffect(() => {
    let interval = 1000;
    setInterval(() => {
      httpService.checkWebhook().then((res) => {
        if (res.data.webhook_created) {
          const link = res.data.referralLink;
          const message = `Order Payment. Referral Link ${link}`;
          interval = 5000;
          setMsg(message);
          setShowToast(true);
        } else {
          interval = 1000;
          setShowToast(false);
        }
      });
    }, interval);
  }, []);
  return (
    <Card title="Referral Products" actions={[{ content: "Manage" }]}>
      <Notification show={showToast} msg={msg} />
      <Card.Section>
        <TextStyle variation="subdued">
          {product.quantity} units available
        </TextStyle>
      </Card.Section>
      <Card.Section
        title="Items"
        actions={[
          {
            content: "Delete",
            destructive: true,
            onAction: handleDelete,
          },
          { content: "View on Store", onAction: handlePreview },
        ]}
      >
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={[
            {
              id: product.id,
              url: product.permalink,
              name: product.title,
              sku: product.sku,
              quantity: product.quantity,
              price: product.price,
              media: <Thumbnail source={product.imgSRC} alt={product.title} />,
            },
          ]}
          renderItem={(item) => {
            const { id, url, name, sku, media, quantity, price } = item;

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3 data-url={url}>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>
                  <span style={{ marginRight: "10px" }}> ${price} </span> SKU:{" "}
                  {sku}
                </div>
                <div>{quantity} available</div>
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  );
};

export default Index;
