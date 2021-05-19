import { useEffect, useState } from "react";
import { httpService } from "../services/httpService";
import { TextStyle, Card, ResourceList, Thumbnail } from "@shopify/polaris";
import TemplateEditor from "../components/templateEditor";
import TextFieldEditor from "../components/textField";
import Notification from "../components/toast";
const Index = ({ product, stateChange }) => {
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState("");

  const [showEditor, setShowEditor] = useState(false);
  const [actionTitle, setActionTitle] = useState("Edit Email Template");
  const [title, setTitle] = useState("Share Link and Product");
  const handleDelete = () => {
    httpService.removeProduct().then((res) => {
      if (res.data) stateChange(true);
    });
  };
  const handlePreview = () => {
    window.open(product.permalink);
  };
  const handleEdit = () => {
    // setActionTitle("View Product");
    // setTitle("Email Template");
    window.open("https://www.klaviyo.com/email-templates/list");
    // setShowEditor(false);
  };
  useEffect(() => {
    let interval = 3000;
    setInterval(() => {
      httpService.checkWebhook().then((res) => {
        if (res.data.webhook_created) {
          const link = res.data.referralLink;
          const message = `Order Payment. Referral Link ${link}`;
          interval = 50000;
          setMsg(message);
          setShowToast(true);
        } else {
          interval = 3000;
          setShowToast(false);
        }
      });
    }, interval);
  }, []);
  return (
    <Card
      title={title}
      actions={[{ content: actionTitle, onAction: handleEdit }]}
    >
      <Card.Section>
        <TextFieldEditor />
      </Card.Section>
      <Notification show={showToast} msg={msg} />

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
