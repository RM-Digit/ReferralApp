import { useEffect, useState } from "react";
import { httpService } from "../services/httpService";
import { TextStyle, Card, ResourceList, Thumbnail } from "@shopify/polaris";
const Index = ({ product, stateChange }) => {
  const handleDelete = () => {
    httpService.removeProduct().then((res) => {
      if (res.data) stateChange(true);
    });
  };
  const handleEdit = () => {};
  return (
    <Card title="Referral Products" actions={[{ content: "Manage" }]}>
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
          { content: "Edit", onAction: handleEdit },
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
              media: <Thumbnail source={product.imgSRC} alt={product.title} />,
            },
          ]}
          renderItem={(item) => {
            const { id, url, name, sku, media, quantity } = item;

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>SKU: {sku}</div>
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
